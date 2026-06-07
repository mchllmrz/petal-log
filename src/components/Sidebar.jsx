import { useState } from 'react'
import useAppStore from '../store/useAppStore'
import { useTags } from '../hooks/useTags'
import { useAuth } from '../hooks/useAuth'
import SearchBar from './SearchBar'

export default function Sidebar() {
  const { activeView, setActiveView, activeTagId, setActiveTagId, setEditorOpen, setSelectedNoteId, isGuest, setTagManagerOpen } = useAppStore()
  const { data: tags = [] } = useTags()
  const { logout } = useAuth()
  
 
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleNewNote = () => {
    setSelectedNoteId(null)
    setEditorOpen(true)
    setIsMobileOpen(false) 
  }

  
  const NavItem = ({ label, viewId }) => (
    <button
      onClick={() => { 
        setActiveView(viewId); 
        setActiveTagId(null); 
        setIsMobileOpen(false); 
      }}
      className={`w-full text-left font-mono text-sm px-3 py-2 sm:py-3 md:py-2 border-2 border-transparent hover:border-[#4858a0] ${
        activeView === viewId && !activeTagId ? 'bg-[#7b6fd4] text-white border-[#4858a0] shadow-[2px_2px_0_#4858a0]' : 'text-[#9098c8]'
      }`}
    >
      {label}
    </button>
  )

  return (
    <>
   
      <div className="md:hidden p-4 bg-[#1a1c38] border-b-2 border-[#4858a0] flex justify-between items-center fixed top-0 w-full z-40">
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-white font-mono border-2 border-[#4858a0] px-2 py-0.5 bg-[#2a2e58]"
        >
          {isMobileOpen ? '=' : '='}
        </button>
       <h1 className='font-mono text-[white] text-xl font-bold'>🌸 Petal.log</h1>

      </div>

  
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}

   
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1c38] border-r-2 border-[#4858a0] p-4 flex flex-col h-full transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
       
        <h1 className='hidden md:block font-mono text-[white] text-3xl font-bold'>🌸 Petal.log</h1>
        <br className='hidden md:block' />
        
        <button 
          onClick={handleNewNote}
          className="mb-6 font-mono font-bold bg-[#e898b8] text-[#2a3068] border-2 border-[#4858a0] py-3 md:py-2 shadow-[3px_3px_0_#4858a0] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#4858a0] transition-all"
        >
          + NEW NOTE
        </button>

        <SearchBar />

        <div className="flex flex-col gap-1 flex-1 overflow-y-auto mt-2">
          <NavItem label="All Notes" viewId="notes" />
          <NavItem label="Starred ★" viewId="starred" />
          <NavItem label="Archived" viewId="archived" />

          {!isGuest && (
            <>
            <div className='mt-6 mb-2 flex items-center justify-between px-2'>
              <span className='font-mono text-xs text-[#5060a0] tracking-widest'>TAGS</span>
              <button onClick={() => { setTagManagerOpen(true); setIsMobileOpen(false); }}
                className='font-mono text-xs md:text-[10px] text-[#9098c8] hover:text-white p-1 -m-1'>
                [EDIT]
              </button>
            </div>

            {tags.map(tag => ( 
              <button
                key={tag.id}
                onClick={() =>{setActiveTagId(tag.id); setActiveView('notes'); setIsMobileOpen(false);}}
                className={`w-full text-left font-mono text-sm px-3 py-3 md:py-1.5 flex items-center gap-2 hover:bg-[#2a2e58] ${
                    activeTagId === tag.id ? 'bg-[#2a2e58] text-white' : 'text-[#9098c8]'
                  }`}>
                  <span className="w-3 h-3 border border-white/20" style={{ backgroundColor: tag.color }}></span>
                  {tag.name}
              </button>
            ))}
            </>
          )}
        </div>

        {!isGuest && (
          <button onClick={logout} className="mt-4 md:mt-auto font-mono text-sm md:text-xs text-[#e05858] hover:underline text-left px-2 py-2 md:py-0">
            LOGOUT
          </button>
        )}
      </div>
    </>
  )
}