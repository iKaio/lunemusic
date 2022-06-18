type File = {
  name: string;
  version: string;
  url: string;
};

export type IApp = {
  name: string;
  description: string;
  icon: string;
  background: string;
  target_platform: number; // 0: android, 1: windows
  files: File[];
};

import android_icon from "../../assets/android.svg";
import windows_icon from "../../assets/windows.svg";

export const App: React.FC<{ data: IApp, index: number }> = ({ data, index }) => {
  return (
    <div className="w-60 h-36 mr-2 mb-2 relative rounded-md overflow-hidden">
      <a
        className="h-full w-full absolute z-10 cursor-pointer"
        href={"/app/" + (index+1)}
      />
      <img className="h-full absolute object-cover" src={data.background} />
      <div className="w-full absolute h-16 bottom-0 bg-gradient-to-b from-transparent to-black flex p-2">
        <img className="h-full" src={data.icon} />
        <div className="ml-2">
          <h1 className="text-white font-semibold font-inter">{data.name}</h1>
          <h1 className="text-neutral-400 leading-3 text-sm">
            1.0.0
          </h1>

          <a className="group absolute right-2 top-1/4" href="/download">
            <img src={data.target_platform ? windows_icon : android_icon} />
          </a>
        </div>
      </div>
    </div>
  );
};

export const Apps: React.FC<{ list: IApp[] }> = ({ list }) => {
  return (
    <div className="flex flex-wrap">
      {list.map((app, i) => (
        <App key={i} index={i} data={app} />
      ))}
    </div>
  );
};
