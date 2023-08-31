import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../moduls/Auth";
interface IFormLogin {
  email: string;
  username: string;
  name: string;
  password: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>();

  const [signupError, setSignupError] = useState(false);

  const onSubmit: SubmitHandler<IFormLogin> = async ({
    email,
    username,
    name,
    password,
  }) => {
    const data = { id: username.replace(" ", ""), email, name, password };
    try {
      await auth?.signup(data);
      navigate("/login");
    } catch {
      setSignupError(true);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mt-40 border-2 border-blue-300 rounded-md">
        <h4 className="pt-3">Sign up</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          {signupError && <span className="text-red-500">Username taken</span>}
          <input
            className={` ${errors.email ? "border-red-600" : ""}`}
            placeholder="Email"
            type="email"
            {...register("email", {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
          />
          <span className="text-red-600 text-sm" role="alert">
            {errors?.email?.message}
          </span>
          <input
            className={` ${errors.password ? "border-red-600" : ""}`}
            placeholder="Password"
            type="password"
            {...register("password", {
              maxLength: { value: 256, message: "Password to long (max 256)" },
              minLength: { value: 8, message: "Password to short (min 8)" },
            })}
          />
          <span className="text-red-600 text-sm" role="alert">
            {errors?.password?.message}
          </span>
          <input
            className={` ${errors.username ? "border-red-600" : ""}`}
            placeholder="Username"
            {...register("username", {
              maxLength: { value: 256, message: "Username to long (max 256)" },
              minLength: { value: 8, message: "Username to short (min 8)" },
            })}
          />
          <span className="text-red-600 text-sm" role="alert">
            {errors?.username?.message}
          </span>
          <input
            className={` ${errors.name ? "border-red-600" : ""}`}
            placeholder="Full name"
            {...register("name", {
              maxLength: { value: 512, message: "Full name to long (max 512)" },
              minLength: { value: 1, message: "Full name to short (min 1)" },
            })}
          />
          <span className="text-red-600 text-sm" role="alert">
            {errors?.name?.message}
          </span>
          <input type="submit" value="Sign up" />
        </form>
      </div>
      <span className="pt-2">
        Already have an account?{" "}
        <Link className="text-blue-300" to="/login">
          Log in
        </Link>
      </span>
    </>
  );
};

export default Signup;
