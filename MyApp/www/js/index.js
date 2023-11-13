document.addEventListener('deviceready', onDeviceReady, false);

let Trasy;

function onDeviceReady() {
  
  const LocalStorage_Trasy = JSON.parse(localStorage.getItem('Trasy'));
  const map = L.map('map').setView([50, 20], 7);
  const control = L.Routing.control({
    waypoints: [],
    routeWhileDragging: true, // mozliwosc zmiany trasy
    geocoder: L.Control.Geocoder.nominatim(), //leaflet-control-geocoder
    createMarker: function (i, point, nWps) {
      const marker = L.marker(point.latLng)
        .bindPopup(`<b>${point.name}</b><br>${point.description || ''}`)
        .on('click', function () { //touchstart w przypadku urządzenia mobilnego
          this.openPopup();
        })
        .on('mouseout', function () {
          this.closePopup();
        });
      return marker;
    }
  }).addTo(map);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const select = document.getElementById('ListaTras');
  const openInMapsButton = document.getElementById('GoogleMapsButton');


  navigator.geolocation.getCurrentPosition(position => {
        
        const geo_latitude = position.coords.latitude;
        const geo_longitude = position.coords.longitude;

        const centerMapButton = document.getElementById('centerMapButton');
        centerMapButton.addEventListener('click', () => {
          map.setView([position.coords.latitude, position.coords.longitude], 15);
        });

        const Geo_Localization = {
            geo_latitude: geo_latitude,
            geo_longitude: geo_longitude,
            name: 'Geolokacja',
            description: 'Aktualna geolokacja'
        };

    if (LocalStorage_Trasy) {
      Trasy = LocalStorage_Trasy;
      initializeRoutes(Trasy, Geo_Localization, select, control);
    } else {
      // Pobierz trasy z serwera
      fetch('http://localhost:8080/Trasy')
        .then(response => response.json())
        .then(data => {
          Trasy = data;
          localStorage.setItem('Trasy', JSON.stringify(Trasy));
          initializeRoutes(Trasy, Geo_Localization, select, control);
        })
    }
  });

  function initializeRoutes(Trasy, Geo_Localization, select, control) {
    Trasy.forEach(Trasa => {
      Trasa.waypoints.unshift(Geo_Localization);
      const option = document.createElement('option');
      option.value = Trasa.id;
      option.text = Trasa.name;
      select.add(option);
    });
    const selectedRouteId = select.value;
    updateRoute(selectedRouteId, Trasy, control);
  }

  select.addEventListener('change', () => {
    const selectedRouteId = select.value;
    updateRoute(selectedRouteId, Trasy, control);
  });

  openInMapsButton.addEventListener('click', () => {
    const selectedRouteId = select.value;
    const selectedRoute = Trasy.find(Trasa => Trasa.id == selectedRouteId);

    if (selectedRoute) {
      const waypoints = selectedRoute.waypoints.map(waypoint => `${waypoint.geo_latitude},${waypoint.geo_longitude}`);
      const url = `https://www.google.com/maps/dir/${waypoints.join('/')}`;
      window.open(url, '_system');
    }
  });

  function updateRoute(selectedRouteId, Trasy, control) {
    const Trasa = Trasy.find(Trasa => Trasa.id == selectedRouteId);

    if (Trasa) {
      const waypoints = Trasa.waypoints.map(waypoint => ({
        latLng: L.latLng(waypoint.geo_latitude, waypoint.geo_longitude),
        name: waypoint.name,
        description: waypoint.description || ''
      }));

      control.setWaypoints(waypoints);
    }
  }
  
}
