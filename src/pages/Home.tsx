import { Keyboard } from "../components/Keyboard";
import { Modifier } from "../Modifiers/Basic";

function Home() {
  let Mod = new Modifier();

  return (
    <div>
      <h1>Your keyboard</h1>
      <Keyboard Modifier={Mod} />
    </div>
  );
}

export default Home;
