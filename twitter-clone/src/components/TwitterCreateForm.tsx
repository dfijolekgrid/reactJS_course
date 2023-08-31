import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import TweetTextarea from "./TweetTextarea";

interface IFormTweet {
  tweet: string;
}

type TwitterCreateFormProps = {
  userId: string;
};

export const TwitterCreateForm: FC<TwitterCreateFormProps> = ({ userId }) => {
  const queryClient = useQueryClient();

  const { handleSubmit, reset, control } = useForm<IFormTweet>();

  const { mutate: postTweet } = useMutation(
    async ({ tweet }: IFormTweet) => {
      const data = {
        author_id: userId,
        text: tweet,
      };

      await axios.post("http://localhost:3001/tweets", data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tweets"]);
      },
    },
  );

  const onSubmit: SubmitHandler<IFormTweet> = (tweet) => {
    postTweet(tweet);
    reset({ tweet: "" });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-4 w-1/2 mt-8"
    >
      <TweetTextarea
        control={control}
        name="tweet"
        rules={{
          required: { value: true, message: "Tweet to short" },
          maxLength: { value: 128, message: "Tweet to long" },
        }}
      />
      <input className="px-6 py-2" type="submit" value="Tweet" />
    </form>
  );
};
