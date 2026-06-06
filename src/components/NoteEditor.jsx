import { useState, useEffect } from 'react'
import useAppStore from '../store/useAppStore'
import { useCreateNote, useUpdateNote, useDeleteNote } from '../hooks/useNotes'
import { useTags } from '../hooks/useTags'

export default function NoteEditor({ existingNote }) {
  const { setEditorOpen, isGuest } = useAppStore()
  const { data: tags = [] } = useTags()
  
  const createNote = useCreateNote()
  const updateNote = useUpdateNote()
  const deleteNote = useDeleteNote()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tagId, setTagId] = useState('')
  const [isStarred, setIsStarred] = useState(false)
  const [isArchived, setIsArchived] = useState(false)

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title || '')
      setBody(existingNote.body || '')
      setTagId(existingNote.tag_id || '')
      setIsStarred(existingNote.is_starred || false)
      setIsArchived(existingNote.is_archived || false)
    } else {
      setTitle('')
      setBody('')
      setTagId('')
      setIsStarred(false)
      setIsArchived(false)
    }
  }, [existingNote])

  const handleSave = () => {
    const payload = { 
      title, 
      body, 
      tag_id: tagId || null,
      is_starred: isStarred,
      is_archived: isArchived
    }
    
    if (existingNote) {
      updateNote.mutate({ id: existingNote.id, ...payload })
    } else {
      createNote.mutate(payload)
    }
    setEditorOpen(false)
  }

  const handleDelete = () => {
    if (existingNote && window.confirm("Delete this note?")) {
      deleteNote.mutate(existingNote.id)
      setEditorOpen(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-[#0e1020]/80 flex items-center justify-center p-4 z-50">
      <div className="bg-[#f0f0f8] w-full max-w-2xl border-2 border-[#4858a0] shadow-[8px_8px_0_#4858a0] flex flex-col h-[80vh]">
        
        {/* Header  */}
        <div className="bg-[#6b7cc4] px-3 py-2 flex items-center justify-between border-b-2 border-[#4858a0]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-white font-bold">EDITOR.EXE</span>
            {/* Quick Toggles in Header */}
            <button 
              onClick={() => setIsStarred(!isStarred)}
              className={`font-mono text-xl ${isStarred ? 'text-[#e0c040]' : 'text-white/50 hover:text-white'}`}
            >
              {isStarred ? '★' : '☆ '}
            </button>
            <button 
              onClick={() => setIsArchived(!isArchived)}
              className={`font-mono text-xs ${isArchived ? 'text-[#e05858] font-bold' : 'text-white/50 hover:text-white'}`}
            >
              {isArchived ? '[ARCHIVED]' : '[ARCHIVE]'}
            </button>
          </div>
          <button onClick={() => setEditorOpen(false)} className="w-5 h-6 bg-[#e05858] border border-black/30 hover:bg-red-600 text-white" > x</button>
        </div>

        {/* Editor Body */}
        <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
          <input
            type="text"
            placeholder="Note Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="font-mono text-xl border-b-2 border-[#4858a0] pb-2 bg-transparent text-[#2a3068] outline-none placeholder-[#9098c8]"
          />
          
          <textarea
            placeholder="Start typing..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="flex-1 resize-none font-mono text-sm bg-transparent text-[#2a3068] outline-none placeholder-[#9098c8]"
          />
        </div>

        {/* Footer Actions */}
        <div className="border-t-2 border-[#4858a0] p-3 flex justify-between items-center bg-[#e0e8ff]">
          <div className="flex items-center gap-4">
            {!isGuest && (
              <select 
                value={tagId} 
                onChange={(e) => setTagId(e.target.value)}
                className="font-mono text-xs border-2 border-[#4858a0] px-2 py-1 bg-white outline-none"
              >
                <option value="">No Tag</option>
                {tags.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            )}
            {existingNote && (
               <button onClick={handleDelete} className="font-mono text-xs text-[#e05858] hover:underline">
                 DELETE
               </button>
            )}
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setEditorOpen(false)}
              className="font-mono text-xs border-2 border-[#4858a0] px-4 py-2 hover:bg-[#c0c8e0]"
            >
              CANCEL
            </button>
            <button 
              onClick={handleSave}
              className="font-mono text-xs font-bold bg-[#50c878] text-white border-2 border-[#4858a0] px-4 py-2 hover:bg-[#40b060]"
            >
              SAVE
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}