'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";


export default function Navbar(){
    const {user,googleSignIn,logOut}=UserAuth();
    const [loading, setLoading]=useState(true);

    const handleSignIn=async()=>{
        try{
            await googleSignIn()
        }catch(error){
            console.log(error);
        }
    }

    const handleSignOut= async()=>{
        try{
            await logOut()
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        const  checkAuthentication = async ()=>{
            await new Promise((resolve)=> setTimeout(resolve,50));
            setLoading(false);
        };
        checkAuthentication();
    },[user])
    
    return(
        <div className="h-20 w-full border-b-2 flex items-center justify-between">
            <ul className="flex">
                <li className="p-4 cursor-pointer">
                    <Link href='/'>Home</Link>
                </li>
                <li className="p-4 cursor-pointer">
                    <Link href='/about'>About</Link>
                </li>
                <li className="p-4 cursor-pointer">
                    <Link href='/profile'>Profile</Link>
                </li>

                {/* <li className="p-2 cursor-pointer">
                    <Link href='/'>Contact</Link>
                </li> */}
            </ul>
            {
                loading? null:!user ? (
                    <ul className="flex">
                        <li className="p-4 cursor-pointer line-through " >
                            <Link href='/'>Login</Link>
                        </li>
                        <li className="p-4 cursor-pointer line-through ">
                            <Link href='/about'>SignUp</Link>
                        </li>
                        <li className="p-4 cursor-pointer" onClick={handleSignIn}>
                            Login with Google
                        </li>
                    </ul>
                ):(
                    <ul className="flex">
                        <li className="p-4 font-bold">Welcome! {user.displayName}</li>
                        <li className="p-4 cursor-pointer" onClick={handleSignOut}>
                            LogOut
                        </li>
                        <li className="p-4"><img className="profilePic" src={user.photoURL} alt="Pofile Picture"/></li>
                    </ul>
                )
            }
            
        </div>
    )
}