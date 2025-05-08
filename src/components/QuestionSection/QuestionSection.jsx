import QuestionCardLabel from "./QuestionCardLabel";
import QuestionCard from "./QuestionCard";
import QuestionMeta from "./QuestionMeta";
import styles from "./QuestionSection.module.scss";

const QuestionSection = ({ question, getRandomQuestion }) => {
  return (
    <div className={styles["question-area"]}>
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
