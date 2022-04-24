import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import Loading from "../Loading";
import { makeStyles } from "@material-ui/core/styles";
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

const QuestionPage = () => {
  const {
    allAnswerOfQuestion,
    getAllAnswerOfQuestion,
    loading,
    addAnswer,
    URL,
    person,
  } = useContext(GlobalContext);

  const location = useLocation();

  var question = location.state.question;

  useEffect(() => {
    getAllAnswerOfQuestion(question.classroomId, question._id);
  }, []);

  const { classRoomId } = useParams();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [visible, setVisible] = useState(false);

  const resetAnswer = () => {
    setContent("");
    setTitle("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const Newanswer = {
      title: title,
      content: content,
      type: "answer",
      parentId: question._id,
      date: new Date().toISOString().slice(0, 10),
      classroomId: classRoomId,
      authorName: person.name,
    };
    // call the function from the GlobalState
    addAnswer(question._id, classRoomId, Newanswer);
    resetAnswer();
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
        <div>
          <Paper elevation={10} style={{ padding: 18 }}>
            <Typography align="left" variant="h5">
              {question.title}
            </Typography>
            <p>
              Asked By:
              <Typography className={classes.secondaryHeading}>
                {question.authorName}
              </Typography>
            </p>
            <hr></hr>
            <Typography align="left" variant="p">
              {question.content}
            </Typography>
          </Paper>
        </div>

        <div>
          {visible ? (
            <form noValidate onSubmit={submitHandler}>
              <Grid container style={{ marginTop: 36 }}>
                <Grid item md={12} xs={12} sm={12} style={{ marginLeft: 16 }}>
                  <Box sx={{ width: 1100, maxWidth: "100%" }}>
                    <Typography>Add a New Answer</Typography>
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
                      label="Answer"
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
                Answer
              </Button>
              <Button
                style={{ margin: 10 }}
                color="secondary"
                variant="contained"
                onClick={resetAnswer}
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
              color="primary"
              onClick={() => {
                setVisible(true);
              }}
              style={{ marginTop: 35 }}
            >
              Answer the Question!
            </Button>
          )}

          <hr></hr>
          {question.authorId === person._id ? (
            <Button variant="contained" color="secondary">
              Delete Question
            </Button>
          ) : (
            <></>
          )}

          {allAnswerOfQuestion.map((answer) => {
            return (
              <Card
                key={answer._id}
                style={{
                  overflow: "auto",
                  marginTop: 30,
                }}
                sx={{ width: 1100, maxWidth: "100%" }}
              >
                <CardContent>
                  <div>
                    <Typography className={classes.heading} align="center">
                      {answer.title}
                    </Typography>
                  </div>

                  <p>
                    Answered By:
                    <Typography className={classes.secondaryHeading}>
                      {answer.authorName}
                    </Typography>
                    <Typography align="right">
                      {answer.authorId === person._id ? (
                        <Button variant="contained" color="secondary">
                          Delete
                        </Button>
                      ) : (
                        <></>
                      )}
                    </Typography>
                  </p>
                  <hr></hr>

                  <p>{answer.content}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default QuestionPage;
