import { Loader } from "lucide-react";

const Modal = () => {
  return (
    <div className="overlay flex items-center justify-center">
      <Loader size={26} className="text-white" />
    </div>
  );
};

export default Modal;
