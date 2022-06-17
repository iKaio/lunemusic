type IApp = {
    name: string; icon: string; background: string;
}

export const App: React.FC<{data: IApp}> = ({data}) => {
    return <div className="w-60 h-36 mr-2 mb-2 relative rounded-md overflow-hidden">
        <img className="h-full absolute object-cover" src={data.background} />
        <div className="w-full absolute h-16 bottom-0 bg-gradient-to-b from-transparent to-black flex p-2">
            <img className="h-full" src={data.icon} />
            <div className="ml-2">
                <h1 className="text-white font-semibold font-inter">{data.name}</h1>
                <h1 className="text-neutral-400 leading-3 text-sm">100 mil downloads</h1>

                <a className="group absolute right-2 top-1/4" href="/download">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path className="fill-white group-hover:fill-blue-500 duration-200" d="M6 13h4v-7h4v7h4l-6 6-6-6zm16-1c0 5.514-4.486 10-10 10s-10-4.486-10-10 4.486-10 10-10 10 4.486 10 10zm2 0c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z"/></svg>
                </a>
            </div>
        </div>
    </div>
}

export const Apps: React.FC<{list: IApp[]}> = ({list}) => {
    return <div className="flex flex-wrap">
        {list.map(app=><App data={app} />)}
    </div>
}