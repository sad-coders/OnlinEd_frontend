import { Grid, Typography } from "@mui/material";

function AssignmentHeader({ assignmentTitle, authorName, postedOn, dueDate }) {
    return (
        <>
            <Grid container >
                <Grid item xs={12}>
                    <Typography
                        variant="h5"
                    >
                        {assignmentTitle}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="span"
                    >
                        {authorName}
                    </Typography>
                    <Typography variant="span">•</Typography>
                    <Typography
                        variant="span"
                    >
                        {postedOn}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        Due {dueDate}
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}
export default AssignmentHeader