import { useContext, useEffect } from "react"
import { GlobalContext } from "../../../context/GlobalState"
import AssignmentContent from "./AssignmentContent"
import AssignmentHeader from "./AssignmentHeader"
import { Container, Divider } from "@material-ui/core"
import Loader from "../../Loader"
import AssignmentSubmission from "./AssignmentSubmission"
import { Grid } from "@material-ui/core"
import { useLocation, useParams } from "react-router-dom"
const Assignment = () => {
    const location = useLocation();
    console.log("assignment loc",location);
    const { loading, assignment, getAssignment } = useContext(GlobalContext)
    const {assignmentId} = useParams()
    console.log("assignment id",assignmentId)
    console.log("assignment",assignment)

    useEffect(() => {
       getAssignment(assignmentId)
       console.log("hello word:(")
    }, [assignmentId]);
    // const location = useLocation();
    // console.log("assignment loc",location);
    return (
        <>
            {
                loading ? <Loader/> : (
                    <>
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            style={{ marginTop: '2rem' }}
                            spacing={2}>
                            <Grid item>
                                <AssignmentHeader
                                    authorName={assignment.authorName}
                                    dueDate={assignment.dueDate}
                                    postedOn={assignment.postedOn}
                                    assignmentTitle={assignment.assignmentTitle}
                                />
                            </Grid>

                            <Grid item
                                style={{ maxWidth: 555 }}
                            >
                                <AssignmentContent
                                    question={assignment.content}
                                    questionLink={assignment.link}
                                />
                            </Grid>

                            <Grid item>
                                <AssignmentSubmission assignment={assignment} />
                            </Grid>
                        </Grid>
                    </>
                )
            }
        </>
    )
}
export default Assignment