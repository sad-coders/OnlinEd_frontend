import { useContext, useEffect } from "react"
import { GlobalContext } from "../../../context/GlobalState"
import { Grid } from "@material-ui/core"
import ClassroomCard from './ClassroomCard'
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
                    alignItems="start"
                    justifyContent="center"
                    style={{marginTop : '2rem'}}
                    spacing={2}>
                    {
                        classrooms.map((classroom, i) =>
                            <Grid item>
                                <ClassroomCard key={i} classroom={classroom} />
                            </Grid>
                        )
                    }

                </Grid>
            </>
        )
    )
}

export default Classrooms