'use client'
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { UserAuth } from "../context/AuthContext";

export default function page(){
    const {user}=UserAuth();
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        const checkAuthentication=async()=>{
            await new Promise((resolve)=>setTimeout(resolve,50));
            setLoading(false);
        };
    checkAuthentication();
    },[user]);

    return(
    <>
        <Navbar/>
        {loading? (<p>Loading...</p> ): user?(
            <p>Welcome, {user.displayName} - you are logged in to the profile page.</p>
        ):(
            <p>You must be logged in to view this page - protected route.</p>
        )}
    </>
    )
}