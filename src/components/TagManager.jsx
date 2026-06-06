// src/components/TagManager.jsx
import { useState } from 'react'
import useAppStore from '../store/useAppStore'
import { useTags, useCreateTag, useDeleteTag } from '../hooks/useTags'

export default function TagManager() {
  const setTagManagerOpen = useAppStore((s) => s.setTagManagerOpen)
  const { data: tags = [] } = useTags()
  const createTag = useCreateTag()
  const deleteTag = useDeleteTag()

  const [newTagName, setNewTagName] = useState('')

  const handleCreate = (e) => {
    e.preventDefault()
    if (!newTagName.trim()) return

   
    const retroColors = ['#e898b8', '#7b6fd4', '#e0c040', '#50c878', '#6b7cc4', '#ff7b7b']
    const randomColor = retroColors[Math.floor(Math.random() * retroColors.length)]

    createTag.mutate({ name: newTagName.trim(), color: randomColor }, {
      onSuccess: () => setNewTagName('') 
    })
  }

  return (
    <div className="fixed inset-0 bg-[#0e1020]/80 flex items-center justify-center p-4 z-50">
      <div className="bg-[#f0f0f8] w-full max-w-sm border-2 border-[#4858a0] shadow-[8px_8px_0_#4858a0] flex flex-col max-h-[80vh]">
        
        {/* Header */}
        <div className="bg-[#6b7cc4] px-3 py-2 flex items-center justify-between border-b-2 border-[#4858a0]">
          <span className="font-mono text-xs text-white font-bold">TAG_MANAGER.EXE</span>
          <button onClick={() => setTagManagerOpen(false)} className="w-5 h-6 bg-[#e05858] border border-black/30 hover:bg-red-600 text-white" >x </button>
        </div>

        <div className="p-4 flex flex-col gap-4 overflow-hidden flex-1">
          <form onSubmit={handleCreate} className="flex gap-2">
            <input
              type="text"
              placeholder="new tag name..."
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              className="flex-1 font-mono text-sm border-2 border-[#4858a0] px-2 py-1 bg-white outline-none focus:border-[#e898b8]"
            />
            <button 
              type="submit"
              disabled={createTag.isLoading}
              className="font-mono text-sm bg-[#50c878] text-white border-2 border-[#4858a0] px-3 hover:bg-[#40b060]"
            >
              ADD
            </button>
          </form>

          {/* List Current Tags */}
          <div className="border-t-2 border-[#4858a0] pt-4 flex-1 overflow-y-auto">
            <div className="font-mono text-xs text-[#5060a0] mb-2 tracking-widest">CURRENT TAGS</div>
            <div className="flex flex-col gap-2">
              {tags.length === 0 && (
                <div className="font-mono text-xs text-[#9098c8]">No tags yet.</div>
              )}
              {tags.map(tag => (
                <div key={tag.id} className="flex items-center justify-between bg-white border border-[#4858a0] p-2">
                  <div className="flex items-center gap-2 font-mono text-sm text-[#2a3068]">
                    <span className="w-3 h-3 border border-black/20" style={{ backgroundColor: tag.color }}></span>
                    {tag.name}
                  </div>
                  <button 
                    onClick={() => {
                      if(window.confirm(`Delete tag "${tag.name}"?`)) deleteTag.mutate(tag.id)
                    }}
                    className="font-mono text-[10px] text-[#e05858] hover:underline"
                  >
                    [DEL]
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}