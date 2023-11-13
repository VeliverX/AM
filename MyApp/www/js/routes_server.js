const express = require('express');
const app = express();
const port = 8080;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
const Trasy = [
    {
        id: 1,
        name: 'Trasa Kety, Rybnik, Raciórz, Bystrzyca Kłodzka',
        waypoints: [
            
          { id: 1, name: 'Kety, Rynek', geo_latitude: 49.88282586208495, geo_longitude: 19.220571140904532,description: 'miasto w województwie małopolskim, w powiecie oświęcimskim, siedziba gminy miejsko-wiejskiej Kęty. Kęty to miasto o charakterze handlowo-przemysłowym, położone na Podgórzu Wilamowickim, w dolinie rzeki Soły.' },
          { id: 2, name: 'Rybnik', geo_latitude: 50.0773601, geo_longitude: 18.5484949,description: 'miasto na prawach powiatu w południowej Polsce, w województwie śląskim, na Płaskowyżu Rybnickim, nad rzekami Rudą i Nacyną' },
          { id: 3, name: 'Racibórz', geo_latitude: 50.1001870, geo_longitude: 18.1992321,description: 'miasto w Polsce, w województwie śląskim; siedziba władz powiatu raciborskiego. Racibórz jest obok Opola jedną z historycznych stolic Górnego Śląska, gdzie rezydowali książęta opolsko-raciborscy.' },
          { id: 4, name: 'Bystrzyca Kłodzka', geo_latitude: 50.29927789404893, geo_longitude: 16.64180664252121,description: ' miasto w południowo-zachodniej Polsce, w województwie dolnośląskim, w powiecie kłodzkim, siedziba gminy miejsko-wiejskiej Bystrzyca Kłodzka. Historycznie było położone w hrabstwie kłodzkim.' , }
        ],
      },
      {
        id: 2,
        name: 'Trasa Kęty, Chrobacza Łąka',
        waypoints: [
          { id: 5, name: 'Dworzec PKP, Kęty Podlesie',geo_latitude: 49.87816959538084,  geo_longitude: 19.196828813560234, description: 'Dworzec kolejnowy, Kęty podlesie. Bilet online lub u konduktora' },
          { id: 6, name: 'Rondo, Kozy', geo_latitude: 49.84464145422655, geo_longitude: 19.142363840338472,description: 'Rondo kapitana Krzysztofa Grabowskiego' },
          { id: 7, name: 'Kamieniołom, Kozy', geo_latitude: 49.82931467650209, geo_longitude: 19.16466673510428,description: ' nieczynny kamieniołom piaskowców lgockich położony na zboczu Chrobaczej Łąki, w obrębie grupy Magurki Wilkowickiej w Kozach, w powiecie bielskim, w województwie śląskim. Działał w latach 1910–1992' },
          { id: 8, name: 'Chrobacza Łąka', geo_latitude: 49.822022602140734,  geo_longitude: 19.16606830189463,description: 'szczyt w Grupie Magurki Wilkowickiej w Beskidzie Małym. Znajduje się w głównym grzbiecie tej grupy, między przełęczą Przegibek a Bujakowskim Groniem. Z północno-zachodnich stoków spływają źródłowe cieki potoku Kozówka i na stoku tym znajduje się duży Kamieniołom w Kozach' },
        ],
      }, 
];

// Obsługa zapytania GET dla listy tras
app.get('/Trasy', (req, res) => {
  res.json(Trasy);
});


app.get('/Trasy/:id', (req, res) => {
  const Id_Trasy = parseInt(req.params.id);
  const Trasa = Trasy.find(r => r.id === Id_Trasy);

  if (Trasa) {
    res.json(Trasa);
  } else {
    res.status(404).json({ error: 'Trasy nie znaleziona' });
  }
});

app.listen(port, () => {
  console.log(`Server port: ${port}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  });
