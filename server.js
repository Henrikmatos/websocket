const WebSocket = require('ws');
const axios = require('axios');

// URL do WebSocket da Binance para o par BTCUSDT no intervalo de 1 minuto
const binanceSocketUrl = 'wss://stream.binance.com:9443/ws/btcusdt@kline_1m';

const ws = new WebSocket(binanceSocketUrl);

ws.on('message', async (data) => {
  console.log(`Received data: ${data}`);
  
  // Parse the received data
  const parsedData = JSON.parse(data);
  
  // Envie os dados para o webhook do n8n
  try {
    await axios.post('https://webhookn8n.gpscrypto.xyz/webhook/f26e0980-416f-4831-bed1-0319c412ddc3', parsedData);
    console.log('Data sent to n8n successfully');
  } catch (error) {
    console.error('Error sending data to n8n:', error);
  }
});

ws.on('error', (error) => {
  console.error(`WebSocket error: ${error}`);
});

ws.on('close', () => {
  console.log('WebSocket connection closed');
});
