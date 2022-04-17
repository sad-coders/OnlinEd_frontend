import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalState"
import AssignmentContent from "./AssignmentContent"
import AssignmentHeader from "./AssignmentHeader"
import AssignmentSubmission from "./AssignmentSubmission"

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
                        <AssignmentHeader
                            authorName={assignment.authorName}
                            dueDate={assignment.dueDate}
                            postedOn={assignment.postedOn}
                            assignmentTitle={assignment.assignmentTitle}
                        />
                        <hr />
                        <AssignmentContent
                            question={assignment.content}
                            questionLink={assignment.link}
                        />
                        <hr />
                        {
                            <AssignmentSubmission />
                        }
                    </>
                )
            }
        </>
    )
}
export default Assignment