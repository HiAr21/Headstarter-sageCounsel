"use client";
import { Box, Button, Stack } from "@mui/material";
import Chatbox from "./chatbox";
import Navbar from "./components/navbar";
import { useState } from "react";

export default function Home() {
  const [open, setOpen]=useState('block');

  return (
    <>
    <Stack>
      <Navbar/>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"80vh"}>
        {/* <Button variant="outlined" className="noMindingBtn" onClick={()=>{
          if(open==='none'){
            setOpen('block')
          }else setOpen('none')
        }}>chat</Button> */}
        <Box display={open}><Chatbox /></Box>
      </Box>
    </Stack>
    </>
  );
}
