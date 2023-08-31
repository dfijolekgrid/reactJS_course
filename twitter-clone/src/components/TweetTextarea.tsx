import { UseControllerProps, useController } from "react-hook-form";

type TweetTextareaProps = {
  tweet: string;
};
import { FC } from "react";

const TweetTextarea: FC<UseControllerProps<TweetTextareaProps>> = (props) => {
  const {
    field,
    formState: { errors },
  } = useController(props);

  return (
    <>
      <textarea
        className={`h-20 w-full ${
          errors.tweet
            ? "border-red-600 outline-red-600 focus:outline-red-600"
            : ""
        }`}
        onChange={field.onChange}
        value={field.value}
      />
      <span className="text-red-600 text-sm" role="alert">
        {errors?.tweet?.message}
      </span>
    </>
  );
};

export default TweetTextarea;
