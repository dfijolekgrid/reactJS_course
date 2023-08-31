import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../moduls/Auth";

interface IFormLogin {
  username: string;
  password: string;
}

const Login = () => {
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const auth = useContext(AuthContext);
  if (!auth) {
    return null;
  }
  const { login } = auth;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>();

  const onSubmit: SubmitHandler<IFormLogin> = async ({
    username,
    password,
  }) => {
    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      setLoginError(true);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mt-40 border-2 border-blue-300 rounded-md">
        <h4 className="pt-3">Log in</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          {loginError && (
            <span className="text-red-500">Username or password incorrect</span>
          )}

          <input
            className={` ${errors.username ? "border-red-600" : ""}`}
            placeholder="Username"
            {...register("username", {
              required: { value: true, message: "Username required" },
              minLength: { value: 1, message: "Username required" },
            })}
          />
          <span className="text-red-600 text-sm" role="alert">
            {errors?.username?.message}
          </span>
          <input
            className={`${errors.password ? "border-red-600" : ""}`}
            placeholder="Password"
            type="password"
            {...register("password", {
              required: { value: true, message: "Password required" },
              minLength: { value: 1, message: "Password required" },
            })}
          />
          <span className="text-red-600 text-sm" role="alert">
            {errors?.password?.message}
          </span>
          <input type="submit" value="Log in" />
        </form>
      </div>
      <span className="pt-2">
        Don't have an account?{" "}
        <Link className="text-blue-300" to="/signup">
          Sign up
        </Link>
      </span>
    </>
  );
};

export default Login;
