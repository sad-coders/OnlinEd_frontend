import React from "react"
import { List, ListItem, ListItemText } from "@material-ui/core"
import { ListItemButton, ListItemIcon } from "@mui/material"
import AssignmentIcon from '@mui/icons-material/Assignment';
export default function Assignments({ assignments }) {

    return (
        <List sx={{ maxWidth: 555, bgcolor: 'background.paper' }}>
            {
                assignments.map((assignment, idx) => {
                    return (
                        <ListItemButton divider key={idx}>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItem>
                                <ListItemText primary={assignment.assignmentTitle} secondary={assignment.postedOn} />
                            </ListItem>
                        </ListItemButton>
                    )
                })
            }
        </List>
    )
}