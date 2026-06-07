import { useMemo } from "react";
import { useNotes } from '../hooks/useNotes';
import useAppStore from "../store/useAppStore";
import Sidebar from "../components/Sidebar";
import NoteGrid from "../components/NoteGrid";
import NoteEditor from "../components/NoteEditor";
import GuestBanner from "../components/GuestBanner";
import TagManager from "../components/TagManager";

export default function NotesPage() {

    const { data: notes = [] } = useNotes();
    const {
        activeView,
        activeTagId,
        searchQuery,
        isEditorOpen,
        selectedNoteId,
        isTagManagerOpen,
    } = useAppStore();


    const filtered = useMemo(() => {
        return notes.filter(n => {
            if(activeView === 'starred') return n.is_starred && !n.is_archived
            if(activeView === 'archived') return n.is_archived 
            if(activeView === 'untagged') return !n.tag_id && !n.is_archived
            if(n.is_archived) return false
            if(activeTagId && n.tag_id !== activeTagId) return false
            if(searchQuery){
                const q = searchQuery.toLowerCase()
                return n.title.toLowerCase().includes(q) || 
                    (n.body || '').toLowerCase().includes(q)
            }
            return true
        })
    }, [notes, activeView, activeTagId, searchQuery])


    const selectedNote = notes.find(n => n.id === selectedNoteId)

    return (
        <div className="flex flex-col h-screen bg-[#0e1929] overflow-hidden pt-16 md:pt-0">
            <GuestBanner />

            <div className="flex flex-1 overflow-hidden min-h-0">
                <Sidebar />
                <NoteGrid notes={filtered} />
            </div>

            {isEditorOpen && (
                <NoteEditor existingNote={selectedNote} />
            )}

            {isTagManagerOpen && (
                <TagManager/>
            )}
        </div>                                            
    );
}