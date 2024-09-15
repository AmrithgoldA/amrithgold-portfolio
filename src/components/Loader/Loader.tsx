function Loader() {

    return (
        <div className="max-w-6xl w-full mx-auto px-4 flex justify-center relative z-10">
        
        <div className="w-full lg:h-screen h-[85vh] flex justify-center items-center transition-opacity duration-1000">
            <div className='h-16 w-16 rounded-md border-2 border-purple-400 animate-rotateSlow'></div>
            <div className='h-[5rem] w-[5rem] rounded-md border-2 border-purple-400 rotate-45 absolute animate-ping'></div>
            <div className='h-[6rem] w-[6rem] rounded-md border-2 border-purple-400 rotate-45 absolute animate-ping'></div>
            <div className='h-[7rem] w-[7rem] rounded-md border-2 border-purple-400 rotate-45 absolute animate-ping'></div>
        </div>
        </div>
    );
};

export default Loader;
