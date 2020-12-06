require('dotenv').config({ path: `${__dirname}/.env` });
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const notifier = require('node-notifier');

const URL = process.env.URL;
const XPATH = process.env.XPATH;

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Go to UPS tracking page
    await page.goto(URL);

    // Get the delivery status
    const element = await page.$x(XPATH);

    if (!element) {
      throw new Error('Element not found. Check if xpath provided is correct.');
    }

    let status = await page.evaluate(el => el.textContent, element[0]);

    if (!status) {
      throw new Error('Delivery status not found.');
    }

    // Write the delivery status to `current_status`
    fs.writeFileSync(path.join(__dirname, 'logs/current_status.txt'), status);

    // Get the previous delivery status
    const previousStatus = fs.readFileSync(
      path.join(__dirname, 'logs/previous_status.txt'),
      { encoding: 'utf8' }
    );

    // Compare previous delivery status with newly fetched delivery status
    // If they are not equal, store the new status to `previous_status` file and send a notification with the new status
    if (previousStatus !== status) {
      fs.writeFileSync(
        path.join(__dirname, 'logs/previous_status.txt'),
        status
      );

      notifier.notify({
        title: 'Delivery status updated',
        message: status,
        sound: 'Funk',
        wait: true,
        timeout: 3600, // One hour
        closeLabel: 'Close',
      });
    }

    await browser.close();
    process.exit();
  } catch (error) {
    console.error(error);
    // Keep track of errors
    fs.appendFileSync(
      path.join(__dirname, 'logs/errors.txt'),
      `${new Date()}: ${error}\n`
    );
    process.exit();
  }
})();
