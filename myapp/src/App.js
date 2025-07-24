import React, { useState } from "react";

const questions = [
  {
    id: 1,
    questions: "who is ceo of openai",
    options: ["sundar", "kiran", "sam altman"],
    correctanswer: "sam altman",
  },
  {
    id: 2,
    questions: "is python faster than c++",
    options: ["yes", "no"],
    correctanswer: "no",
  },
  {
    id: 3,
    questions: "how to comment in python",
    options: ["&", "*", "!", "#"],
    correctanswer: "#",
  },
];

const QuizApp = () => {
  const [qindex, setindex] = useState(0);
  const [score, setscore] = useState(0);
  const [selectedans, setans] = useState("");
  const [showfeedback, setfeedback] = useState(false);
  const [feedbackans, setfeedbackans] = useState("");
  const [quizdone, setquizdone] = useState(false);

  const handle = (answer) => {
    setans(answer);
  };

  const handleSubmit = () => {
    if (!selectedans) {
      alert("please select an answer");
      return;
    }

    const currentQuestion = questions[qindex];
    if (selectedans === currentQuestion.correctanswer) {
      setscore(score + 1);
      setfeedbackans("Correct!");
    } else {
      setfeedbackans(
        `Incorrect! The correct answer was: ${currentQuestion.correctanswer}`
      );
    }
    setfeedback(true);
  };

  const nextQuestion = () => {
    if (qindex + 1 < questions.length) {
      setindex(qindex + 1);
      setans("");
      setfeedback(false);
      setfeedbackans("");
    } else {
      setquizdone(true);
    }
  };

  const restartQuiz = () => {
    setindex(0);
    setscore(0);
    setans("");
    setfeedback(false);
    setfeedbackans("");
    setquizdone(false);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
      <h1>Quiz App</h1>
      {quizdone ? (
        <>
          <h2>Quiz Completed!</h2>
          <p>
            Your final score is: {score}/{questions.length}
          </p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </>
      ) : (
        <>
          <h2>Question {qindex + 1}</h2>
          <p>{questions[qindex].questions}</p>
          <div>
            {questions[qindex].options.map((option, idx) => (
              <div key={idx}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedans === option}
                    onChange={() => handle(option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
          {showfeedback && <p>{feedbackans}</p>}
          {!showfeedback ? (
            <button onClick={handleSubmit}>Submit Answer</button>
          ) : (
            <button onClick={nextQuestion}>Next Question</button>
          )}
          <p>Score: {score}</p>
        </>
      )}
    </div>
  );
};

export default QuizApp;