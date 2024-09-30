import { useState } from "react";

const useToogle = (initialState: boolean = false) => {
  const [toogle, setToogle] = useState<boolean>(initialState);

  const onToogle = () => {
    setToogle(!toogle);
  };
  return [toogle, onToogle] as const;
};
export default useToogle;
