import { ListItem,ListItemButton,ListItemText } from "@mui/material"
export default function Participant({person}) {
    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemText primary={person.name} secondary={person.email} />
            </ListItemButton>
        </ListItem>
    )
}