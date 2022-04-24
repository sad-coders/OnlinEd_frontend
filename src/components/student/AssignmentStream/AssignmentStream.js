import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import Assignments from "./Assignments";
import { useParams } from "react-router-dom";
import AssignmentStreamHeader from "./AssignmentStreamHeader";
import { Grid } from "@mui/material";
import Loader from "../../Loader";
import UploadAssignment from "../../UploadFile/UploadAssignment";
function AssignmentStream() {
  const { classroomId } = useParams();
  console.log("assignment stream classroom id", classroomId);

  const { loading, classroom, getAssignmentsOfClassroom, isFaculty } =
    useContext(GlobalContext);

  console.log("assignment stream", loading);
  useEffect(() => {
    getAssignmentsOfClassroom(classroomId);
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="start"
      style={{ minHeight: "100vh", marginTop: "2rem" }}
    >
      <Grid item xs={3}>
        <>
          <AssignmentStreamHeader
            className={classroom.className}
          ></AssignmentStreamHeader>
          {isFaculty ? <UploadAssignment /> : <></>}

          <Assignments assignments={classroom.assignments}></Assignments>
        </>
      </Grid>
    </Grid>
  );
}
export default AssignmentStream;
