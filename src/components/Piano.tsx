import { useEffect, useState } from "react";

function PlayNote(note_id: string) {
  new Audio("/notes/" + note_id + "3.mp3").play();
}

function Note(props: IPianoNote) {
  let isBlack = props.type == "black";

  return (
    <div
      onClick={() => PlayNote(props.preview || props.name || "C")}
      className={`flex flex-col-reverse items-center h-full

        ${isBlack ? "black-key" : "white-key"}
        ${"key-spacing-" + props.spacing}
        ${props.pressing ? "pressing-key" : ""}
        `}
    >
      <h1
        className={`key-name ${
          props.available
            ? isBlack
              ? "black-key-name-highlight"
              : "white-key-name-highlight"
            : ""
        }`}
      >
        {props.name}
      </h1>
    </div>
  );
}

type IPianoNote = {
  name: string;
  type: "black" | "white";
  preview: string;
  spacing: "0" | "7" | "10" | "14" | "21";
  key?: string;
  index?: number;
  available?: boolean;
  pressing?: boolean;
};

type IPianoProps = {
  Notes: IPianoNote[];
  Modifier: (key_index: number) => boolean;
};

export const DefaultPianoNotes: IPianoNote[] = [
  {
    name: "C",
    type: "white",
    preview: "C",
    spacing: "0",
    key: "KeyZ",
  },
  { name: "C# D♭", type: "black", preview: "Db", spacing: "10", key: "KeyS" },
  { name: "D", type: "white", preview: "D", spacing: "0", key: "KeyX" },
  { name: "D# E♭", type: "black", preview: "Eb", spacing: "7", key: "KeyD" },
  { name: "E", type: "white", preview: "E", spacing: "0", key: "KeyC" },
  { name: "F", type: "white", preview: "F", spacing: "0", key: "KeyV" },
  { name: "F# G♭", type: "black", preview: "Gb", spacing: "21", key: "KeyG" },
  { name: "G", type: "white", preview: "G", spacing: "0", key: "KeyB" },
  { name: "G# A♭", type: "black", preview: "Ab", spacing: "7", key: "KeyH" },
  { name: "A", type: "white", preview: "A", spacing: "0", key: "KeyN" },
  { name: "A# B♭", type: "black", preview: "Bb", spacing: "7", key: "KeyJ" },
  { name: "B", type: "white", preview: "B", spacing: "0", key: "KeyM" },
];

export function Piano(props: IPianoProps) {
  let [keyStates, setKeyStates] = useState(props.Notes);

  let BlackKeys: IPianoNote[] = [];
  let WhiteKeys: IPianoNote[] = [];

  keyStates.forEach((note, i) => {
    note.index = i + 1;
    note.available = props.Modifier(i + 1);

    if (note.type == "black") {
      BlackKeys.push(note);
    } else {
      WhiteKeys.push(note);
    }
  });

  useEffect(() => {
    document.onkeyup = (e) => {
      let KeysStates = [...keyStates];
      let Note = KeysStates.find((k) => k.key == e.code);

      if (Note) {
        Note.pressing = false;
        setKeyStates(KeysStates);
      }
    };

    document.onkeydown = (e) => {
      if (!e.repeat) {
        let KeysStates = [...keyStates];
        let Note = KeysStates.find((k) => k.key == e.code);

        if (Note) {
          PlayNote(Note.preview);
          Note.pressing = true;
          setKeyStates(KeysStates);
        }
      }
    };
  }, []);

  return (
    <div className="relative w-full h-50">
      {/* Black keys */}

      <div className="w-full h-half flex absolute z-10">
        {BlackKeys.map((e) => (
          <Note {...e} />
        ))}
      </div>

      {/* White keys */}

      <div className="h-full flex relative">
        {WhiteKeys.map((e) => (
          <Note {...e} />
        ))}
      </div>
    </div>
  );
}

const Formulas = {
  major: [0, 2, 2, 1, 2, 2, 2, 1],
  minor: [0, 2, 1, 2, 2, 1, 2, 2],
};

export type AvailableScales = "major" | ("minor" & string);

export function GetScaleModifierFor(
  root_key_index: number = 1,
  scale_type: AvailableScales = "major"
) {
  let ScaleFormula = Formulas[scale_type];

  return (comparision_key_index: number) => {
    let current = root_key_index;

    for (let i = 0; i < ScaleFormula.length; i++) {
      const step_type = ScaleFormula[i];
      current += step_type;

      if (current > 12) {
        current -= 12;
      }

      if (current == comparision_key_index) {
        return true;
      }
    }

    return false;
  };
}
