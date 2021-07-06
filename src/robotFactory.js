'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    if (Object.keys(coords).length === 0) {
      this.coords = {
        x: 0,
        y: 0,
      };
    } else {
      this.coords = coords;
    }
    this.chipVersion = chipVersion;
  }
  goForward(step = 1) {
    this.coords.y += step;
  }
  goBack(step = 1) {
    this.coords.y -= step;
  }
  goRight(step = 1) {
    this.coords.x += step;
  }
  goLeft(step = 1) {
    this.coords.x -= step;
  }
  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}`
    + `, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(...arguments);

    if (Object.keys(coords).length === 2) {
      this.coords = {
        x: coords.x,
        y: coords.y,
        z: 0,
      };
    } else {
      this.coords = {
        x: coords.x,
        y: coords.y,
        z: coords.z,
      };
    }
  }
  goUp(step = 1) {
    this.coords.z += step;
  }
  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(...arguments);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }
  hookLoad(value) {
    if (value.weight <= this.maxLoadWeight && this.currentLoad === null) {
      this.currentLoad = value;
    }
  }
  unhookLoad() {
    this.currentLoad = null;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
