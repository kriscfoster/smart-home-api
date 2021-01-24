module.exports = class DeviceService {

  tpLink;
  samsung;

  constructor(tpLink, samsung) {
    this.tpLink = tpLink;
    this.samsung = samsung;
  }

  async getDevices() {
    const tpLinkDevices = await this.tpLink.getDevices();
    const samsungDevices = await this.samsung.getDevices();
    const devices = tpLinkDevices.concat(samsungDevices);
    return devices;
  }

  async getDevice(id) {
    const devices = await this.getDevices();
    const filtered = devices.filter((d) => d.id == id || d.alias == id);
    if (!filtered.length) {
      throw Error('no device found');
    }

    return filtered[0];
  }

  async setDeviceState(id, state) {
    const device = await this.getDevice(id);
    if (device.vendor == 'tp-link') {
      return this.tpLink.setDeviceState(id, state);
    } else if (device.vendor == 'samsung') {
      return this.samsung.setDeviceState(id, state);
    }

    throw Error('no valid vendor for device');
  }
}
