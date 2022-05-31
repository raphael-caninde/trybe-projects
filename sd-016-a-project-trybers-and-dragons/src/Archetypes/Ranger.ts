import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Ranger extends Archetype {
  private _energyType: EnergyType;
  private static _instances = 0;

  constructor(name: string) {
    super(name);

    this._energyType = 'stamina';
  }

  static createdArchetypeInstances(): number {
    this._instances += 1;
    return this._instances;
  }

  get energyType(): EnergyType {
    return this._energyType;
  }
}
