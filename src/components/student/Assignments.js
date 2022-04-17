import React from "react"
import { List,ListItem,ListItemText } from "@material-ui/core"
import { ListItemButton } from "@mui/material"
export default function Assignments({ assignments }) {

    return (
        <List sx={{ maxWidth: 555, bgcolor: 'background.paper'}}>
            {
                assignments.map((assignment, idx) => {
                    return (
                        <ListItemButton divider key={idx}>
                        <ListItem>
                            <ListItemText primary={assignment.title} secondary={assignment.postedOn} />
                        </ListItem>
                        </ListItemButton>
                    )
                })
            }
        </List>
    )
}