import { useContext, useEffect } from "react"
import { GlobalContext } from "../../../context/GlobalState"
import { Grid } from "@material-ui/core"
import ClassroomCard from './ClassroomCard'
import ClassroomCreation from "./ClassroomCreation"
function Classrooms() {
    const { classrooms, loading, getClassrooms } = useContext(GlobalContext)
    useEffect(() => {
        getClassrooms()
    }, [])
    return (
        loading ? "loading" : (
            <>
                <Grid
                    container
                    direction="row"
                    alignItems="flex-start"
                    justifyContent="center"
                    style={{ marginTop: '2rem' }}
                    spacing={2}>
                    {
                        classrooms.map((classroom, i) =>
                            <Grid item key={i+1} >
                                <ClassroomCard classroom={classroom} />
                            </Grid>
                        )
                    }
                    <Grid item key={0} >
                         <ClassroomCreation/>
                    </Grid>
                </Grid>
            </>
        )
    )
}

export default Classrooms