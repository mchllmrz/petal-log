import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {supabase} from './lib/supabase'
import useAppStore from './store/useAppStore'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NotesPage from './pages/NotesPage'

function App(){
  const setUser = useAppStore((s)=> s.setUser)
  const setIsGuest = useAppStore((s) => s.setIsGuest)

  useEffect(() =>{
    supabase.auth.getSession().then(({data: {session}}) =>{
      if(session?.user){
        setUser(session.user)
        setIsGuest(false)
      }
    })

    const {data: {subscription}} = supabase.auth.onAuthStateChange((_event, session)=>{
      if(session?.user){
        setUser(session.user)
        setIsGuest(false)
      }else{
        setUser(null)
        setIsGuest(true)
      }
    })

      return () => subscription.unsubscribe()
  }, [])


  return(
    <>
    <Routes>
      <Route path="/" element={<NotesPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
    </Routes>
    </>
  );
}

export default App