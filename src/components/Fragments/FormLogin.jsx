import { useEffect, useRef, useState } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { login } from "../../services/auth.service";

const FormLogin = () => {
  const [loginFailed, setLoginFailed] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // localStorage.setItem("email", e.target.email.value);
    // localStorage.setItem("password", e.target.password.value);

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);
        window.location.href = "/products";
      } else {
        setLoginFailed(res.response.data);
        // console.log(res.response.data);
      }
    });
  };
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleLogin}>
      <InputForm label="username" type="text" placeholder="example@gmail.com" name="username" ref={usernameRef} />

      <InputForm label="password" type="password" placeholder="******" name="password" />

      <Button variant="bg-blue-700 w-full" type="submit">
        Login
      </Button>

      {loginFailed && <p className="text-red-500">{loginFailed}</p>}
    </form>
  );
};

export default FormLogin;
