import { useContext, useEffect } from "react"
import { GlobalContext } from "../../../context/GlobalState"
import AssignmentContent from "./AssignmentContent"
import AssignmentHeader from "./AssignmentHeader"
import AssignmentSubmission from "./AssignmentSubmission"
import { Grid } from "@material-ui/core"
const Assignment = () => {
    const { loading, assignment, getAssignment } = useContext(GlobalContext)

    useEffect(() => {
        getAssignment()
    }, [])
    return (
        <>
            {
                loading ? "loading" : (
                    <>
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            style={{ marginTop: '2rem'}}
                            spacing={2}>
                            <Grid item>
                                <AssignmentHeader
                                    authorName={assignment.authorName}
                                    dueDate={assignment.dueDate}
                                    postedOn={assignment.postedOn}
                                    assignmentTitle={assignment.assignmentTitle}
                                />
                            </Grid>
                            <Grid item>
                                <AssignmentContent
                                    question={assignment.content}
                                    questionLink={assignment.link}
                                />
                            </Grid>
                            <Grid item>

                                <AssignmentSubmission />

                                <Grid />
                            </Grid>
                        </Grid>
                    </>
                )
            }
        </>
    )
}
export default Assignment