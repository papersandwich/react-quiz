import { useState } from "react";
import "./App.css";
//https://bit.ly/4mvXIY7

function App() {
  const [corrects, setCorrects] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonClass, setButtonClass] = useState(["", "", "", ""]);
  const [statusBarWidth, setStatusBarWidth] = useState("1%");

  const topics = [
    {
      question: "JavaScript 與 Java 有什麼關係？",
      answers: [
        {
          value: "同公司的產品",
          correct: false,
        },
        {
          value: "新版與舊版的關係",
          correct: false,
        },
        {
          value: "一點關係也沒有",
          correct: true,
        },
        {
          value: "JavaScript 是 Java 的 Web 版本",
          correct: false,
        },
      ],
    },
    {
      question: "發明 React JS 的公司是？",
      answers: [
        {
          value: "Google",
          correct: false,
        },
        {
          value: "Facebook",
          correct: true,
        },
        {
          value: "Apple",
          correct: false,
        },
        {
          value: "Microsoft",
          correct: false,
        },
      ],
    },
  ];

  const answerHandler = (answerIndex) => {
    console.log("answerHandler");
    let currentQuestion = topics[currentIndex];
    if (currentQuestion.answers[answerIndex].correct) {
      setCorrects(corrects + 1);
    }

    //find correct answer index
    const correctAnsIndex = currentQuestion.answers.findIndex((answer) => {
      return answer.correct;
    });

    //highlightChoice
    highlightChoice(answerIndex, correctAnsIndex);

    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setButtonClass(["", "", "", ""]);
      setStatusBarWidth((currentIndex + 1 / topics.length) * 100 + "%");
    }, 1000);
  };

  const highlightChoice = (selectedIndex, correctAnsIndex) => {
    const newButtonClass = ["", "", "", ""];
    if (selectedIndex === correctAnsIndex) {
      newButtonClass[selectedIndex] = "correct";
    } else {
      newButtonClass[selectedIndex] = "wrong";
      newButtonClass[correctAnsIndex] = "correct";
    }

    setButtonClass(newButtonClass);
  };

  const startOver = () => {
    setCorrects(0);
    setCurrentIndex(0);
    setButtonClass(["", "", "", ""]);
    setStatusBarWidth("1%");
  };

  return (
    <div className="App">
      <div className="statusBar" style={{ width: statusBarWidth }}></div>

      {currentIndex < topics.length ? (
        <div className="topics-container">
          <h2>{topics[currentIndex].question}</h2>

          {topics[currentIndex].answers.map((answer, index) => {
            return (
              <button
                key={index}
                onClick={() => answerHandler(index)}
                className={buttonClass[index]}
              >
                {answer.value}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="fireworks">
          <div className="before"></div>
          <div className="after"></div>
          <div className="result">
            <h2>Completed!</h2>
            <h3>Your score is: {(corrects / topics.length) * 100}</h3>
            <button onClick={startOver}>Start Over</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
