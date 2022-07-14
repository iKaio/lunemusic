import { useEffect, useState } from "react";
import { IModifier } from "../Modifiers/Basic";

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

export type IPianoNote = {
  name: string;
  type: "black" | "white";
  preview: string;
  spacing: "0" | "7" | "10" | "14" | "21";
  key?: string;
  index: number;
  available?: boolean;
  pressing?: boolean;
};

type IPianoProps = {
  Notes: IPianoNote[];
  Modifier: IModifier;
};

export const DefaultPianoNotes: IPianoNote[] = [
  { name: "C", type: "white", preview: "C", spacing: "0", key: "KeyZ", index: 1 },
  { name: "C# D♭", type: "black", preview: "Db", spacing: "10", key: "KeyS", index: 2 },
  { name: "D", type: "white", preview: "D", spacing: "0", key: "KeyX", index: 3 },
  { name: "D# E♭", type: "black", preview: "Eb", spacing: "7", key: "KeyD", index: 4 },
  { name: "E", type: "white", preview: "E", spacing: "0", key: "KeyC", index: 5 },
  { name: "F", type: "white", preview: "F", spacing: "0", key: "KeyV", index: 6 },
  { name: "F# G♭", type: "black", preview: "Gb", spacing: "21", key: "KeyG", index: 7 },
  { name: "G", type: "white", preview: "G", spacing: "0", key: "KeyB", index: 8 },
  { name: "G# A♭", type: "black", preview: "Ab", spacing: "7", key: "KeyH", index: 9 },
  { name: "A", type: "white", preview: "A", spacing: "0", key: "KeyN", index: 10 },
  { name: "A# B♭", type: "black", preview: "Bb", spacing: "7", key: "KeyJ", index: 11 },
  { name: "B", type: "white", preview: "B", spacing: "0", key: "KeyM", index: 12 },
];

export function Piano(props: IPianoProps) {
  let [_, update] = useState(Date.now());
  props.Modifier.update = update;
  let [keyStates, setKeyStates] = useState(props.Notes);

  let BlackKeys: IPianoNote[] = [];
  let WhiteKeys: IPianoNote[] = [];

  keyStates.forEach((note, i) => {
    note.index = i + 1;
    note.available = props.Modifier.isKeyAvailable(i + 1);

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

        props.Modifier.onKeyDown(KeysStates);
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
