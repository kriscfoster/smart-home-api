const { login } = require('tplink-cloud-api');
const user = process.env.TP_LINK_USER;
const password = process.env.TP_LINK_PASSWORD;

module.exports = class TpLink {

  tpLink;

  constructor() {
    this.init();
  }

  async init() {
    this.tpLink = await login(user, password);
  }

  async getDevices() {
    const devices = [];
    const tpLinkDevices = await this.tpLink.getDeviceList();
    tpLinkDevices.forEach((d) => {
      devices.push({
        id: d.deviceId,
        alias: d.alias,
        model: d.deviceName,
        vendor: 'tp-link',
      });
    });

    return devices;
  }

  async getDevice(id) {
    const device = await this.tpLink.getHS100(id);
    return device;
  }

  async setDeviceState(id, state) {
    const device = await this.tpLink.getHS100(id);
    if (state == 'on') {
      await device.powerOn();
      console.log(`turned device (${id}) on`);
    } else if (state == 'off') {
      await device.powerOff();
      console.log(`turned device (${id}) off`);
    }
  }
}
