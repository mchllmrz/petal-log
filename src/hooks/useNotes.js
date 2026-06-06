import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import useAppStore from '../store/useAppStore';
import toast from "react-hot-toast";
import { use } from "react";

const GUEST_KEY = 'petal-guest-notes'

function getGuestNotes(){
    const saved = localStorage.getItem(GUEST_KEY)
    return saved ? JSON.parse(saved) : []
}

function saveGuestNotes(notes){
    localStorage.setItem(GUEST_KEY, JSON.stringify(notes))
}

//read

export function useNotes(){
    const {user, isGuest} = useAppStore()

    return useQuery({
        queryKey: ['notes', isGuest ? 'guest' : user?.id],
        queryFn: async () =>{
            if(isGuest) return getGuestNotes()

            const {data, error} = await supabase
            .from('notes')
            .select('*, tags(id, name, color)')
            .order('updated_at', {ascending: false})
        if (error) throw error
        return data
        },
    })
}

export function useCreateNote(){
    const qc = useQueryClient()
    const {user, isGuest} =useAppStore()

    return useMutation({
        mutationFn: async ({title = 'Untitled', body='', tag_id=null}) =>{
            if(isGuest){
                const notes = getGuestNotes()
                const newNote = {
                    id: crypto.randomUUID(),
                    title, body, tag_id,
                    is_starred: false,
                    is_archived: false,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                }
                saveGuestNotes([newNote, ...notes])
                return newNote
            }
            const {data, error} = await supabase
                .from('notes')
                .insert({title, body, tag_id, user_id: user.id})
                .select().single()
            if (error) throw error
            return data
        },
        onSuccess: () => {qc.invalidateQueries(['notes']); toast.success('Note Created ✦')},
        onError: ()=> toast.error('Failed to create note'),
    })
}

// update

export function useUpdateNote(){
    const qc = useQueryClient()
    const {isGuest} = useAppStore()

    return useMutation({
        mutationFn: async ({id, ...fields}) =>{
            if(isGuest) {
                const notes = getGuestNotes().map(n=>
                    n.id === id? {...n, ...fields, updated_at: new Date().toISOString()} :n
                )
                saveGuestNotes(notes)
                return
            }
            const{error} = await supabase.from('notes').update(fields).eq('id', id)
            if(error) throw error
        },
        onSuccess: () => {qc.invalidateQueries(['notes']); toast.success('Saved! ✦')},
        onError: () => toast.error("Failed to save. Try again"),
    })
}


//delete

export function useDeleteNote() {
    const qc = useQueryClient()
    const {isGuest} = useAppStore()

    return useMutation({
        mutationFn:async (id) => {
            if(isGuest) {
                saveGuestNotes(getGuestNotes().filter(n=> n.id !== id))
                return
            }
            const {error} = await supabase.from('notes').delete().eq('id', id)
            if(error) throw error
        },
        onSuccess: () => {qc.invalidateQueries(['notes']); toast.success('Deleted')},
    })
}