"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [year,setYear]=useState("2");
  const [password,setPassword]=useState(""); const [message,setMessage]=useState(""); const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
  async function submit(e:FormEvent){e.preventDefault();setBusy(true);setError("");setMessage("");
    try { const supabase=createClient();
      const {data,error}=await supabase.auth.signUp({email,password,options:{data:{full_name:name,academic_year:Number(year)}}});
      if(error) throw error;
      if(data.user) {
        const {error:profileError}=await supabase.from("profiles").upsert({id:data.user.id,full_name:name,academic_year:Number(year),approval_status:"pending"});
        if(profileError) throw profileError;
      }
      setMessage("Registration request received. An administrator must approve your student account before you can access the protected learning area. If email confirmation is enabled, confirm your email first.");
    } catch(err){setError(err instanceof Error?err.message:"Registration failed.");} finally{setBusy(false);}
  }
  return <main className="shell"><div className="auth panel"><div className="authbrand"><img src="/uog-academy-logo.png" alt="University of Gondar logo"/><span>UoG Public Health Academy</span></div><Link href="/">← Home</Link><h1>Student registration</h1><p className="muted">የተማሪ መለያ ለመፍጠር ይመዝገቡ። Admin እስኪያጸድቅ ድረስ የግል ይዘቶች አይከፈቱም።</p>
    {message&&<p className="success">{message}</p>}{error&&<p className="error">{error}</p>}
    <form className="form" onSubmit={submit}><div className="field"><label>Full name</label><input required maxLength={90} value={name} onChange={e=>setName(e.target.value)}/></div><div className="field"><label>University email / Email</label><input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)}/></div><div className="field"><label>Academic year</label><select value={year} onChange={e=>setYear(e.target.value)}><option value="2">Year 2</option><option value="3">Year 3</option><option value="4">Year 4</option></select></div><div className="field"><label>Password (at least 8 characters)</label><input type="password" autoComplete="new-password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)}/></div><button className="primary" disabled={busy}>{busy?"Submitting…":"Submit registration request"}</button></form>
    <p className="muted">Already registered? <Link href="/login"><u>Log in</u></Link></p>
  </div></main>;
}
