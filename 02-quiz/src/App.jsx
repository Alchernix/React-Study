import { useState } from "react";

const quizs = [
  { id: 0, question: "CPU는 컴퓨터의 중앙처리장치이다.", answer: "O" },
  {
    id: 1,
    question: "RAM은 컴퓨터의 데이터를 영구적으로 저장하는 장치이다.",
    answer: "X",
  },
  { id: 2, question: "HTML은 프로그래밍 언어이다.", answer: "X" },
  {
    id: 3,
    question: "IPv6는 IPv4보다 더 많은 IP 주소를 제공한다.",
    answer: "O",
  },
  {
    id: 4,
    question:
      "컴파일러는 소스 코드를 사람이 읽을 수 있도록 변환해주는 프로그램이다.",
    answer: "X",
  },
];

function Timer({ timeLeft }) {
  return (
    <div className="timer-container">
      <div
        style={{ width: `${(timeLeft / 10000) * 100}%` }}
        className="time-bar"
      ></div>
      <div className="time-text">{Math.floor(timeLeft / 1000)}</div>
    </div>
  );
}

function Question({ question, questionNum }) {
  return (
    <div className="question">
      <h1>
        Q{questionNum + 1}. {question}
      </h1>
    </div>
  );
}

function Answers({ handleAnswer }) {
  return (
    <div className="answers">
      <button className="green" onClick={handleAnswer}>
        O
      </button>
      <button className="red" onClick={handleAnswer}>
        X
      </button>
    </div>
  );
}

function Result({ result }) {
  return (
    <h1 className={`result ${result === "O" ? "green" : "red"}`}>{result}</h1>
  );
}

function TotalResult({ score, handleReset }) {
  return (
    <>
      <h1
        className={`totalResult ${score > quizs.length / 2 ? "green" : "red"}`}
      >
        {score} / {quizs.length}
      </h1>
      <button onClick={handleReset} className="retry">
        다시하기
      </button>
    </>
  );
}

export default function Main() {
  const [quizNum, setQuizNum] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10000);

  const quiz = quizs[quizNum];
  let content;

  function handleAnswer(e) {
    if (quiz.answer === e.target.textContent) {
      setScore((score) => score + 1);
      setResult("O");
    } else {
      setResult("X");
    }

    setTimeout(() => {
      setResult(null);
      setQuizNum((quizNum) => quizNum + 1);
    }, 1000);
  }

  function handleReset() {
    setQuizNum(0);
    setScore(0);
  }

  if (result) {
    content = <Result result={result} />;
  } else if (quizNum >= quizs.length) {
    content = <TotalResult score={score} handleReset={handleReset} />;
  } else {
    content = (
      <>
        <Question question={quiz.question} questionNum={quizNum} />
        <Answers handleAnswer={handleAnswer} />
      </>
    );
  }

  // const timer = setInterval(() => {
  //   setTimeLeft((timeLeft) => timeLeft - 100);
  //   if (timeLeft <= 0) {
  //     clearInterval(timer);
  //   }
  // }, 100);

  return <main>{content}</main>;
}
