import * as dotenv from 'dotenv';
const midtransClient = require("midtrans-client");

dotenv.config();

// Create Snap API instance untuk transaksi Frontend (Popup)
export const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

// Create Core API instance untuk memverifikasi Webhook
export const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});
