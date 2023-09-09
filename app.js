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
        .then(() => console.log('Reservation is done!'))
        .catch(error => console.error('Error:', error));

    res.status(201).json({message: 'Data received successfully'});
});

async function takeReservations() {
    // Launch a headless Chromium browser
    const browser = await puppeteer.launch({headless: false});

    // Create a new page
    const page = await browser.newPage();

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    // Navigate to Immıgration Office Page
    await page.goto('https://www.bezkolejki.eu/luwlodz');

    await page.waitForSelector('button.btn-secondary', {timeout: 1000});
    // Get the right choice for the service
    const firstBtn = await page.$x('(//button[contains(@class,"btn-secondary")])[4]')
    // Click the right choice for the service
    await firstBtn[0].click();

    // Get text of the button by puppeteer
    const text = await page.evaluate(el => el.textContent, firstBtn[0]);
    console.log(text);

    // Get Dalej button
    const dalejBtn = await page.$x('(//button[contains(@class, \'btn-secondary\')])[10]')
    // Click Dalej button
    await dalejBtn[0].click();

    // Get Calendar data to choose the date
    const calendar = await page.$x('//span[@aria-disabled="false"]')
    // Click the first available date
    //await calendar[0].click();

    // select the first available date
    //await calendar[0].click();

    // Get layer
    //const layer = await page.$x('//div[contains(@class, "vc-highlights vc-day-layer")]')

    // selectTime
    //const selectedTime = await page.$x('//select[@id="selectTime"]')
    // get option object from the selectTime
    //const option = await selectedTime[0].$('option:nth-child(2)')
}


module.exports = app;
