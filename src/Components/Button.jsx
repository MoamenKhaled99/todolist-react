import "../Styles/Button.css";

const Button = ({ type = "default", onClick, children, ...props }) => {
  let className = "btn ";
  if (type === "add") className += "btn-add";
  else if (type === "delete") className += "btn-delete";
  else if (type === "update") className += "btn-update";
  else if (type === "edit") className += "btn-edit";
  else className += "btn-default";

  return (
    <button className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
