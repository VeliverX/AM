document.addEventListener('deviceready', onDeviceReady, false);

// Pobierz poprzednią pozycję użytkownika


function onDeviceReady() {

    navigator.geolocation.getCurrentPosition(position => {
        console.log('Current Location:', position.coords.latitude, position.coords.longitude);
        
        const geo_latitude = position.coords.latitude;
        const geo_longitude = position.coords.longitude;

        const currentLocation = {
            geo_latitude: geo_latitude,
            geo_longitude: geo_longitude,
            name: 'Moja lokalizacja',
            description: 'Bieżąca lokalizacja użytkownika'
        };

    const map = L.map('map').setView([geo_latitude, geo_longitude], 10);
    const control = L.Routing.control({
      waypoints: [],
      routeWhileDragging: true,
      createMarker: function (i, wp, nWps) {
        const marker = L.marker(wp.latLng)
          .bindPopup(`<b>${wp.name}</b><br>${wp.description || ''}`)
          .on('mouseover', function () {
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
    });
}