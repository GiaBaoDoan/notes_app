import React from "react";
import { getInnital } from "../untils/helpers";
import { useNavigate } from "react-router-dom";
import { UserType } from "..";
import { PATH_URL } from "../untils/constants";

interface TypeProp {
  onLogout: () => void;
  user: UserType | null;
}

const Profile: React.FC<TypeProp> = ({ onLogout, user }) => {
  const navigate = useNavigate();
  return (
    <>
      {user && (
        <div
          onClick={() => navigate(PATH_URL.PROFILE)}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-12 cursor-pointer border hover:border-primary bg-slate-200 flex items-center justify-center rounded-full">
            {getInnital(user?.name)}
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium">{user?.name}</span>
            <button
              onClick={onLogout}
              className="text-sm underline text-slate-400 hover:text-black"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
