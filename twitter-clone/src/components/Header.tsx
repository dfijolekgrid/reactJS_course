import { FC, useState, useRef, useContext } from "react";
import UserIcon from "./UserIcon";
import { AuthContext } from "../moduls/Auth";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  userName: string;
};

const Header: FC<HeaderProps> = ({ userName }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const userPanelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const auth = useContext(AuthContext);
  if (!auth) {
    return null;
  }

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  return (
    <header className="w-full">
      <div className="w-full h-16 flex flex-row items-center justify-between bg-slate-200 px-40 text-black ">
        <span>Another twitter clone</span>
        <div
          className="flex flex-row items-center cursor-pointer"
          onClick={() => setOpenMenu((state) => !state)}
          ref={userPanelRef}
        >
          <span>{userName}</span>
          <UserIcon name={userName} />
          {openMenu && userPanelRef.current ? (
            <div
              className={`flex flex-col items-center w-28 bg-slate-900 absolute top-[55px] rounded-md py-2 border-2 border-blue-400`}
            >
              <button
                className="text-white text-lg  w-20 transition-all hover:bg-blue-400 focus:bg-blue-400  duration-500 rounded-md border-b-2 border-blue-400"
                onClick={handleLogout}
              >
                log out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
