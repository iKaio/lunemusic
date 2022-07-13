import { useState } from "react";

type INoteProps = {
  name?: string;
  black?: boolean;
  spacing?: "7" | "10" | "14" | "21";
  highlight?: boolean;
};

function Note(props: INoteProps) {
  return (
    <div
      className={`flex flex-col-reverse items-center h-full
      ${props.black ? "black-key" : "white-key"}
      ${"key-spacing-" + props.spacing}
      `}
    >
      <h1
        className={`key-name ${props.highlight ? (props.black ? "black-key-name-highlight" : "white-key-name-highlight") : ""}`}
      >
        {props.name}
      </h1>
    </div>
  );
}

type IPianoProps = {
  VisualModifier: (key_index: number) => boolean;
};

function Piano(props: IPianoProps) {
  return (
    <div className="relative w-half h-50">
      {/* Black keys */}

      <div className="w-full h-half flex absolute z-10">
        <Note name="C# D♭" black spacing="10" highlight={props.VisualModifier(2)} />
        <Note name="D# E♭" black spacing="7" highlight={props.VisualModifier(4)} />
        <Note name="F# G♭" black spacing="21" highlight={props.VisualModifier(7)} />
        <Note name="G# A♭" black spacing="7" highlight={props.VisualModifier(9)} />
        <Note name="A# B♭" black spacing="7" highlight={props.VisualModifier(11)} />
      </div>

      {/* White keys */}

      <div className="h-full flex relative">
        <Note name="C" highlight={props.VisualModifier(1)} />
        <Note name="D" highlight={props.VisualModifier(3)} />
        <Note name="E" highlight={props.VisualModifier(5)}/>
        <Note name="F" highlight={props.VisualModifier(6)} />
        <Note name="G" highlight={props.VisualModifier(8)} />
        <Note name="A" highlight={props.VisualModifier(10)} />
        <Note name="B" highlight={props.VisualModifier(12)} />
      </div>
    </div>
  );
}

const Formulas = {
  major: [0,2,2,1,2,2,2,1],
  minor: [0,2,1,2,2,1,2,2]
}

function GetScaleModifierFor(root_key_index: number = 1, scale_type: "major" | "minor" = "major") {

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
  }
}

function Home() {
  let [currentKey, setCurrentKey] = useState(1);
  let [currentScaleType, setCurrentScaleType] = useState("major");

  return (
    <div>
      <div className="w-full my-1">
        <select onInput={(e=>setCurrentKey(parseInt(e.target.value)))}>
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

        <select onInput={(e=>setCurrentScaleType(e.target.value))}>
          <option value="major">Major</option>
          <option value="minor">Minor</option>
        </select>
      </div>

      <Piano VisualModifier={GetScaleModifierFor(currentKey, currentScaleType)} />
    </div>
  );
}

export default Home;
