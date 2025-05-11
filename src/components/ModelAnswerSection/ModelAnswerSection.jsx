import TagList from "../../ui/TagList";
import styles from "./ModelAnswerSection.module.scss";

const ModelAnswerSection = ({ question }) => {
  return (
    <div className={styles["model-answer-box"]}>
      <h2 className={styles["model-answer-title"]}>📌 모범 답안</h2>
      <p className={styles["model-answer-text"]}>
        {question.modelAnswer || "모범 답안이 아직 준비되지 않았습니다."}
      </p>
      {question.tags && question.tags.length > 0 && (
        <TagList items={question.tags} showRemoveButton={false} />
      )}
    </div>
  );
};

export default ModelAnswerSection;
