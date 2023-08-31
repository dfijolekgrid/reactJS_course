import { FC } from "react";

interface UserIconProps {
  name: string;
}

const UserIcon: FC<UserIconProps> = ({ name }) => {
  return (
    <div className="w-10 h-10 text-center align-middle pt-[6px] m-2 border-2 border-blue-400 rounded-full  bg-white text-blue-400">
      {name
        .split(" ")
        .map((word: string) => word.at(0)?.toUpperCase())
        .join("")}
    </div>
  );
};

export default UserIcon;
