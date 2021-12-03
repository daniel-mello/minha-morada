import "./styles.css";

export const Button = ({ type, className, onClick, children }) => {
  return (
    <button type={type} className={`button ${className}`} onClick={onClick}>{children}</button>
  );
}