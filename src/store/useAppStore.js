import {create} from 'zustand'

const useAppStore = create((set) => ({
    user: null,
    setUser: (user) => set({user}),

    isGuest: true,
    setIsGuest: (val) => set({isGuest: val}),

    selectedNoteId: null,
    setSelectedNoteId: (id) => set({selectedNoteId: id}),

    searchQuery: '',
    setSearchQuery: (q) => set({searchQuery: q}),

    activeView: 'notes',
    setActiveView: (v) => set({activeView: v}),

    activeTagId: null,
    setActiveTagId: (id) => set({activeTagId: id}),

    isEditorOpen: false,
    setEditorOpen: (val) => set({isEditorOpen: val}),

    isTagManagerOpen: false,
    setTagManagerOpen: (isOpen) => set({isTagManagerOpen: isOpen}),
}))

export default useAppStore