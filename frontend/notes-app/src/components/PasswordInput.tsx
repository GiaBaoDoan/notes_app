import { Eye, EyeOff } from "lucide-react";
import { useToogle } from "../hook";
import React from "react";

interface PropType {
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const PasswordInput: React.FC<PropType> = ({
  placeholder,
  value,
  onChange,
}) => {
  const [isShowPassword, onTooglePassword] = useToogle(true);

  return (
    <div className="flex justify-between gap-3 border-[1.5px] px-5  rounded items-center mb-2">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "password" : "text"}
        placeholder={placeholder}
        className="outline-none w-full py-3 rounded"
        name="password"
      />
      {isShowPassword ? (
        <Eye
          onClick={onTooglePassword}
          size={22}
          className="text-primary cursor-pointer"
        />
      ) : (
        <EyeOff
          onClick={onTooglePassword}
          size={22}
          className="text-gray-500 cursor-pointer"
        />
      )}
    </div>
  );
};

export default PasswordInput;
