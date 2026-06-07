import NoteCard from './NoteCard'

export default function NoteGrid({ notes }) {
  if (!notes || notes.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center font-mono text-sm md:text-base text-[#5060a0] p-4 text-center">
        No notes found here.
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {notes.map(note => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}