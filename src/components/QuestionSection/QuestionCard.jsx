const QuestionCard = ({ question, hideQuestion }) => {
  return (
    <div className="question-box">
      <p className="question-text">❝ {question.question} ❞</p>
      <button onClick={hideQuestion}>이 질문 그만 보기</button>
    </div>
  );
};

export default QuestionCard;
