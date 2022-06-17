import { Apps } from "../components/Apps";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="m-16"></div>

      <div className="w-full flex justify-center">
        <div className="w-3/4">
          <div className="w-full">
            <h1 className="font-inter font-medium text-lg mb-2">+ Baixados</h1>
            <Apps list={[
              {name: "Minecraft", icon: "https://en.uoldown.com/icon/android/minecraft-apk/minecraft-apk-android.webp", background: "https://images6.alphacoders.com/108/thumb-1920-1082090.jpg", BETA_DownloadLink: "https://icedrive.net/s/2b65D5CDha7a1PZ1a6uFWbZCDwkP", target: 0},
              {name: "GTA: SA", icon: "https://img.gta5-mods.com/q95/images/gta-san-andreas-loading-theme/5f42d6-1024x1024bb.jpg", background: "https://images2.alphacoders.com/112/thumb-1920-1125180.png", target: 1},
              {name: "GTA: SA", icon: "https://img.gta5-mods.com/q95/images/gta-san-andreas-loading-theme/5f42d6-1024x1024bb.jpg", background: "https://images2.alphacoders.com/112/thumb-1920-1125180.png"},
              {name: "GTA: SA", icon: "https://img.gta5-mods.com/q95/images/gta-san-andreas-loading-theme/5f42d6-1024x1024bb.jpg", background: "https://images2.alphacoders.com/112/thumb-1920-1125180.png"},
              {name: "Subway Surfers", icon: "https://play-lh.googleusercontent.com/b0YfxXs5bd1tU1HoYRXzCjl1veU36LxwXP9aOzHP7HnDWSneOrjMYFNcux5zBrf9ENcW", background: "https://d2ofqe7l47306o.cloudfront.net/games/1920x1080/subway-surfers-jake-and-friends.jpg"}
              ]} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
