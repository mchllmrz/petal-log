import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";

export default function LoginPage(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);

        try{
            await login(email, password)

            navigate('/')
        }catch(error){
            alert('Login Failed!')
        }finally{
            setLoading(False)
        }
    }

    const handleGoogleLogin = async () =>{
        const {error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        })

        if (error) alert("Google login failed!")
    }

    return(
        <>
        <div className="min-h-screen bg-[#0e1020] flex items-center justify-center p-4 ">
            <div className="w-full max-w-sm">
                <h1 className="text-center font-mono text-4xl font-bold text-[#e0e8ff] mb-2 ">
                    petal <span className="text-[#e898b8]">.</span> log
                </h1>
                <p className="text-center font-mono text-xs text-[#c4cef8] mb-8 tracking-wdest ">
                    YOUR NOTES, IN BLOOM
                </p>
                <div className="border-2 border-[#4858a0] shadow-[4px_4px_0_#4858a0] "> 
                    <div className="bg-[#6b7cc4] px-3 py-2 flex items-center justify-between ">
                        <span className="font-mono text-[12px] text-white font-bold ">
                            ♥ LOGIN.EXE </span>

                    <div className="flex-gap-1">
                        <div className="w-3 h-3 bg-[#50c878] border border-black/30"></div>
                        <div className="w-3 h-3 bg-[#50c878] border border-black/30"></div>
                        <div className="w-3 h-3 bg-[#50c878] border border-black/30"></div>
                    </div>
                    </div>


                    <form onSubmit={handleSubmit} className="bg-[#f0f0f8] p-6 flex flex-col gap-4">
                        <input type="email" placeholder="email"
                                value={email} onChange={e => setEmail(e.target.value)} required
                                className="font-mono text-s border-2 border-[#4858a0] px-3 py-2 bg-white text-[#2a3068] outline-none focus:border-[#e898b8] " />
                        
                        <input type="password" placeholder="password" 
                                value={password} onChange={e=> setPassword(e.target.value)} required
                                className="font-mono text-s border-2 border-[#4858a0] px-3 py-2 text-[#2a3068] outline-none focus:border-[#e898b8] "/>

                        <button type="submit" disabled={loading}
                        className="font-mono text-l font-bold bg-[#7b6fd4] text-white border-2 border-[#4858a0] py-3 shadow-[3px_3px_0_#4858a0]
                        hover:bg-[#9b8ff4] disabled:opacity-50"> {loading ? 'LOADING...' : 'LOG IN'} </button>

                        <p className="text-center font-mono text-s -mb-4 "> No Account? {" "} </p>
                        <p className="text-center font-mono text-s flex justify-center gap-3">
                            <Link to="/signup" className="text-center font-mono text-xs text-[#8890b8] hover:underline font-bold"> SIGN UP or</Link>
                           
                            <Link to="/" className="text-center font-mono text-xs text-[#8890b8] hover:underline font-bold">CONTINUE AS GUEST</Link>
                        </p>

                        <div className="flex items-center gap-2 mb-2 text-[#9098c8]">
                            <div className="flex-1 h-px bg-[#4858a0]/30"></div>
                            <span className="font-mono text-[10px] tracking-widest">OR</span>
                            <div className="flex-1 h-px bg-[#4858a0]/30"></div>
                        </div>

                        <button 
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full mb-4 flex items-center justify-center gap-2 font-mono text-sm bg-white text-[#2a3068] border-2 border-[#4858a0] py-2 shadow-[3px_3px_0_#4858a0] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#4858a0] transition-all"
                            >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            CONTINUE WITH GOOGLE
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}


