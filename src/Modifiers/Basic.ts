import { IKeyboardNote } from "../components/Keyboard";
import MidiWriter, { Duration, Pitch } from "midi-writer-js";
import { MoveInArray } from "../Utility";

export type AvailableScales = "major" | ("minor" & string);

export interface IModifier {
  update?: React.Dispatch<React.SetStateAction<number>>;
  updateAvailableNotes: () => void;
  isKeyAvailable: (key_index: number) => boolean;
  onKeyUp: (key_code: string) => any;
  onKeyDown: (key_code: string) => any;
  PlayNote: (note_id: string) => boolean;
  onReady: () => void;
  config: IModifierConfig;
  keys_states: IKeyboardNote[];
  available_notes_index: number[];
  panel_indicators: string[];
}
export type IModifierConfig = {
  key: number;
  scale: AvailableScales;
};

const styles_presets = {
  white: {default: "white-key", highlighted: "white-key-highlighted", pressing: "white-key-pressing"},
  black: {default: "black-key key-spacing-half", highlighted: "black-key-highlighted", pressing: "black-key-pressing"},
}

const DoublePiano: IKeyboardNote[] = [
  {
    name: "C",
    type: "white",
    preview: "C",
    style: styles_presets.white,
    key: "KeyZ",
    index: 0,
  },
  {
    name: "C# D♭",
    type: "black",
    preview: "Db",
    style: {default: "black-key key-spacing-3of4", highlighted: "black-key-highlighted", pressing: "black-key-pressing"},
    key: "KeyS",
    index: 1,
  },
  {
    name: "D",
    type: "white",
    preview: "D",
    style: styles_presets.white,
    key: "KeyX",
    index: 2,
  },
  {
    name: "D# E♭",
    type: "black",
    preview: "Eb",
    style: styles_presets.black,
    key: "KeyD",
    index: 3,
  },
  {
    name: "E",
    type: "white",
    preview: "E",
    style: styles_presets.white,
    key: "KeyC",
    index: 4,
  },
  {
    name: "F",
    type: "white",
    preview: "F",
    style: styles_presets.white,
    key: "KeyV",
    index: 5,
  },
  {
    name: "F# G♭",
    type: "black",
    preview: "Gb",
    style: {default: "black-key key-spacing-6of4", highlighted: "black-key-highlighted", pressing: "black-key-pressing"},
    key: "KeyG",
    index: 6,
  },
  {
    name: "G",
    type: "white",
    preview: "G",
    style: styles_presets.white,
    key: "KeyB",
    index: 7,
  },
  {
    name: "G# A♭",
    type: "black",
    preview: "Ab",
    style: styles_presets.black,
    key: "KeyH",
    index: 8,
  },
  {
    name: "A",
    type: "white",
    preview: "A",
    style: styles_presets.white,
    key: "KeyN",
    index: 9,
  },
  {
    name: "A# B♭",
    type: "black",
    preview: "Bb",
    style: styles_presets.black,
    key: "KeyJ",
    index: 10,
  },
  {
    name: "B",
    type: "white",
    preview: "B",
    style: styles_presets.white,
    key: "KeyM",
    index: 11,
  },
  {
    name: "C",
    type: "white",
    preview: "C",
    style: styles_presets.white,
    key: "KeyZ",
    index: 0,
  },
  {
    name: "C# D♭",
    type: "black",
    preview: "Db",
    style: {default: "black-key key-spacing-6of4", highlighted: "black-key-highlighted", pressing: "black-key-pressing"},
    key: "KeyS",
    index: 1,
  },
  {
    name: "D",
    type: "white",
    preview: "D",
    style: styles_presets.white,
    key: "KeyX",
    index: 2,
  },
  {
    name: "D# E♭",
    type: "black",
    preview: "Eb",
    style: styles_presets.black,
    key: "KeyD",
    index: 3,
  },
  {
    name: "E",
    type: "white",
    preview: "E",
    style: styles_presets.white,
    key: "KeyC",
    index: 4,
  },
  {
    name: "F",
    type: "white",
    preview: "F",
    style: styles_presets.white,
    key: "KeyV",
    index: 5,
  },
  {
    name: "F# G♭",
    type: "black",
    preview: "Gb",
    style: {default: "black-key key-spacing-6of4", highlighted: "black-key-highlighted", pressing: "black-key-pressing"},
    key: "KeyG",
    index: 6,
  },
  {
    name: "G",
    type: "white",
    preview: "G",
    style: styles_presets.white,
    key: "KeyB",
    index: 7,
  },
  {
    name: "G# A♭",
    type: "black",
    preview: "Ab",
    style: styles_presets.black,
    key: "KeyH",
    index: 8,
  },
  {
    name: "A",
    type: "white",
    preview: "A",
    style: styles_presets.white,
    key: "KeyN",
    index: 9,
  },
  {
    name: "A# B♭",
    type: "black",
    preview: "Bb",
    style: styles_presets.black,
    key: "KeyJ",
    index: 10,
  },
  {
    name: "B",
    type: "white",
    preview: "B",
    style: styles_presets.white,
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

  "2,4": "3$ 1st inversion",
  "3,4": "3$m 1st inversion",

  "2,5": "3$dim 1st inversion",
};

export class Modifier {
  constructor() {
    this.updateAvailableNotes();
  }

  available_notes_index: number[] = [];
  keys_states: IKeyboardNote[] = [...DoublePiano];
  update: React.Dispatch<React.SetStateAction<number>> = () => {};
  config: IModifierConfig = { key: 0, scale: "major" };
  panel_indicators: string[] = ["None"];

  PlayNote(note_id: string) {
    new Audio(
      "https://raw.githubusercontent.com/iKaio/lunemusic/master/instruments/NPiano/" +
        note_id +
        ".wav"
    ).play();
    return true;
  }

  updateAvailableNotes() {
    let formula = Formulas[this.config.scale];
    let current = this.config.key;

    this.available_notes_index = [];

    for (let i = 0; i < formula.length; i++) {
      const step_type = formula[i];
      current += step_type;

      if (current > 11) {
        current -= 12;
      }

      this.available_notes_index.push(current);
    }
  }

  isKeyAvailable(key_index: number) {
    return this.available_notes_index.findIndex((e) => e === key_index) != -1;
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
      ];
      let formated = display_template;

      vars.forEach((vari) => {
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

  GenerateRandomTrack() {
    const track = new MidiWriter.Track();
    let next_note_a_index = 0;

    for (let i = 0; i < 100; i++) {
      track.addEvent(
        new MidiWriter.NoteEvent({
          pitch: [
            (this.keys_states[this.available_notes_index[next_note_a_index]]
              .preview + "3") as Pitch,
          ],
          duration: "4",
        })
      );

      next_note_a_index = MoveInArray(
        this.available_notes_index,
        next_note_a_index,
        Math.floor(Math.random() * 4) - 2
      );
    }

    const write = new MidiWriter.Writer(track);
    write.saveMIDI("Random track in " + this.keys_states[this.config.key].name);
  }
}
