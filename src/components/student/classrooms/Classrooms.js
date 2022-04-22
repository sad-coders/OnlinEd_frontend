import { useContext, useEffect, useRef } from "react"
import { GlobalContext } from "../../../context/GlobalState"
import { Grid } from "@material-ui/core"
import ClassroomCard from './ClassroomCard'
import ClassJoinCard from './ClassJoinCard'
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
                    style={{marginTop : '2rem'}}
                    spacing={2}>
                    {
                        classrooms.map((classroom, i) =>
                            <Grid item key={i} >
                                <ClassroomCard classroom={classroom} />
                            </Grid>
                        )
                    }
                    <ClassJoinCard />

                </Grid>
            </>
        )
    )
}

export default Classrooms