import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalState"
import Assignments from "./Assignments"
import AssignmentStreamHeader from "./AssignmentStreamHeader"

function AssignmentStream() {
    
    const {loading,classroom,getAssignmentsOfClassroom} = useContext(GlobalContext)
    useEffect(()=>{
        getAssignmentsOfClassroom()
    },[])
    return (loading? "loading" : <>
        <AssignmentStreamHeader className={classroom.className}></AssignmentStreamHeader>
        <Assignments assignments={classroom.assignments}></Assignments>
    </>)
}
export default AssignmentStream