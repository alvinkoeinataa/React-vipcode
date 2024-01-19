import Button from "../Elements/Button";
import InputForm from "../Elements/Input";

const FormRegister = () => {
  return (
    <form action="">
      <InputForm label="fullname" type="text" placeholder="Insert your name here" name="fullname" />
      <InputForm label="email" type="email" placeholder="example@gmail.com" name="email" />

      <InputForm label="password" type="password" placeholder="******" name="password" />
      <InputForm label="Confirm password" type="password" placeholder="******" name="confirmPassword" />

      <Button variant="bg-blue-700 w-full">Register</Button>
    </form>
  );
};

export default FormRegister;
