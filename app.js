const express = require('express');
const path = require('path');
const app = express();
const puppeteer = require('puppeteer');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());

app.post('/api/send-personal-data', (req, res) => {
  const data = req.body;
  console.log('Received people data:', data);

  takeReservations()
      .then(() => console.log('Screenshot taken!'))
      .catch(error => console.error('Error:', error));

  res.status(201).json({ message: 'Data received successfully' });
});

async function takeReservations() {
  // Launch a headless Chromium browser
  const browser = await puppeteer.launch({headless:false});

  // Create a new page
  const page = await browser.newPage();

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Navigate to Immıgration Office Page
  await page.goto('https://www.bezkolejki.eu/luwlodz');

  // Get the right choice for the service
  const elements = await page.$x('<xPath>')
  await elements[0].click()
}

module.exports = app;
