import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    corrects: 0,
    currentIndex: 0,
    buttonClass: ["", "", "", ""],
    statusBarWidth: "1%",
    topics: [
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
    ],
  };

  answerHandler = (answerIndex) => {
    /*
    let newCorrects =
      this.state.corrects +
      this.state.topics[this.state.currentIndex].answers[answerIndex].correct
        ? 1
        : 0;

    let newCurrentIndex = this.state.currentIndex + 1;
    let newStatusBarWidth =
      (newCurrentIndex / this.state.topics.length) * 100 + "%";

    this.setState({
      currentIndex: newCurrentIndex,
      corrects: newCorrects,
      statusBarWidth: newStatusBarWidth,
    });
    */
    console.log("answerHandler");
    let currentQuestion = this.state.topics[this.state.currentIndex];
    if (currentQuestion.answers[answerIndex].correct) {
      this.setState({
        corrects: this.state.corrects + 1,
      });
    }

    //find correct answer index
    const correctAnsIndex = currentQuestion.answers.findIndex((answer) => {
      return answer.correct;
    });

    //highlightChoice
    this.highlightChoice(answerIndex, correctAnsIndex);

    setTimeout(() => {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
        buttonClass: ["", "", "", ""],
        statusBarWidth:
          (this.state.currentIndex + 1 / this.state.topics.length) * 100 + "%",
      });
    }, 1000);
  };

  highlightChoice = (selectedIndex, correctAnsIndex) => {
    const newButtonClass = ["", "", "", ""];
    if (selectedIndex === correctAnsIndex) {
      newButtonClass[selectedIndex] = "correct";
    } else {
      newButtonClass[selectedIndex] = "wrong";
      newButtonClass[correctAnsIndex] = "correct";
    }

    this.setState({
      buttonClass: newButtonClass,
    });
  };

  startOver = () => {
    this.setState({
      corrects: 0,
      currentIndex: 0,
      buttonClass: ["", "", "", ""],
      statusBarWidth: "1%",
    });
  };

  render() {
    return (
      <div className="App">
        <div
          className="statusBar"
          style={{ width: this.state.statusBarWidth }}
        ></div>

        {this.state.currentIndex < this.state.topics.length ? (
          <div className="topics-container">
            <h2>{this.state.topics[this.state.currentIndex].question}</h2>

            {this.state.topics[this.state.currentIndex].answers.map(
              (answer, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => this.answerHandler(index)}
                    className={this.state.buttonClass[index]}
                  >
                    {answer.value}
                  </button>
                );
              }
            )}
          </div>
        ) : (
          <div className="fireworks">
            <div className="before"></div>
            <div className="after"></div>
            <div className="result">
              <h2>Completed!</h2>
              <h3>
                Your score is:{" "}
                {(this.state.corrects / this.state.topics.length) * 100}
              </h3>
              <button onClick={this.startOver}>Start Over</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
