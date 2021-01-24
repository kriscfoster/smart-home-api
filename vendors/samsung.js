const SamsungRemote = require('samsung-remote');
const SAMSUNG_IP = process.env.SAMSUNG_IP;

const remote = new SamsungRemote({
  ip: SAMSUNG_IP
});

module.exports = class TpLink {

  remote;
  devices = [];

  constructor() {
    try {
      this.remote = new SamsungRemote({ ip: SAMSUNG_IP });
      this.devices.push({
        id: '71456FFDA317223AD9ECE9119BA256361CC6F443',
        alias: 'samsung-tv',
        model: 'Samsung Smart TV',
        vendor: 'samsung',
      })
    } catch (err) {
      console.log('error initializing samsung');
    }
  }

  async getDevices() {
    return this.devices;
  }

  async getDevice(id) {
    if (!this.devices.length || id != this.devices[0].id || id != this.devices[0].alias) {
      throw 'device not found';
    }

    return this.devices[0];
  }

  async setDeviceState(id, state) {
    const device = this.getDevice(id);
    if (state == 'on') {
      this.remote.send('KEY_POWERON', (err) => {
        if (err) {
          throw err;
        }

        console.log(`turned device (${id}) on`);
      });
    } else if (state == 'off') {
      this.remote.send('KEY_POWEROFF', (err) => {
        if (err) {
          throw err;
        }

        console.log(`turned device (${id}) off`);
      });
    }
  }
}
