import { Typography, Button } from "@mui/material";
import axios from "axios";
import { GlobalContext } from "../../../context/GlobalState";
import { useContext } from "react";

function AssignmentContent({ question, questionLink }) {
  const { URL } = useContext(GlobalContext);

  console.log(questionLink);
  const onDownloadSoltuion = (e) => {
    e.preventDefault();

    const URL1 = `${URL}/api/v1/assignment/file/${questionLink}`;

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
        link.setAttribute("download", "OnlinEd-assignment.pdf");
        document.body.appendChild(link);
        link.click();
      })
      .catch((e) => {
        console.error("Error", e);
      });
  };
  return (
    <>
      <Typography variant="p" component={"span"}>
        {question}
      </Typography>
      <br />
      <Button onClick={(e) => onDownloadSoltuion(e)}>
        Download Assignment PDF
      </Button>
    </>
  );
}
export default AssignmentContent;
