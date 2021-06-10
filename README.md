# Parcel Tracking Notifier 🚚

## Receive a desktop notification when your parcel delivery status is updated !

<br>

Usage:

1. Generate a `.env` file by running `yarn init:env`.
2. Set the `URL` environnement variable that correspond to the url of the tracking web page.
3. Set the `XPATH` environnement variable relative to the delivery status itself on the page.
4. Create a cron job to run the script every x amount of time.
   Cron example:

```
*/30 * * * * ~/.scripts/parcel-status-notifier/script.sh
```

Will run the script every 30 minutes.

Note: don't forget to update your node path in `script.sh`

Enjoy!
