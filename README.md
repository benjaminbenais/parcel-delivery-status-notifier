# Parcel tracking notifier

Send a desktop notification when a parcel delivery status has been updated.

Usage:

1. Create a `.env` file.
2. Set the `URL` environnement variable that correspond to the url of the tracking web page.
3. Set the `XPATH` environnement variable relative to the delivery status itself on the page.

Require a cron job to run `delivery-checking.sh` script.

Cron example:

```
*/30 * * * * ~/.scripts/ups-tracking/delivery-checking.sh
```

Will run the script every 30 minutes.

Note: don't forget to update your node path in `delivery-checking.sh`
