import useAppStore from "../store/useAppStore";

function SearchBar(){
    const searchQuery = useAppStore((s) => s.searchQuery)
    const setSearchQuery = useAppStore((s) => s.setSearchQuery)

    return(
        <>
        <div className="">
            
        </div>
        <div className="mb-4 sm:mb-6">
            <input type="text"
            placeholder="search notes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full font-mono text-base sm:text-sm border-2 border-[#4858a0] px-3 py-2 bg-[#f0f0f8] text-[#2a3068] outline-none focus:border-[#e898b8] shadow-[2px_2px_0_#4858a0]"/>
        </div>
        </>
    );
}

export default SearchBar