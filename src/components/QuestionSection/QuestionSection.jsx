import QuestionCardLabel from "./QuestionCardLabel";
import QuestionCard from "./QuestionCard";
import QuestionMeta from "./QuestionMeta";

const QuestionSection = ({ question, getRandomQuestion }) => {
  return (
    <div className="question-area">
      <QuestionCardLabel />
      <QuestionCard question={question} />
      <QuestionMeta
        question={question}
        handleNextQuestion={getRandomQuestion}
      />
    </div>
  );
};

export default QuestionSection;
