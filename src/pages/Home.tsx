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

function Home() {
  return (
    <div>
      <Piano VisualModifier={(i)=>true} />
    </div>
  );
}

export default Home;
