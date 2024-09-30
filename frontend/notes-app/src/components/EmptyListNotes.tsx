import React from "react";

interface TypeProp {
  content: string;
}

const EmptyListNotes: React.FC<TypeProp> = ({ content }) => {
  return (
    <div className="flex justify-center flex-col items-center mt-24">
      <img
        src="https://cdn-icons-png.flaticon.com/512/338/338055.png"
        alt=""
        className="w-60"
      />
      <p className="max-w-90 text-center mt-5 font-medium">{content}</p>
    </div>
  );
};

export default EmptyListNotes;
