import styles from "./Button.module.scss";

const Button = ({
  children,
  onClick,
  size = "md",
  color = "primary",
  disabled = false,
  className,
}) => {
  const classNames = [styles.btn, styles[color], styles[size], className]
    .filter(Boolean)
    .join(" ");
  return (
    <button className={classNames} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
