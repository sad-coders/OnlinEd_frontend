import { Typography } from "@mui/material";
import UploadFile from "../../UploadFile/UploadFile";

function AssignmentSubmission({assignment}){
    return (
        <>
            
            <UploadFile assignment={assignment}  />
        </>
    )
}
export default AssignmentSubmission