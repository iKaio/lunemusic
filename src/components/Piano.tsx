import { useEffect, useState } from "react";

type INoteProps = {
  name?: string;
  id?: string;
  black?: boolean;
  spacing?: "7" | "10" | "14" | "21";
  highlight?: boolean;
  pressed?: boolean;
};

function PlayNote(note_id: string) {
  new Audio("/notes/" + note_id + "3.mp3").play();
}

function Note(props: INoteProps) {
  return (
    <div
      onClick={() => PlayNote(props.id || props.name || "C")}
      className={`flex flex-col-reverse items-center h-full
        ${props.black ? "black-key" : "white-key"}
        ${"key-spacing-" + props.spacing}
        `}
    >
      <h1
        className={`key-name ${
          props.highlight
            ? props.black
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
};

type IPianoProps = {
  Notes: IPianoNote[];
  VisualModifier: (key_index: number) => boolean;
};

const KeyBoardMap = new Map<string, string>();

KeyBoardMap.set("KeyZ", "C");
KeyBoardMap.set("KeyS", "Db");
KeyBoardMap.set("KeyX", "D");
KeyBoardMap.set("KeyD", "Eb");
KeyBoardMap.set("KeyC", "E");
KeyBoardMap.set("KeyV", "F");
KeyBoardMap.set("KeyG", "Gb");
KeyBoardMap.set("KeyB", "G");
KeyBoardMap.set("KeyH", "Ab");
KeyBoardMap.set("KeyN", "A");
KeyBoardMap.set("KeyJ", "Bb");
KeyBoardMap.set("KeyM", "B");

export const DefaultPianoNotes: IPianoNote[] = [
  {name: "C", type: "white", preview: "C", spacing: "0"},
    {name: "C# D♭", type: "black", preview: "Db", spacing: "10"},
  {name: "D", type: "white", preview: "D", spacing: "0"},
    {name: "D# E♭", type: "black", preview: "Eb", spacing: "7"},
  {name: "E", type: "white", preview: "E", spacing: "0"},
  {name: "F", type: "white", preview: "F", spacing: "0"},
    {name: "F# G♭", type: "black", preview: "Gb", spacing: "21"},
  {name: "G", type: "white", preview: "G", spacing: "0"},
    {name: "G# A♭", type: "black", preview: "Ab", spacing: "7"},
  {name: "A", type: "white", preview: "A", spacing: "0"},
    {name: "A# B♭", type: "black", preview: "Bb", spacing: "7"},
  {name: "B", type: "white", preview: "B", spacing: "0"},
];

export function Piano(props: IPianoProps) {
  let [keysPressing, setKeysPressing] = useState<string[]>([]);

  useEffect(()=>{
    document.onkeyup = (e) => {
      let thisKey = KeyBoardMap.get(e.code);
      
      if (thisKey) {
        let ki = keysPressing.findIndex(e => e == thisKey);
        setKeysPressing(p => {p.splice(ki, 1); return p});
      }
    }

    document.onkeydown = (e) => {
      let thisKey = KeyBoardMap.get(e.code);

      if (!e.repeat && thisKey) {
        setKeysPressing(p => {thisKey && p.push(thisKey); return p});
        PlayNote(thisKey);
      }
    }

  }, []);
  

  return (
    <div className="relative w-full h-50">
      {/* Black keys */}

      <div className="w-full h-half flex absolute z-10">
        <Note
          name="C# D♭"
          id="Db"
          black
          spacing="10"
          highlight={props.VisualModifier(2)}
        />
        <Note
          name="D# E♭"
          id="Eb"
          black
          spacing="7"
          highlight={props.VisualModifier(4)}
        />
        <Note
          name="F# G♭"
          id="Gb"
          black
          spacing="21"
          highlight={props.VisualModifier(7)}
        />
        <Note
          name="G# A♭"
          id="Ab"
          black
          spacing="7"
          highlight={props.VisualModifier(9)}
        />
        <Note
          name="A# B♭"
          id="Bb"
          black
          spacing="7"
          highlight={props.VisualModifier(11)}
        />
      </div>

      {/* White keys */}

      <div className="h-full flex relative">
        <Note name="C" highlight={props.VisualModifier(1)} />
        <Note name="D" highlight={props.VisualModifier(3)} />
        <Note name="E" highlight={props.VisualModifier(5)} />
        <Note name="F" highlight={props.VisualModifier(6)} />
        <Note name="G" highlight={props.VisualModifier(8)} />
        <Note name="A" highlight={props.VisualModifier(10)} />
        <Note name="B" highlight={props.VisualModifier(12)} />
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
