import { useContext, useEffect } from "react"
import { GlobalContext } from "../../../context/GlobalState"
import Assignments from "./Assignments"
import AssignmentStreamHeader from "./AssignmentStreamHeader"
import {Grid} from '@mui/material'
function AssignmentStream() {

    const { loading, classroom, getAssignmentsOfClassroom } = useContext(GlobalContext)
    useEffect(() => {
        getAssignmentsOfClassroom()
    }, [])
    return (loading ? "loading" :

        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="start"
            style={{ minHeight: '100vh' ,marginTop : '2rem'}}
        >

            <Grid item xs={3}>
                <>
                    <AssignmentStreamHeader className={classroom.className}></AssignmentStreamHeader>
                    <Assignments assignments={classroom.assignments}></Assignments>
                </>
            </Grid>

        </Grid>
    )
}
export default AssignmentStream