import React, { useContext } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ListItemButton, ListItemIcon } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { GlobalContext } from "../../../context/GlobalState";
export default function Assignments({ assignments }) {
  const { isFaculty } = useContext(GlobalContext);
  console.log("Assignments.js assignments", assignments);
  return (
    <List sx={{ maxWidth: 555, bgcolor: "background.paper" }}>
      {assignments && assignments.length > 0 ? (
        assignments.map((assignment, idx) => {
          console.log(assignment.assignmentId);
          return (
            <Link
              key={idx}
              to={
                isFaculty
                  ? `/assignmentmarks/${assignment.assignmentId}`
                  : `/assignment/${assignment.assignmentId}`
              }
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton divider>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItem>
                  <ListItemText
                    primary={assignment.assignmentTitle}
                    secondary={assignment.postedOn}
                  />
                </ListItem>
              </ListItemButton>
            </Link>
          );
        })
      ) : (
        <> No Assignments Posted Yet!</>
      )}
    </List>
  );
}
