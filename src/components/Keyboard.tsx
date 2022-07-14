import { useEffect, useState } from "react";
import { IModifier } from "../Modifiers/Basic";

export type IKeyboardNoteProps = {
  Note: IKeyboardNote;
  Modifier: IModifier;
};

function Note(props: IKeyboardNoteProps) {
  let isBlack = props.Note.type == "black";

  return (
    <div
      onClick={() => props.Modifier.PlayNote(props.Note.preview || props.Note.name || "C")}
      className={`flex flex-col-reverse items-center h-full

        ${isBlack ? "black-key" : "white-key"}
        ${"key-spacing-" + props.Note.spacing}
        ${props.Note.pressing ? "pressing-key" : ""}
        `}
    >
      <h1
        className={`key-name ${
          props.Note.available
            ? isBlack
              ? "black-key-name-highlight"
              : "white-key-name-highlight"
            : ""
        }`}
      >
        {props.Note.name}
      </h1>
    </div>
  );
}

export type IKeyboardNote = {
  name: string;
  type: "black" | "white";
  preview: string;
  spacing: "0" | "7" | "10" | "14" | "21";
  key?: string;
  index: number;
  available?: boolean;
  pressing?: boolean;
};

type IKeyboardProps = {
  Modifier: IModifier;
};

export function Keyboard(props: IKeyboardProps) {
  let [_, update] = useState(Date.now());
  props.Modifier.update = update;

  let BlackKeys: IKeyboardNote[] = [];
  let WhiteKeys: IKeyboardNote[] = [];

  props.Modifier.keys_states.forEach((note, i) => {
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
      props.Modifier.onKeyUp(e.code);
    };

    document.onkeydown = (e) => {
      if (!e.repeat) {
        props.Modifier.onKeyDown(e.code);
      }
    };
  }, []);

  return (
    <div className="main-piano">
      <div className="w-full main-piano-panel">
        <select
          onInput={(e) => {
            props.Modifier.config.key = parseInt(e.currentTarget.value);
            update(Date.now());
          }}
        >
          <option value="1">C</option>
          <option value="2">C# D♭</option>
          <option value="3">D</option>
          <option value="4">D# E♭</option>
          <option value="5">E</option>
          <option value="6">F</option>
          <option value="7">F# G♭</option>
          <option value="8">G</option>
          <option value="9">G# A♭</option>
          <option value="10">A</option>
          <option value="11">A# B♭</option>
          <option value="12">B</option>
        </select>

        <select
          onInput={(e) => {
            props.Modifier.config.scale = e.currentTarget.value == "1" ? "major" : "minor";
            update(Date.now());
          }}
        >
          <option value="1">Major</option>
          <option value="2">Minor</option>
        </select>

        {props.Modifier.panel_indicators.map(indi=><h1 className="panel-indicator">{indi}</h1>)}
      </div>

      <div className="relative w-full h-50">
        {/* Black keys */}

        <div className="w-full h-half flex absolute z-10">
          {BlackKeys.map((e) => (
            <Note Modifier={props.Modifier} Note={e} />
          ))}
        </div>

        {/* White keys */}

        <div className="h-full flex relative">
          {WhiteKeys.map((e) => (
            <Note Modifier={props.Modifier} Note={e} />
          ))}
        </div>
      </div>
    </div>
  );
}
