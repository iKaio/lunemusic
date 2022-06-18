import { useEffect, useState } from "react";
import { Apps, IApp } from "../components/Apps";
import Navbar from "../components/Navbar";

export const APIE =
  "https://8080-sarcasticadmi-emptyrepo-hankip2xypl.ws-us47.gitpod.io/api/";

function Home() {
  let [feed, setFeed] = useState<IApp[]>();

  useEffect(() => {
    fetch(APIE + "getfeed")
      .then((e) => e.json())
      .then((data) => {
        setFeed(data);
      });
  }, []);

  return feed && feed.length > 0 ? (
    <div>
      <Navbar />
      <div className="m-16"></div>

      <div className="w-full flex justify-center">
        <div className="w-3/4">
          <div className="w-full">
            <h1 className="font-inter font-medium text-lg mb-2">+ Baixados</h1>
            <Apps list={feed} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Home;
