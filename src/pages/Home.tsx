import { DefaultPianoNotes, Keyboard } from "../components/Keyboard";
import { Modifier } from "../Modifiers/Basic";

function Home() {
  let Mod = new Modifier();

  return (
    <div>
      <h1>Your keyboard</h1>
      <Keyboard Notes={DefaultPianoNotes} Modifier={Mod} />
    </div>
  );
}

export default Home;
