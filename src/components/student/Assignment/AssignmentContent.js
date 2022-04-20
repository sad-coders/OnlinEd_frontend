import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

function AssignmentContent({ question, questionLink }) {
    return (<>
        <Typography 
        variant="p"
        component={"span"}
        >
            {question}
        </Typography>
        <Link to={questionLink}>{questionLink}</Link>
    </>)
}
export default AssignmentContent