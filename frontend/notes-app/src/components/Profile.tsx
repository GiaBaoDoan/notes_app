import React from "react";
import { getInnital } from "../untils/helpers";

interface TypeProp {
  onLogout: () => void;
  user: any;
}

const Profile: React.FC<TypeProp> = ({ onLogout, user }) => {
  return (
    <>
      {user && (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-200 flex items-center justify-center rounded-full">
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
