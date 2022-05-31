import Race from './Race';

export default class Halfling extends Race {
  private _maxLifePoints: number;
  private static _instances = 0;

  constructor(name: string, maxLifePoints: number) {
    super(name, maxLifePoints);

    this._maxLifePoints = 60;
  }

  static createdRacesInstances() {
    this._instances += 1;
    return this._instances;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }
}
