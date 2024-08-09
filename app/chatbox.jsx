'use client'
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Chat from "./components/chat";


export default function Chatbox(){
    const [messages, setMessages] = useState([{
        role: 'assistant',
        content: `Hey there! I'm here to offer life advice, motivation, and a healthy dose of sarcasm. What's on your mind, and how can I help?`,
    },]);
    const [message, setMessage] = useState("");

    const sendMessage = async ()=>{
        setMessages((messages)=>[
            ...messages,
            {role:'user',content:message},
            {role:'assistant',content:''}
        ])
        setMessage('')
        console.log("messages:  "+ messages); 
        const response = fetch('/api/chat/',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify([...messages,{role:'user',content:message}]),
        }).then(async (res)=>{
            const reader=res.body.getReader()
            const decoder = new TextDecoder()

            let result=''
            return reader.read().then(function processText({done,value}){
                if(done){
                    return result
                }
                const text = decoder.decode(value || new Uint8Array(),{stream:true})
                setMessages((messages)=>{
                    let lastMessage = messages[messages.length-1]
                    let otherMessages = messages.slice(0,messages.length-1)
                    return [
                        ...otherMessages,
                        {
                            ...lastMessage,
                            content: lastMessage.content + text
                        }
                    ]
                })
                return reader.read().then(processText)
            })
        })
    }
    return (
        <Box width="70vw" height="70vh" border={"1px solid #50B498"} bgcolor="#DEF9C4" borderRadius={4}>
            <Box display={"flex"} width={"100%"} height={"100%"} flexDirection={"column"} justifyContent={"space-between"} overflow={"auto"}>
                    <Stack overflow={"auto"}>
                        {
                            messages.map((message,index)=>{
                                return(
                                    <Box key={index} display={"flex"}
                                    justifyContent={message.role === 'assistant'?'flex-start':'flex-end'} margin={1}
                                    >
                                        <Box 
                                        bgcolor={message.role ==='assistant'?'#468585':'#9CDBA6'} maxWidth={"60%"}
                                        p={2} borderRadius={8} color={"black"} fontSize={13}>{message.content}</Box>
                                    </Box>
                                );
                            })
                        }
                    </Stack>
                {/* </Box> */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={1}>
                    <TextField fullWidth id="outlined-multiline-flexible" helperText="" multiline label="Whats on you mind?" value={message} onChange={(e)=>{
                        setMessage(e.target.value)
                    }}></TextField>
                    <Button onClick={sendMessage}>
                        <svg fill="" height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                            viewBox="0 0 512.001 512.001" xmlSpace="preserve">
                        <g>
                            <g>
                                <g>
                                    <path d="M483.927,212.664L66.967,25.834C30.95,9.695-7.905,42.024,1.398,80.367l21.593,89.001
                                        c3.063,12.622,11.283,23.562,22.554,30.014l83.685,47.915c6.723,3.85,6.738,13.546,0,17.405l-83.684,47.915
                                        c-11.271,6.452-19.491,17.393-22.554,30.015L1.398,431.633c-9.283,38.257,29.507,70.691,65.569,54.534l416.961-186.83
                                        C521.383,282.554,521.333,229.424,483.927,212.664z M468.609,265.151l-416.96,186.83c-7.618,3.417-15.814-3.398-13.845-11.516
                                        l21.593-89.001c0.647-2.665,2.383-4.975,4.761-6.337l83.685-47.915c31.857-18.239,31.887-64.167,0-82.423l-83.685-47.916
                                        c-2.379-1.362-4.115-3.672-4.761-6.337L37.804,71.535c-1.945-8.016,6.128-14.975,13.845-11.514L468.61,246.85
                                        C476.522,250.396,476.542,261.596,468.609,265.151z"/>
                                    <path d="M359.268,238.907l-147.519-66.1c-9.444-4.231-20.523-0.005-24.752,9.435c-4.231,9.44-0.006,20.523,9.434,24.752
                                        L305.802,256l-109.37,49.006c-9.44,4.231-13.664,15.313-9.434,24.752c4.231,9.443,15.312,13.663,24.752,9.435l147.519-66.101
                                        C373.996,266.495,374.006,245.51,359.268,238.907z"/>
                                </g>
                            </g>
                        </g>
                        </svg>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}