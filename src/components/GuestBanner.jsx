// src/components/GuestBanner.jsx
import { Link } from 'react-router-dom'
import useAppStore from '../store/useAppStore'

export default function GuestBanner() {
  const isGuest = useAppStore((s) => s.isGuest)

  if (!isGuest) return null // hide when logged in

  return (
    <>
    <div className="font-mono text-xs text-center py-2 px-4 bg-[#1a1c2e] border-b border-[#2e3260] text-[#9098c8]">
      notes are saved locally on this device - {' '}
      <Link to="/signup" className="text-[#e898b8] hover:underline">
        sign up to sync across devices
      </Link>
      {' '}or{' '}
      <Link to="/login" className="text-[#9098c8] hover:underline">
        log in
      </Link>
    </div>
    </>
  )
}