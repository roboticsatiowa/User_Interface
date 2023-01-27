import base64
from time import sleep

import cv2
import socketio  # python-socketio by @miguelgrinberg

sio = socketio.Client()
connected = False


def startTransmission():
    cam = cv2.VideoCapture(0)
    print("Starting video transmission")
    while (connected):
        ret, frame = cam.read()                     # get frame from webcam
        # from image to binary buffer
        res, frame = cv2.imencode('.jpg', frame)
        data = base64.b64encode(frame)
        try:
            sio.emit('data', data)
        except Exception:
            pass
    cam.release()


@sio.event
def connect():
    global connected
    connected = True
    sio.emit('name', b'video')
    print("I'm connected!")
    startTransmission()


@sio.event
def connect_error(data):
    print("The connection failed!")


@sio.event
def disconnect():
    print("I'm disconnected!")
    global connected
    connected = False


sio.connect('http://127.0.0.1:3000')
