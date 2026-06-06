import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useAuth(){
    const navigate = useNavigate()
    

    async function login(email, password){
        const {error} = await supabase.auth.signInWithPassword({email, password})
        if (error) {toast.error(error.message); return false}
        toast.success('Welcome back  ✦')
        navigate('/')
        return true
    }

    async function signup(email, password){
        const {error} = await supabase.auth.signUp({email,password})
        if(error) {toast.error(error.message); return false}
        navigate('/')
        return true
    }

    async function logout(){
        await supabase.auth.signOut()
        navigate('/')
    }

    return {login, signup, logout}
}