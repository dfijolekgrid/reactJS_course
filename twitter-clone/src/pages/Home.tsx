import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Tweet from "../components/Tweet";
import { AuthContext } from "../moduls/Auth";
import { TwitterCreateForm } from "../components/TwitterCreateForm";
import { Tweet as TweetType } from "../types/TweetType";

const Home = () => {
  const navigate = useNavigate();

  const auth = useContext(AuthContext);
  if (!auth) {
    return null;
  }
  const { user } = auth;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const { data } = useQuery(
    ["tweets"],
    async () => {
      const { data } = await axios.get<[TweetType]>(
        "http://localhost:3001/tweets",
      );

      return data.reverse();
    },
    { staleTime: 6000 },
  );

  return (
    <div className="w-full h-full flex flex-col items-center overflow-auto">
      <Header userName={user.name} />
      <TwitterCreateForm userId={user.id} />
      {data?.map((tweet: TweetType) => (
        <Tweet key={tweet.id} text={tweet.text} author_id={tweet.author_id} />
      ))}
    </div>
  );
};

export default Home;
