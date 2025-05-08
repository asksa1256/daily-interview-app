import styles from "./QuestionSection.module.scss";

const QuestionCard = ({ question, hideQuestion }) => {
  return (
    <div className={styles["question-box"]}>
      <p className={styles["question-text"]}>❝ {question.question} ❞</p>
      <button onClick={hideQuestion}>이 질문 그만 보기</button>
    </div>
  );
};

export default QuestionCard;
