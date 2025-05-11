import styles from "./TagList.module.scss";

const TagList = ({ items, removeTag = () => {}, showRemoveButton = false }) => {
  return (
    <div className={styles["tag-list"]}>
      <div className={styles.tags}>
        {items.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
            {showRemoveButton && (
              <button onClick={() => removeTag(tag)}>×</button>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagList;
