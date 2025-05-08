import Button from "../../ui/Button";
import BookmarkButton from "../BookmarkButton";
import styles from "./QuestionSection.module.scss";

const QuestionMeta = ({ question, handleNextQuestion }) => {
  const getRandomQuestion = () => {
    handleNextQuestion();
  };

  return (
    <div className={styles["question-meta"]}>
      <BookmarkButton question={question} />
      <Button onClick={getRandomQuestion}>다른 질문 보기</Button>
    </div>
  );
};

export default QuestionMeta;
