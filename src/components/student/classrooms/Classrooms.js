import { useContext, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { GlobalContext } from "../../../context/GlobalState"
import { Grid } from "@material-ui/core"
import ClassroomCard from './ClassroomCard'
import ClassroomCreation from "./ClassroomCreation"
import ClassJoinCard from './ClassJoinCard'
function Classrooms() {
    const { classrooms, loading, getClassrooms, isFaculty } = useContext(GlobalContext)
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
                            <Grid item key={i + 1} >
                                <Link  to={`/classroom`}>
                                <ClassroomCard classroom={classroom} />
                                </Link>
                            </Grid>
                        )
                    }
                    {
                        isFaculty ? (
                            <Grid item key={0} >
                                <ClassroomCreation />
                            </Grid>) : (
                            <Grid>
                                <ClassJoinCard />
                            </Grid>)
                    }
                </Grid>
            </>
        )
    )
}

export default Classrooms