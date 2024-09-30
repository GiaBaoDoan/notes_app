import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useInput } from "../hook";
import { DataInput } from "..";
import { Note } from "../slice/notes.slice";
import { toast } from "react-toastify";

interface TypeProp {
  note: Note;
  onPost: (data: DataInput) => void;
  onUpdate: (data: DataInput, id: string) => void;
  onClose: () => void;
  statePost: string;
}

const AddEditNotes: React.FC<TypeProp> = ({
  onPost,
  onClose,
  onUpdate,
  statePost,
  note,
}) => {
  const [tag, changeTag, clearInput] = useInput();
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [title, onChangeTile] = useInput(note?.title);
  const [content, onChangeContent] = useInput(note?.content);
  const handelAddTag = () => {
    setTags([...tags, tag.trim()]);
    clearInput();
  };

  const handelClick = () => {
    if (!title || !content) {
      return toast.error("Please add all inputs");
    }
    const data = {
      title,
      content,
      tags,
      isPinned: note?.isPinned,
    };
    statePost === "Add" ? onPost(data) : onUpdate(data, note._id);
  };

  const handleDeleteTag = (index: number) => {
    const newArr = [...tags];
    newArr.splice(index, 1);
    setTags(newArr);
  };
  return (
    <div className="absolute left-1/2 -translate-x-1/2">
      <div className="flex border p-5 bg-white  rounded-lg drop-shadow w-[600px] flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex flex-col flex-1 gap-2">
            <label className="uppercase label-input">title</label>
            <input
              value={title}
              onChange={onChangeTile}
              type="text"
              placeholder="Go to the gym at 5P"
              className="text-2xl uppercase w-full outline-none"
            />
          </div>
          <X onClick={onClose} className="icon-btn" />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="uppercase label-input">content</label>
          <textarea
            value={content}
            onChange={onChangeContent}
            placeholder="Content"
            className="p-3 bg-slate-50 rounded outline-none"
            rows={8}
          ></textarea>
        </div>

        <div className="flex flex-col gap-4 mb-4">
          <label className="label-input">TAGS</label>
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag, index) => {
              return (
                <div
                  key={index}
                  className="flex bg-slate-100 px-3 py-1 rounded items-center justify-between"
                >
                  <span className="mr-4"># {tag}</span>
                  <X
                    onClick={() => handleDeleteTag(index)}
                    size={18}
                    className="icon-btn hover:text-black"
                  />
                </div>
              );
            })}
          </div>
          <div className="flex gap-4">
            <input
              onChange={changeTag}
              placeholder="Add Tags"
              value={tag}
              className="border rounded p-2 text-sm"
            />

            <div
              onClick={handelAddTag}
              className="border text-primary icon-btn flex items-center rounded hover:text-white p-2 border-primary hover:bg-primary"
            >
              <Plus />
            </div>
          </div>
        </div>

        <button className="btn-primary" onClick={handelClick}>
          {statePost}
        </button>
      </div>
    </div>
  );
};

export default AddEditNotes;
