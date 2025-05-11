import styles from "./TagList.module.scss";

const TagList = ({ question }) => {
  return (
    <div className={styles["tag-list"]}>
      <div className={styles["tags"]}>
        {question.tags.map((tag) => (
          <span key={tag} className={styles["tag"]}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagList;
