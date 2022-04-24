import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Buffer } from "buffer";
import axios from "axios";
import "./UploadFile.css";
import { useParams } from "react-router-dom";
// import { Box } from "@material-ui/core";
// import Button from "@material-ui/core/Button";

// import Loading from "../Loading";

import {
  Button,
  Card,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CardContent from "@mui/material/CardContent";

// import { deleteSolution } from "../../../../OnlinEd/controller/solutionController";

const UploadAssignment = () => {
  const { classroomId } = useParams();
  console.log("new assignment  classroom id", classroomId);

  const URL = "http://localhost:5000"; //"https://onlined-be.azurewebsites.net";
  const { assignment, person, token } = useContext(GlobalContext);
  const [file, setFile] = useState(null);

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    // console.log(e.target.values);
    setFile(e.target.files[0]);
  };

  const onDownloadSoltuion = (e) => {
    e.preventDefault();
    const AssignmentId = assignment._id;
    const StudentId = person._id;
    const URL1 = `${URL}/api/v1/solution/assignment/${AssignmentId}/student/${StudentId}`;

    axios
      .get(URL1, {
        responseType: "arraybuffer",
        // headers: {
        //   "Content-Type": "application/json",
        //   Accept: "application/pdf",
        // },
      })
      .then((res) => {
        // console.log(res.data);

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "sol.pdf");
        document.body.appendChild(link);
        link.click();
      })
      .catch((e) => {
        console.error("Error", e);
      });
  };

  const [content, setContent] = useState("");
  const [assignmentTitle, setassignmentTitle] = useState("");
  const [dueDate, setdueDate] = useState("");

  const resetQuestion = () => {
    console.log(token);
    setContent("");
    setassignmentTitle("");
    setdueDate("");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    var data = new FormData();

    const newAssignment = {
      assignmentTitle: assignmentTitle,
      content: content,
      dueDate: dueDate,
      authorName: person.name,
      link: "",
      classroomId: classroomId,
      postedOn: new Date().toISOString().slice(0, 10),
      postedBy: person._id,
    };

    data.append("file", file);
    // console.log(data)
    console.log(newAssignment);
    // console.log(assignment)
    data.append("assignment", JSON.stringify(newAssignment));
    for (var key of data.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    console.log(data);
    axios
      .post(`${URL}/api/v1/assignment`, data)
      .then((res) => {
        console.log(res.statusText);
      })
      .catch((e) => {
        console.error("Error", e);
      });

    resetQuestion();
  };

  return (
    <>
      <form method="post" onSubmit={onSubmit}>
        <Grid container style={{ marginTop: 36 }}>
          <Grid item md={12} xs={12} sm={12} style={{ marginLeft: 16 }}>
            <Box sx={{ width: 500, maxWidth: "100%" }}>
              <Typography>Add a New Qusetion</Typography>
              <TextField
                required
                fullWidth
                label="Title"
                id="fullWidth"
                value={assignmentTitle}
                onChange={(e) => setassignmentTitle(e.target.value)}
              />
            </Box>

            <Box
              sx={{ width: 500, maxWidth: "100%" }}
              style={{ marginTop: "20px" }}
            >
              <TextField
                required
                fullWidth
                label="content"
                id="fullWidth"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Box>

            <Box
              sx={{ width: 500, maxWidth: "100%" }}
              style={{ marginTop: "20px" }}
            >
              <TextField
                required
                fullWidth
                label="duedate"
                id="fullWidth"
                value={dueDate}
                onChange={(e) => setdueDate(e.target.value)}
              />
            </Box>
          </Grid>
        </Grid>

        {/* <Button
              style={{ margin: 10 }}
              color="primary"
              variant="contained"
              type="submit"
              disabled={title.length && content.length ? false : true}
            >
              Ask Question?
            </Button> */}
        <Button
          style={{ margin: 10 }}
          color="secondary"
          variant="contained"
          onClick={resetQuestion}
          disabled={
            assignmentTitle.length === 0 &&
            content.length === 0 &&
            dueDate.length
              ? true
              : false
          }
        >
          Reset
        </Button>
        <div className="form-group files">
          <label>Upload New Assignment </label>
          <input
            type="file"
            name="file"
            width={"0"}
            onChange={onInputChange}
            className="form-control"
            multiple=""
          />
        </div>
        <Button
          variant="contained"
          style={{
            backgroundColor: "green",
            color: "white",
            margin: "10px",
          }}
          type="submit"
        >
          Upload Assignment
        </Button>
      </form>
      <Box display="flex" justifyContents="space-around">
        {/*<Button
          variant="contained"
          style={{
            backgroundColor: "red",
            color: "white",
            margin: "10px",
          }}
          onClick={onDeleteSoltuion}
          type="submit"
        >
          Delete Solution 
        </Button>*/}

        <Button
          variant="contained"
          color="primary"
          //display = "block"
          style={{
            margin: "10px",
          }}
          onClick={onDownloadSoltuion}
          type="submit"
        >
          Download Assignment
        </Button>
      </Box>

      {/* <href
            download={"solution.pdf"}
            // style={{ visibility: "hidden" }}
            id={"download"}
          ></href> */}
    </>
  );
};

export default UploadAssignment;

//https://onlined.blob.core.windows.net/?sv=2020-08-04&ss=b&srt=sco&sp=rwdlacitfx&se=2022-04-14T16:46:52Z&st=2022-04-14T08:46:52Z&spr=https&sig=asMJ38jh18Z5Pb6MSgsR64Eu4RTZBU0N%2Bm8FuqMEH5U%3D
