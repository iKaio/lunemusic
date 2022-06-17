const Navbar: React.FC<{}> = () => {
    return <div className="top-0 flex items-center justify-center fixed w-full h-12 bg-neutral-50 bg-opacity-50 backdrop-blur-sm">
        <a className="font-semibold" href="/apps/windows">windows</a>
        <img className="h-3/6 mx-5" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="libstore logo" />
        <a className="font-semibold" href="/apps/android">android</a>
    </div>
}

export default Navbar;