import { useState } from "react";
import Button from "../../ui/Button";
import styles from "./AnswerSection.module.scss";

const AnswerSection = ({ handleSubmit }) => {
  const [answer, setAnswer] = useState("");

  return (
    <div className={styles["answer-area"]}>
      <textarea
        placeholder="답변을 작성하고, 모범 답안을 확인해보세요!"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={5}
        className="answer-textarea"
      />
      <Button
        onClick={handleSubmit}
        disabled={answer.trim() === ""}
        className="submit-button"
      >
        답 제출하기
      </Button>
    </div>
  );
};

export default AnswerSection;
