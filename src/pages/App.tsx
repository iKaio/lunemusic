import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IApp } from "../components/Apps";
import Navbar from "../components/Navbar";
import { APIE } from "./Home";

function App() {
  let params = useParams();

  let [data, setData] = useState<IApp>();

  useEffect(() => {
    fetch(APIE + "getapp?id=" + parseInt(params.appid || "0"))
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
          <div className="overflow-hidden relative w-full h-80 bg-red-300">
            <img className="w-full object-contain" src={data.background} />
          </div>

          <div className="flex w-full my-1 p-2 bg-neutral-200">
            <img className="h-16" src={data.icon} />
            <div className="ml-2">
              <h1 className="font-inter font-semibold text-xl">{data.name}</h1>
              <h1 className="text-neutral-700">{data.description}</h1>
            </div>
          </div>

          <div className="w-full my-1 p-2 bg-neutral-200">
            {data.files.map((file) => (
              <div className="w-full p-2 flex items-center">
                <h1 className="w-2/4 font-semibold">{file.name}</h1>
                <h1 className="w-1/4">{file.version}</h1>
                <a
                  href={file.url}
                  className="bg-black rounded-md text-neutral-200 px-4 py-2 font-semibold"
                >
                  Baixar
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default App;
