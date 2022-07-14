const Formulas = {
  major: [0, 2, 2, 1, 2, 2, 2, 1],
  minor: [0, 2, 1, 2, 2, 1, 2, 2],
};

export type AvailableScales = "major" | ("minor" & string);

export interface IModifier {
  isKeyAvailable: (key_index: number) => boolean;
  onKeyDown: () => any;
  update?: React.Dispatch<React.SetStateAction<number>>;
}
export type IModifierConfig = {
  key: number;
  scale: AvailableScales;
};

export class Modifier {
  constructor() {}

  update: React.Dispatch<React.SetStateAction<number>> = ()=>{};
  config: IModifierConfig = { key: 1, scale: "major" };

  isKeyAvailable(key_index: number) {
    let formula = Formulas[this.config.scale];

    let current = this.config.key;

    for (let i = 0; i < formula.length; i++) {
      const step_type = formula[i];
      current += step_type;

      if (current > 12) {
        current -= 12;
      }

      if (current == key_index) {
        return true;
      }
    }

    return false;
  }

  onKeyDown() {

  }
}
