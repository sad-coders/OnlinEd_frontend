import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import { makeStyles } from "@material-ui/core/styles";

import Loading from "../Loading";

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

const Discussion = () => {
  const {
    allQuestionOfClassRoom,
    getAllQuestionOfClassRoom,
    loading,
    addQuestion,
    URL,
    person,
  } = useContext(GlobalContext);

  const { classRoomId } = useParams();

  useEffect(() => {
    getAllQuestionOfClassRoom(classRoomId);
  }, []);

  // for the new Question.
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [visible, setVisible] = useState(false);

  const resetQuestion = () => {
    setContent("");
    setTitle("");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const Newquestion = {
      title: title,
      content: content,
      type: "question",
      parentId: "",
      date: new Date().toISOString().slice(0, 10),
      classroomId: classRoomId,
      authorName: person.name,
    };
    // call the function from the GlobalState
    addQuestion(classRoomId, Newquestion);
    resetQuestion();
    // window.location.href = `/classroom/${classRoomId}/`;
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(18),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(16),
      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <div>{loading && <Loading />}</div>
      <Container style={{ marginTop: 16, minHeight: 99 }}>
        <Paper elevation={10} style={{ padding: 18 }}>
          <Typography align="center" variant="h2">
            DISCUSSION PORTAL
          </Typography>
        </Paper>

        {visible ? (
          <form noValidate onSubmit={submitHandler}>
            <Grid container style={{ marginTop: 36 }}>
              <Grid item md={12} xs={12} sm={12} style={{ marginLeft: 16 }}>
                <Box sx={{ width: 1100, maxWidth: "100%" }}>
                  <Typography>Add a New Qusetion</Typography>
                  <TextField
                    required
                    fullWidth
                    label="Title"
                    id="fullWidth"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Box>

                <Box
                  sx={{ width: 1100, maxWidth: "100%" }}
                  style={{ marginTop: "20px" }}
                >
                  <TextField
                    required
                    fullWidth
                    label="Question"
                    id="fullWidth"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Box>
              </Grid>
            </Grid>

            <Button
              style={{ margin: 10 }}
              color="primary"
              variant="contained"
              type="submit"
              disabled={title.length && content.length ? false : true}
            >
              Ask Question?
            </Button>
            <Button
              style={{ margin: 10 }}
              color="secondary"
              variant="contained"
              onClick={resetQuestion}
              disabled={
                title.length === 0 && content.length === 0 ? true : false
              }
            >
              Reset
            </Button>
            <Button
              onClick={() => {
                setVisible(false);
              }}
            >
              Hide
            </Button>
          </form>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setVisible(true);
            }}
            style={{ marginTop: 35 }}
          >
            Ask New Question
          </Button>
        )}
        {allQuestionOfClassRoom.map((question) => (
          <Link
            to={`/classroom/${classRoomId}/discussion/question`}
            state={{ question: question }}
            key={question._id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card
              style={{
                overflow: "auto",
                marginTop: 30,
              }}
              key={question._id}
              sx={{ width: 1100, maxWidth: "100%" }}
            >
              <CardContent>
                <Typography className={classes.heading} align="center">
                  {question.title}
                </Typography>
                <p>
                  Asked By:
                  <Typography className={classes.secondaryHeading}>
                    {question.authorName}
                  </Typography>
                </p>
                <hr></hr>

                <p>
                  {" "}
                  {question.content.length < 100
                    ? question.content.slice(0, 100)
                    : question.content.slice(0, 100) + "..."}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Container>
    </div>
  );
};

export default Discussion;
