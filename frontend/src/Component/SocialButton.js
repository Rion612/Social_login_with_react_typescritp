const SocialButton = (props) => {
  return (
    <div
      style={{
        marginLeft: "10px",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        padding: "10px",
      }}
    >
      <img src={process.env.PUBLIC_URL+props.image} alt="Social button" height="20px"/>
      <button style={{ border: 'none',backgroundColor:'#fff',cursor:'pointer'}} onClick={props.onClick}>{props.name}</button>
    </div>
  );
};
export default SocialButton;
