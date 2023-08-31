import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import UserIcon from "./UserIcon";
import sanitizeHtml from "sanitize-html";
import { User } from "../types/User";
import { databaseURL } from "../constants";

type TweetProps = {
  author_id: string;
  text: string;
};

const sanitieOptions = {
  allowedTags: ["b", "i", "em", "strong", "a", "br"],
  allowedAttributes: {
    a: ["href", "target"],
  },
};

const Tweet: FC<TweetProps> = ({ author_id, text }) => {
  const cleanText = sanitizeHtml(text, sanitieOptions);

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery(
    ["user", author_id],
    async () => {
      const { data } = await axios.get<User>(
        `${databaseURL}/users/${author_id}`,
      );

      return data;
    },
    { staleTime: 6000 },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-row w-1/2 mt-8 border-2 border-blue-300 rounded-md py-1 gap-6">
      <UserIcon name={user.name} />
      <div className="w-[90%] flex flex-col justify-center items-start gap-4 my-2 overflow-hidden">
        <span>{user.name}</span>
        <div
          className="max-w-full whitespace-normal break-words"
          dangerouslySetInnerHTML={{ __html: cleanText }}
        />
      </div>
    </div>
  );
};

export default Tweet;
