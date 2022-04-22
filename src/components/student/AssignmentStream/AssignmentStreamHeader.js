import {assignmentStreamHeaderStyle} from '../styles'
function AssignmentStreamHeader({className}){
    return (
        <img style={assignmentStreamHeaderStyle} src={`${process.env.PUBLIC_URL}/assets/images/img_code.jpg`}/>
    )
}
export default AssignmentStreamHeader