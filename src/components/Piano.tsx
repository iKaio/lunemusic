type INoteProps = {
  name?: string;
  id?: string;
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

type IPianoProps = {
  VisualModifier: (key_index: number) => boolean;
};

export function Piano(props: IPianoProps) {
  return (
    <div className="relative w-full h-50">
      {/* Black keys */}

      <div className="w-full h-half flex absolute z-10">
        <Note
          name="C# D♭"
          id="Cs"
          black
          spacing="10"
          highlight={props.VisualModifier(2)}
        />
        <Note
          name="D# E♭"
          id="Ds"
          black
          spacing="7"
          highlight={props.VisualModifier(4)}
        />
        <Note
          name="F# G♭"
          id="Fs"
          black
          spacing="21"
          highlight={props.VisualModifier(7)}
        />
        <Note
          name="G# A♭"
          id="Gs"
          black
          spacing="7"
          highlight={props.VisualModifier(9)}
        />
        <Note
          name="A# B♭"
          id="As"
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

export type AvailableScales = "major" | "minor" & string;

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
