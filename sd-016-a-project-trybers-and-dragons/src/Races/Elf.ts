import Race from './Race';

export default class Elf extends Race {
  private _maxLifePoints: number;
  private static _instances = 0;

  constructor(name:string, dexterity: number) {
    super(name, dexterity);

    this._maxLifePoints = 99;
  }

  static createdRacesInstances() {
    this._instances += 1;
    return this._instances;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }
}
