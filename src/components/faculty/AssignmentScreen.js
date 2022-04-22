import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalState"
// import AssignmentContent from "./AssignmentContent"
// import AssignmentHeader from "./AssignmentHeader"
import { Container, Divider } from "@material-ui/core"
// import AssignmentSubmission from "./AssignmentSubmission"
import { Grid } from "@material-ui/core"
const Assignment = () => {
    const { loading} = useContext(GlobalContext)
// assignment, getAssignment 
    // useEffect(() => {
    //     getAssignment()
    // }, [])
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
                            style={{ marginTop: '2rem' }}
                            spacing={2}>
                            <Grid item>
                                 fff
                            </Grid>

                            <Grid item
                                style={{ maxWidth: 555 }}
                            >
                                ff
                            </Grid>

                            <Grid item> 
                            </Grid>
                        </Grid>
                    </>
                )
            }
        </>
    )
}
export default Assignment