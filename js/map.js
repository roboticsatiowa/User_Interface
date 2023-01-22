// Use this file to control html interactivity
let map;
let target_marker;
let position_marker;

function initMap() {

  // Initialize the map
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(41.702389, -91.582108),
    zoom: 16,
    mapTypeId: 'terrain',
    disableDefaultUI: true,
    mapTypeControl: true,
    fullscreenControl: true,
    zoomControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      mapTypeIds: ["roadmap", "terrain", "satellite"],

    }
  });

  // create the robot positon marker and add to map
  position_marker = new google.maps.Marker({
    position: {lat: 41.702389, lng:-91.582108},
    map: map,
  });

  // Add event listener to move target marker
  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
  });
}

function placeMarker(location) {
    if (target_marker == null)
    {
          target_marker = new google.maps.Marker({
             position: location,
             map: map,
            color: "blue"
          });
    }
    else
    {
        target_marker.setPosition(location);
    }
}

  window.initMap = initMap;