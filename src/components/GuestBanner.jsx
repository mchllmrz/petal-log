import { Link } from 'react-router-dom'
import useAppStore from '../store/useAppStore'

export default function GuestBanner() {
  const isGuest = useAppStore((s) => s.isGuest)

  if (!isGuest) return null 

  return (
    <div className="font-mono text-[10px] sm:text-xs text-center py-2 sm:py-1 px-2 sm:px-4 bg-[#1a1c2e] border-b border-[#2e3260] text-[#9098c8] leading-relaxed sm:leading-normal">
      {/* Mobile: Top Row / Desktop: Inline */}
      <span className="block sm:inline mb-1 sm:mb-0">
        notes are saved locally on this device <span className="hidden sm:inline">-</span>
      </span>
      
      {/* Mobile: Bottom Row / Desktop: Inline */}
      <span className="block sm:inline">
        <Link to="/signup" className="text-[#e898b8] hover:underline inline-block py-1 sm:py-0 px-1 sm:px-0">
          sign up to sync across devices
        </Link>
        <span className="mx-1">or</span>
        <Link to="/login" className="text-[#9098c8] hover:underline inline-block py-1 sm:py-0 px-1 sm:px-0">
          log in
        </Link>
      </span>
    </div>
  )
}