const express = require('express');
const app = express();
const port = 8080;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
const routes = [
    {
        id: 1,
        name: 'Trasa Wadowice - Szpital - Dworzec Kolejowy',
        waypoints: [
            
          { id: 1, name: 'Kety, Rynek', lat: 49.88282586208495, lng: 19.220571140904532,description: 'miasto w województwie małopolskim, w powiecie oświęcimskim, siedziba gminy miejsko-wiejskiej Kęty. Kęty to miasto o charakterze handlowo-przemysłowym, położone na Podgórzu Wilamowickim, w dolinie rzeki Soły.' },
          { id: 2, name: 'Rybnik', lat: 50.0773601, lng: 18.5484949,description: 'miasto na prawach powiatu w południowej Polsce, w województwie śląskim, na Płaskowyżu Rybnickim, nad rzekami Rudą i Nacyną' },
          { id: 3, name: 'Racibórz', lat: 50.1001870, lng: 18.1992321,description: 'miasto w Polsce, w województwie śląskim; siedziba władz powiatu raciborskiego. Racibórz jest obok Opola jedną z historycznych stolic Górnego Śląska, gdzie rezydowali książęta opolsko-raciborscy.' },
          { id: 4, name: 'Bystrzyca Kłodzka', lat: 50.29927789404893, lng: 16.64180664252121,description: ' miasto w południowo-zachodniej Polsce, w województwie dolnośląskim, w powiecie kłodzkim, siedziba gminy miejsko-wiejskiej Bystrzyca Kłodzka. Historycznie było położone w hrabstwie kłodzkim.' , }
        ],
      },
      {
        id: 2,
        name: 'Trasa Kraków - Rynek Główny - Wawel',
        waypoints: [
          { id: 5, name: 'Rynek Główny, Kraków',lat: 50.0614, lng: 19.9373,description: 'Opis miejsca' },
          { id: 6, name: 'Sukiennice, Kraków', lat: 50.0618, lng: 19.9371,description: 'Opis miejsca' },
          { id: 7, name: 'Wzgórze Wawelskie, Kraków', lat: 50.0544, lng: 19.9355,description: 'Opis miejsca' },
        ],
      },
      
];

// Obsługa zapytania GET dla listy tras
app.get('/routes', (req, res) => {
  res.json(routes);
});

// Obsługa zapytania GET dla pojedynczej trasy
app.get('/routes/:id', (req, res) => {
  const routeId = parseInt(req.params.id);
  const route = routes.find(r => r.id === routeId);

  if (route) {
    res.json(route);
  } else {
    res.status(404).json({ error: 'Trasa nie znaleziona' });
  }
});

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Server port: ${port}`);
});
