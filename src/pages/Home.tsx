import { useState } from "react";
import { DefaultPianoNotes, Piano } from "../components/Piano";
import { AvailableScales, IModifierConfig, Modifier } from "../Modifiers/Basic";

function MainPiano() {
  let Mod = new Modifier();

  return (
    <div className="main-piano">
      <div className="w-full main-piano-panel">
        <select
          onInput={(e) => {
            Mod.config.key = parseInt(e.currentTarget.value);
            Mod.update(Date.now());
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
            Mod.config.scale = e.currentTarget.value == "1" ? "major" : "minor";
            Mod.update(Date.now());
          }}
        >
          <option value="1">Major</option>
          <option value="2">Minor</option>
        </select>
      </div>

      <Piano Notes={DefaultPianoNotes} Modifier={Mod} />
    </div>
  );
}

function Home() {
  return (
    <div>
      <MainPiano />
    </div>
  );
}

export default Home;
