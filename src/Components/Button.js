const Button = (props) => {
    const {name, onClick, enabled} = props
  return (
    <>
      <button onClick={onClick} disabled={enabled}>{name}</button>
    </>
  );
};
 export default Button;