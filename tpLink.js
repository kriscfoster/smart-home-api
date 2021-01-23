const { login } = require('tplink-cloud-api');
const user = process.env.TP_LINK_USER;
const password = process.env.TP_LINK_PASSWORD;

module.exports = class TpLink {

  tplink;

  constructor() {
    this.init();
  }

  async init() {
    this.tplink = await login(user, password);
    const devices = await this.tplink.getDeviceList();
  }

  async getDevices() {
    const devices = await this.tplink.getDeviceList();
    return devices;
  }

  async getDevice(id) {
    const device = await this.tplink.getHS100(id);
    return device;
  }

  async setDeviceState(id, state) {
    const device = await this.tplink.getHS100(id);
    if (state == 'on') {
      await device.powerOn();
      console.log(`turned device (${id}) on`);
    } else if (state == 'off') {
      await device.powerOff();
      console.log(`turned device (${id}) off`);
    }
  }
}
