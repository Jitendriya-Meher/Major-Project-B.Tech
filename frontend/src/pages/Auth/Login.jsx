import Template from "../../components/Auth/Template";
import loginImg from "../../assets/login.png";

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
  );
}

export default Login;
