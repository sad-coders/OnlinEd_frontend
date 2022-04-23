import React, { useState , useContext} from "react";
import { GlobalContext } from "../../context/GlobalState"
import { Buffer } from "buffer";
import axios from "axios";
import "./UploadFile.css";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
// import { deleteSolution } from "../../../../OnlinEd/controller/solutionController";

const UploadFile = ({assignment}) => {
  const { person , token } = useContext(GlobalContext)
  const [file, setFile] = useState(null);

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    // console.log(e.target.values);
    setFile(e.target.files[0]);
  };

  const onDeleteSoltuion = (e) => {
    e.preventDefault();
    const AssignmentId = assignment._id;
    const StudentId = person._id;
    const URL = `https://onlined-be.azurewebsites.net/api/v1/solution`;

    axios
      .delete(URL, {
        headers: {
          "content-type": "application/json", "Authorization" : token
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
    const URL = `https://onlined-be.azurewebsites.net/api/v1/solution/assignment/${AssignmentId}/student/${StudentId}`;

    axios
      .get(URL, {
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

    const data = new FormData();

    const solution = {
      studentId: person._id,
      assignmentId: assignment._id,
      link: "",
      date: "2022-09-27",
      deadline: "2022-11-29",
    };

    data.append("file", file);
    data.append("solution", JSON.stringify(solution));

    axios
      .post("https://onlined-be.azurewebsites.net/api/v1/solution", {
        headers: { "Content-Type": "application/json" ,"Authorization" : token}
      }, data)
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
            backgroundColor: 'green',
            color: 'white',
            margin : '10px'
          }}
          type="submit">
          Upload Solution
        </Button>
      </form>
      <Box
      display = "flex"
      justifyContents = "space-around"
      >
        <Button
          variant="contained"
          style={{
            backgroundColor: 'red',
            color: 'white',
            margin : '10px'
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
            margin : '10px'
          }}
          onClick={onDownloadSoltuion}
          type="submit"
        >
          Download Solution
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

export default UploadFile;

//https://onlined.blob.core.windows.net/?sv=2020-08-04&ss=b&srt=sco&sp=rwdlacitfx&se=2022-04-14T16:46:52Z&st=2022-04-14T08:46:52Z&spr=https&sig=asMJ38jh18Z5Pb6MSgsR64Eu4RTZBU0N%2Bm8FuqMEH5U%3D
