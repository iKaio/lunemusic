import { IKeyboardNote } from "../components/Keyboard";

export type AvailableScales = "major" | ("minor" & string);

export interface IModifier {
  update?: React.Dispatch<React.SetStateAction<number>>;
  isKeyAvailable: (key_index: number) => boolean;
  onKeyUp: (key_code: string) => any;
  onKeyDown: (key_code: string) => any;
  PlayNote: (note_id: string) => boolean;
  config: IModifierConfig;
  keys_states: IKeyboardNote[];
  panel_indicators: string[];
}
export type IModifierConfig = {
  key: number;
  scale: AvailableScales;
};

export const DefaultPianoNotes: IKeyboardNote[] = [
  {
    name: "C",
    type: "white",
    preview: "C",
    spacing: "0",
    key: "KeyZ",
    index: 1,
  },
  {
    name: "C# D♭",
    type: "black",
    preview: "Db",
    spacing: "10",
    key: "KeyS",
    index: 2,
  },
  {
    name: "D",
    type: "white",
    preview: "D",
    spacing: "0",
    key: "KeyX",
    index: 3,
  },
  {
    name: "D# E♭",
    type: "black",
    preview: "Eb",
    spacing: "7",
    key: "KeyD",
    index: 4,
  },
  {
    name: "E",
    type: "white",
    preview: "E",
    spacing: "0",
    key: "KeyC",
    index: 5,
  },
  {
    name: "F",
    type: "white",
    preview: "F",
    spacing: "0",
    key: "KeyV",
    index: 6,
  },
  {
    name: "F# G♭",
    type: "black",
    preview: "Gb",
    spacing: "21",
    key: "KeyG",
    index: 7,
  },
  {
    name: "G",
    type: "white",
    preview: "G",
    spacing: "0",
    key: "KeyB",
    index: 8,
  },
  {
    name: "G# A♭",
    type: "black",
    preview: "Ab",
    spacing: "7",
    key: "KeyH",
    index: 9,
  },
  {
    name: "A",
    type: "white",
    preview: "A",
    spacing: "0",
    key: "KeyN",
    index: 10,
  },
  {
    name: "A# B♭",
    type: "black",
    preview: "Bb",
    spacing: "7",
    key: "KeyJ",
    index: 11,
  },
  {
    name: "B",
    type: "white",
    preview: "B",
    spacing: "0",
    key: "KeyM",
    index: 12,
  },
];

const Formulas = {
  major: [0, 2, 2, 1, 2, 2, 2, 1],
  minor: [0, 2, 1, 2, 2, 1, 2, 2],
};

const IntervalsSequences: { [key: string]: string } = {
  "3,2": "$", // Major triad
  "3,2,3": "$7", // Major seventh
  "2,3": "$m", // Minor triad
  "2,3,2": "$m7", // Minor seventh
};

export class Modifier {
  constructor() {}

  panel_indicators: string[] = ["None"];
  keys_states: IKeyboardNote[] = [...DefaultPianoNotes];
  update: React.Dispatch<React.SetStateAction<number>> = () => {};
  config: IModifierConfig = { key: 1, scale: "major" };

  PlayNote(note_id: string) {
    new Audio("/instruments/NPiano/" + note_id + ".wav").play();
    return true;
  }

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

  updateChordIndicator() {
    let pressing_keys = this.keys_states.filter((e) => e.pressing);
    let intervals: number[] = [];

    for (let i = 0; i < pressing_keys.length; i++) {
      const tk = pressing_keys[i];
      const nk = pressing_keys[i + 1];

      if (nk) {
        intervals.push(nk.index - tk.index - 1);
      }
    }

    let intervals_sign = intervals.join(",");
    let display_template = IntervalsSequences[intervals_sign];

    if (display_template) {
      this.panel_indicators[0] = display_template.replace(
        "$",
        pressing_keys[0].name
      );
    } else {
      this.panel_indicators[0] = "None";
    }
  }

  onKeyUp(pcode: string) {
    let Note = this.keys_states.find((k) => k.key == pcode);

    if (Note) {
      Note.pressing = false;
      this.updateChordIndicator();
      this.update(Date.now());
    }
  }

  onKeyDown(pcode: string) {
    let Note = this.keys_states.find((k) => k.key == pcode);

    if (Note) {
      this.PlayNote(Note.preview);
      Note.pressing = true;
    }

    this.updateChordIndicator();
    this.update(Date.now());
  }
}
