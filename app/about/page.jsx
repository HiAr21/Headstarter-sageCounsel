'use client'
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { UserAuth } from "../context/AuthContext";

export default function page(){
//     const {user}=UserAuth();
//     const [loading, setLoading]=useState(true);

//     useEffect(()=>{
//         const checkAuthentication=async()=>{
//             await new Promise((resolve)=>setTimeout(resolve,50));
//         setLoading(false);
//     };
//     checkAuthentication();
// },[user]);

    return(
    <>
        <Navbar/>
        <div className="text-3xl font-bold underline">About page</div>
    </>
    )
}