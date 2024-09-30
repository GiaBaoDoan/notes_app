import { useState } from "react";

const useInput = (initialState: string = "") => {
  const [value, setValue] = useState<string>(initialState);

  const onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setValue(e.target.value);
  };

  const clearInput = (): void => setValue("");

  return [value, onChange, clearInput] as const;
};
export default useInput;
