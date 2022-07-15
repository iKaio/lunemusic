import { IKeyboardNote } from "../components/Keyboard";

export type AvailableScales = "major" | ("minor" & string);

export interface IModifier {
  update?: React.Dispatch<React.SetStateAction<number>>;
  updateAvailableNotes: ()=>void;
  isKeyAvailable: (key_index: number) => boolean;
  onKeyUp: (key_code: string) => any;
  onKeyDown: (key_code: string) => any;
  PlayNote: (note_id: string) => boolean;
  config: IModifierConfig;
  keys_states: IKeyboardNote[];
  panel_indicators: string[];
  available_notes_index: number[]
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
    index: 0,
  },
  {
    name: "C# D♭",
    type: "black",
    preview: "Db",
    spacing: "10",
    key: "KeyS",
    index: 1,
  },
  {
    name: "D",
    type: "white",
    preview: "D",
    spacing: "0",
    key: "KeyX",
    index: 2,
  },
  {
    name: "D# E♭",
    type: "black",
    preview: "Eb",
    spacing: "7",
    key: "KeyD",
    index: 3,
  },
  {
    name: "E",
    type: "white",
    preview: "E",
    spacing: "0",
    key: "KeyC",
    index: 4,
  },
  {
    name: "F",
    type: "white",
    preview: "F",
    spacing: "0",
    key: "KeyV",
    index: 5,
  },
  {
    name: "F# G♭",
    type: "black",
    preview: "Gb",
    spacing: "21",
    key: "KeyG",
    index: 6,
  },
  {
    name: "G",
    type: "white",
    preview: "G",
    spacing: "0",
    key: "KeyB",
    index: 7,
  },
  {
    name: "G# A♭",
    type: "black",
    preview: "Ab",
    spacing: "7",
    key: "KeyH",
    index: 8,
  },
  {
    name: "A",
    type: "white",
    preview: "A",
    spacing: "0",
    key: "KeyN",
    index: 9,
  },
  {
    name: "A# B♭",
    type: "black",
    preview: "Bb",
    spacing: "7",
    key: "KeyJ",
    index: 10,
  },
  {
    name: "B",
    type: "white",
    preview: "B",
    spacing: "0",
    key: "KeyM",
    index: 11,
  },
];

const Formulas = {
  major: [0, 2, 2, 1, 2, 2, 2, 1],
  minor: [0, 2, 1, 2, 2, 1, 2, 2],
};

const IntervalsSequences: { [key: string]: string } = {
  "3,2": "1$", // Major triad
  "3,2,3": "1$7", // Major seventh
  "2,3": "1$m", // Minor triad
  "2,3,2": "1$m7", // Minor seventh

  "4,3": "2$ 2nd inversion",
  "4,2": "2$m 2nd inversion",

  "3,4": "3$m 1st inversion",

  "2,5": "3$dim 1st inversion",
};

export class Modifier {
  constructor() {
    this.updateAvailableNotes();
  }

  available_notes_index: number[] = [];
  panel_indicators: string[] = ["None"];
  keys_states: IKeyboardNote[] = [...DefaultPianoNotes];
  update: React.Dispatch<React.SetStateAction<number>> = () => {};
  config: IModifierConfig = { key: 0, scale: "major" };

  PlayNote(note_id: string) {
    new Audio("https://raw.githubusercontent.com/iKaio/lunemusic/master/instruments/NPiano/" + note_id + ".wav").play();
    return true;
  }

  updateAvailableNotes() {
    let formula = Formulas[this.config.scale];
    let current = this.config.key;

    this.available_notes_index = [];

    for (let i = 0; i < formula.length; i++) {
      const step_type = formula[i];
      current += step_type;

      if (current > 12) {
        current -= 12;
      }

      this.available_notes_index.push(current);
    }
  }

  isKeyAvailable(key_index: number) {
    return this.available_notes_index.findIndex(e=>e===key_index) != -1;
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
      let vars = [
        ["1$", pressing_keys[0].name],
        ["2$", pressing_keys[1].name],
        ["3$", pressing_keys[2].name],
      ]
      let formated = display_template;

      vars.forEach(vari=>{
        formated = formated.replace(vari[0], vari[1]);
      });

      this.panel_indicators[0] = formated;
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
