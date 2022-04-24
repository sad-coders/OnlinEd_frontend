import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Buffer } from "buffer";
import axios from "axios";
import "./UploadFile.css";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
// import { deleteSolution } from "../../../../OnlinEd/controller/solutionController";

const UploadFile = () => {
  // const URL = "http://localhost:5000"; //"https://onlined-be.azurewebsites.net";
  const { assignment, person, token, URL } = useContext(GlobalContext);
  const [file, setFile] = useState(null);
  const [solution, setSolution] = useState({ 
    _id: null,
    studentId : "",
    assignmentId : "",
    link : "",
    dateOfSubmission : "",
    deadline : "",
    marks : null,
    studentName : ""
})

  console.log(solution);

  const fetchDetails = async () => {
    // preventDefault();
    const assignmentId = assignment._id;
    const studentId = person._id;
    const URL1 = `${URL}/api/v1/solution/getSolutionDetails/${assignmentId}/${studentId}`;

    var res = await axios.get(URL1, {
                headers: {
                "content-type": "application/json",
                Authorization: token,
                }, 
            })
      console.log(res);
      setSolution(res.data.solution)
  };
  
  useEffect(() => {
    fetchDetails()       
  }, [])

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    // console.log(e.target.values);
    setFile(e.target.files[0]);
  };

  const onDeleteSoltuion = (e) => {
    e.preventDefault();
    const AssignmentId = assignment._id;
    const StudentId = person._id;
    const URL1 = `${URL}/api/v1/solution`;

    axios
      .delete(URL1, {
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
        data: { AssignmentId: AssignmentId, StudentId: StudentId },
      })
      .then((res) => {
        console.log(res.statusText);
      })
      .catch((e) => {
        console.error("Error", e);
      });
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

  const onSubmit = (e) => {
    e.preventDefault();

    var data = new FormData();

    const solution = {
      studentId: person._id,
      assignmentId: assignment._id,
      studentName: person.name,
    };

    data.append("file", file);
    // console.log(data)
    console.log(solution);
    // console.log(assignment)
    data.append("solution", JSON.stringify(solution));
    for (var key of data.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    console.log(data);
    axios
      .post(`${URL}/api/v1/solution`, data)
      .then((res) => {
        console.log(res.statusText);
      })
      .catch((e) => {
        console.error("Error", e);
      });
  };

  return (
    <>
      <form method="post" onSubmit={onSubmit}>
        <div className="form-group files">
          <label>Upload Your File </label>
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
          Upload Solution
        </Button>
      </form>
      {solution.link ? 
        (<>
          Submitted on: {solution.dateOfSubmission}
          <Box display="flex" justifyContents="space-around">   
         
            <Button
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
          </Button>

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
            Download Your Submission
          </Button>
        
        </Box>
      </>) : (<>You have not yet submitted the Assignment</>)}
      {/* <href
            download={"solution.pdf"}
            // style={{ visibility: "hidden" }}
            id={"download"}
          ></href> */}
    </>
  );
};

export default UploadFile;

//https://onlined.blob.core.windows.net/?sv=2020-08-04&ss=b&srt=sco&sp=rwdlacitfx&se=2022-04-14T16:46:52Z&st=2022-04-14T08:46:52Z&spr=https&sig=asMJ38jh18Z5Pb6MSgsR64Eu4RTZBU0N%2Bm8FuqMEH5U%3D
