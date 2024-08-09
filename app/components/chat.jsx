import { Box, Typography } from "@mui/material";
import React from "react";

export default function Chat(props){
    return(
        <Box>{props.content}</Box>
        // <Box display="flex" justifyContent={props.role ==='assistant'?'flex-start' : 'flex-end'}>
        //     <Box borderRadius={16} p={3} bgcolor={props.role === 'assistant' ?'primary.main':' secondary.main'}>{props.content}</Box>
        // </Box>
    );
}