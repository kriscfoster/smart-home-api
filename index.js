const express = require('express');
const bodyParser = require('body-parser');
const DeviceService = require('./deviceService');
const TpLink = require('./vendors/tpLink');
const Samsung = require('./vendors/samsung');

const PORT = process.env.PORT || 8080;
const deviceService = new DeviceService(
  new TpLink(),
  new Samsung(),
);

const app = express();
app.use(bodyParser.json());

app.get('/api/devices', async(_req, res) => {
  try {
    const devices = await deviceService.getDevices();
    res.send(devices);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get('/api/devices/:id', async(req, res) => {
  try {
    const device = await deviceService.getDevice(req.params.id);
    res.send(device);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.patch('/api/devices/:id', async(req, res) => {
  const { id } = req.params;
  const { state } = req.body;
  try {
    await deviceService.setDeviceState(id, state);
    res.send({
      success: true,
      state,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
