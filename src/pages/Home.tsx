type INoteProps = {
  name?: string;
  black?: boolean;
  spacing: string;
};

function Note(props: INoteProps) {
  return (
    <div
      className={`flex flex-col-reverse items-center h-full w-${props.black ? "7" : "14"}p ml-${
        props.spacing || "7"
      }p bg-${props.black ? "black" : "white"} ${
        props.black ? "" : "shadow-md"
      }`}
    >
      <h1 className={`mb-4 text-sm text-white font-bold ${!props.black && "text-black"}`}>{props.name}</h1>
    </div>
  );
}

function Piano() {
  return (
    <div className="relative w-1/2 h-60">
      {/* Black keys */}

      <div className="w-full h-1/2 flex absolute z-10">
        <Note name="C# D♭" black spacing="10" />
        <Note name="D# E♭" black spacing="7" />
        <Note name="F# G♭" black spacing="21" />
        <Note name="G# A♭" black spacing="7" />
        <Note name="A# B♭" black spacing="7" />
      </div>

      {/* White keys */}

      <div className="h-full flex">
        <Note name="C" spacing="14" />
        <Note name="D" spacing="14" />
        <Note name="E" spacing="14" />
        <Note name="F" spacing="14" />
        <Note name="G" spacing="14" />
        <Note name="A" spacing="14" />
        <Note name="B" spacing="14" />
      </div>
    </div>
  );
}

function Home() {
  return (
    <div>
      <Piano />
    </div>
  );
}

export default Home;
