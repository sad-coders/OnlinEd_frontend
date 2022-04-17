import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalState"
import ClassroomCard from './ClassroomCard'
function Classrooms(){
    const {classrooms,loading,getClassrooms} = useContext(GlobalContext)    
    useEffect(()=>{
        getClassrooms()
    },[])
    return (
        loading? "loading" : (
            <>
                {
                    classrooms.map((classroom,i)=>
                        <ClassroomCard key = {i} classroom = {classroom}/>
                    )
                }
            </>
        )
    )
}
export default Classrooms