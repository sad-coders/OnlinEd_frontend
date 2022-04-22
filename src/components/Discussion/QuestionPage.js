import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import Loading from "../Loading";

const QuestionPage = () => {
  const { allAnswerOfQuestion, getAllAnswerOfQuestion, loading } =
    useContext(GlobalContext);

  const location = useLocation();

  var question = location.state.question;

  useEffect(() => {
    getAllAnswerOfQuestion(question.classroomId, question._id);
  }, []);

  return (
    <div>
      <div>{loading && <Loading />}</div>
      <div>
        {question.title}
        {question.content}
      </div>

      <div>
        {allAnswerOfQuestion.map((answer) => {
          return (
            <p key={answer._id}>
              {answer.title}
              {answer.content}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionPage;
