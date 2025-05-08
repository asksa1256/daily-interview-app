import styles from "./IconButton.module.scss";

const IconButton = ({ children, onClick }) => {
  return (
    <button className={styles["icon-btn"]} onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
