import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IApp } from "../components/Apps";
import Navbar from "../components/Navbar";
import { APIE } from "./Home";

function App() {
  let params = useParams();

  let [data, setData] = useState<IApp>();

  useEffect(() => {
    fetch(APIE + "getapp?id=" + (parseInt(params.appid || "0")))
      .then((e) => e.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return data ? (
    <div>
      <Navbar />
      <div className="m-16"></div>

      <div className="w-full flex justify-center">
        <div className="w-3/4">
          <h1>{data?.name}</h1>
        </div>
      </div>
    </div>
  ) : <></>;
}

export default App;
