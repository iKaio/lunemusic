import { IKeyboardNote } from "../components/Keyboard";

const Formulas = {
  major: [0, 2, 2, 1, 2, 2, 2, 1],
  minor: [0, 2, 1, 2, 2, 1, 2, 2],
};

export type AvailableScales = "major" | ("minor" & string);

export interface IModifier {
  isKeyAvailable: (key_index: number) => boolean;
  onKeyDown: (keys_states: IKeyboardNote[]) => any;
  update?: React.Dispatch<React.SetStateAction<number>>;
  config: IModifierConfig;
}
export type IModifierConfig = {
  key: number;
  scale: AvailableScales;
};

const IntervalsSequences: {[key: string]: string} = {
    "3,2": "$", "2,3": "$m"
}

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

  onKeyDown(keys_states: IKeyboardNote[]) {
    let pressing_keys = keys_states.filter(e=>e.pressing);
    let intervals: number[] = [];

    for (let i = 0; i < pressing_keys.length; i++) {
        const tk = pressing_keys[i];
        const nk = pressing_keys[i+1];

        if (nk) {
            intervals.push((nk.index - tk.index) - 1);
        }
    }

    let intervals_sign = intervals.join(",");
    let display_template = IntervalsSequences[intervals_sign];

    if (display_template) {
        console.log(display_template.replace("$", pressing_keys[0].name));
    }
  }
}
