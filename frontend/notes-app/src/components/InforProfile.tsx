import { useInput, useLocalStorage } from "../hook";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { Loader, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { editProfile } from "../thunk/edit-profile.thunk";
import { validateEmail } from "../untils/helpers";

const InforProfile = () => {
  const { currentUser } = useSelector((state: RootState) => state.userReducer);
  const [email, onChangeEmail] = useInput(currentUser?.email);
  const [name, onChangeName] = useInput(currentUser?.name);
  const { setItem, getItem } = useLocalStorage("accessToken");
  const accessToken = getItem();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      return toast.error("Please add all inputs");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email adress!!");
    }
    setIsloading(true);
    // api call
    dispatch(editProfile({ email, name }))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setItem(res.token);
        setIsloading(false);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsloading(false);
      });
  };
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken]);
  return (
    <div className="bg-white drop-shadow rounded-lg p-5 w-[400px] center-box">
      <form onSubmit={handelSubmit} className="flex flex-col gap-5">
        <article className="flex items-center justify-between">
          <h3 className="font-medium text-2xl uppercase">Profile</h3>
          <X onClick={() => navigate("/")} className="icon-btn" />
        </article>
        <div>
          <label className="font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={onChangeEmail}
            className="border mt-1 block px-5 w-full py-3 rounded-lg"
          />
        </div>
        <div>
          <label className="font-medium" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            placeholder="username"
            value={name}
            onChange={onChangeName}
            className="border mt-1 px-5 block w-full py-3 rounded-lg"
          />
        </div>
        <Link
          to={"/change-password"}
          className="underline self-start text-sm text-primary"
        >
          Edit password ?
        </Link>
        <button
          disabled={isLoading}
          className="btn-primary flex justify-center"
        >
          {isLoading ? <Loader /> : "Update"}
        </button>
      </form>
    </div>
  );
};

export default InforProfile;
