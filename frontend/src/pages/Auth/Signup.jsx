import Template from "../../components/Auth/Template";
import signupImg from "../../assets/signup.png";

function Signup({ setIsLoggedIn }) {
  return (
    <Template
      title=""
      description1=""
      description2=""
      image={signupImg}
      formType="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  );
}

export default Signup;
