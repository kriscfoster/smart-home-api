const express = require('express');
const bodyParser = require('body-parser');
const TpLink = require('./tpLink');

const PORT = process.env.PORT || 8080;
const tpLink = new TpLink();

const app = express();
app.use(bodyParser.json());

app.get('/api/devices', async(_req, res) => {
  try {
    const devices = await tpLink.getDevices();
    res.send(devices);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get('/api/devices/:id', async(req, res) => {
  try {
    const device = await tpLink.getDevice(req.params.id);
    res.send(device);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.patch('/api/devices/:id', async(req, res) => {
  const { id } = req.params;
  const { state } = req.body;
  try {
    await tpLink.setDeviceState(id, state);
    res.send({
      state,
      success: true,
    });
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
