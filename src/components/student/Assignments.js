import { Typography } from "@mui/material"
import React from "react"

export default function Assignments({assignments}){
    
    return (
        assignments.map((assignment,idx)=>{
            return (
                <React.Fragment key={idx}>
                    <Typography variant="h5">
                        {assignment.title}
                    </Typography>
                    <Typography variant="h6">
                        {assignment.postedOn}
                    </Typography>
                </React.Fragment>
            )
        })
    )
}