// Test file with exported members

export enum ArtType {
  MANGA,
  ANIME
};

enum Currency {
  USD,
  EUR,
  RUB
}

export interface GameOfTheYear_2018_Edition {
  price: number;
  currency: Currency;
  title: string;
}

export type WHType = 'AoS' | '40k';

export abstract class Warhammer
{
  protected abstract getType(): WHType;
}

export class Warhammer40k extends Warhammer
{
  private static MILLENIUM: number = 40000;

  private legion: number;

  constructor(legion: number) {
    super();
    this.legion = legion;
  }

  getType(): WHType {
    return '40k';
  }
}

export function startCrusade() {
  // For the Emperor!
}
