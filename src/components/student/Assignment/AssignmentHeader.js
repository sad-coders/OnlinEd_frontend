import { Grid, Typography } from "@mui/material";

function AssignmentHeader({ assignmentTitle, authorName, postedOn, dueDate }) {
    return (
        <>
            <Grid container >
                <Grid item xs={12}
                    display="flex"
                    justifyContent={"space-between"}
                >
                    <Typography
                        variant="h5"
                        component="span"
                    >
                        {assignmentTitle}
                    </Typography>
                    <Typography
                        component="span"
                        variant="span"
                    >
                        Due {dueDate}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="span"
                    >
                        {authorName}
                    </Typography>
                    <Typography variant="span">{" • "}</Typography>
                    <Typography
                        variant="span"
                    >
                        {postedOn}
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}
export default AssignmentHeader