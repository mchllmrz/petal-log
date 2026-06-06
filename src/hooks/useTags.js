import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import useAppStore from '../store/useAppStore'

export function useTags() {
  const user = useAppStore((s) => s.user)

  return useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      if (!user) return [] // Guests don't have tags saved in the database
      
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .eq('user_id', user.id) 
        .order('name')
        
      if (error) throw error
      return data
    },
    enabled: !!user 
  })
}

export function useCreateTag() {
  const queryClient = useQueryClient()
  const user = useAppStore((s) => s.user)

  return useMutation({
    mutationFn: async (newTag) => {
      const { data, error } = await supabase
        .from('tags')
        .insert([{ ...newTag, user_id: user.id }]) 
        .select()
        
      if (error) throw error
      return data[0]
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    }
  })
}

export function useDeleteTag() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (tagId) => {
      const { error } = await supabase
        .from('tags')
        .delete()
        .eq('id', tagId)
        
      if (error) throw error
      return tagId
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    }
  })
}