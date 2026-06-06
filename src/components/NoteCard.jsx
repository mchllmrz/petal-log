import { useUpdateNote } from '../hooks/useNotes'
import useAppStore from '../store/useAppStore'

export default function NoteCard({ note }) {
  const { setEditorOpen, setSelectedNoteId } = useAppStore()
  const updateNote = useUpdateNote();

  const handleClick = () => {
    setSelectedNoteId(note.id)
    setEditorOpen(true)
  }

  const toggleStar = (e) =>{
    e.stopPropagation()
    updateNote.mutate({id: note.id, is_starred: !note.is_starred})
  }

  const toggleArchive = (e) =>{
    e.stopPropagation()
    updateNote.mutate({id: note.id, is_archived: !note.is_archived})
  }

return (
    <div 
      onClick={handleClick}
      className={`bg-[#f0f0f8] border-2 border-[#4858a0] shadow-[4px_4px_0_#4858a0] cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0_#4858a0] transition-transform flex flex-col h-48 ${note.is_archived ? 'opacity-70 grayscale' : ''}`}
    >
      {/* Y2K Window Title Bar */}
      <div className="bg-[#6b7cc4] px-2 py-1 flex items-center justify-between border-b-2 border-[#4858a0]">
        <span className="font-mono text-[10px] text-white truncate pr-2">
          {note.title || 'UNTITLED.TXT'}
        </span>
        {note.is_starred && <span className="text-[#e0c040] text-l">★</span>}
      </div>

      {/* Note Body */}
      <div className="p-3 flex-1 overflow-hidden">
        <p className="font-mono text-sm text-[#2a3068] line-clamp-4 whitespace-pre-wrap">
          {note.body || '...'}
        </p>
      </div>

      {/* Footer (Tags & Quick Actions) */}
      <div className="px-3 py-2 border-t border-[#4858a0]/20 flex items-center justify-between">
        <div>
          {note.tags && (
            <div 
              className="px-2 py-0.5 font-mono text-[10px] text-white border border-black/20 inline-block"
              style={{ backgroundColor: note.tags.color || '#7b6fd4' }}
            >
              {note.tags.name}
            </div>
          )}
        </div>
        
        {/* Quick Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={toggleStar}
            className={`font-mono text-[10px] text-xl hover:scale-110 transition-transform ${note.is_starred ? 'text-[#e0c040]' : 'text-[#a0a8d8]'}`}
            title={note.is_starred ? "Unstar" : "Star"}
          >
            {note.is_starred ? '★' : '☆'}
          </button>
          <button 
            onClick={toggleArchive}
            className={`font-mono text-[11px] font-bold hover:underline ${note.is_archived ? 'text-[#e05858]' : 'text-[#a0a8d8]'}`}
          >
            {note.is_archived ? '[UNARCHIVE]' : '[ARCHIVE]'}
          </button>
        </div>
      </div>
    </div>
  )
}