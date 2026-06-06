// src/components/NoteGrid.jsx
import NoteCard from './NoteCard'

export default function NoteGrid({ notes }) {
  if (!notes || notes.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center font-mono text-[#5060a0]">
        No notes found here.
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {notes.map(note => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}