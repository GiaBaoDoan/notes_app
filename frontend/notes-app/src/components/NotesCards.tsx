import { Edit, Pin, Trash } from "lucide-react";
import React from "react";
import { formatDate } from "../untils/helpers";

interface PropType {
  id: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  onDelete: (id: string) => void;
  onPin: (id: string) => void;
  onToogle: () => void;
}

const NotesCards: React.FC<PropType> = ({
  id: noteId,
  title,
  date,
  content,
  tags,
  isPinned,
  onDelete,
  onPin,
  onToogle,
}) => {
  return (
    <div className="border bg-white p-3 rounded hover:drop-shadow cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h6 className="font-medium">{title}</h6>
          <p className="text-sm text-slate-600 mt-1">{formatDate(date)}</p>
        </div>
        <Pin
          onClick={() => onPin(noteId)}
          size={16}
          className={`icon-btn shrink-0 ${isPinned ? "text-primary" : ""}`}
        />
      </div>
      <div className="flex justify-between items-end mt-2">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-slate-700">{content.slice(0, 100)}</p>
          <div>
            {tags?.map((tag) => {
              return <span className="text-xs text-slate-500">#{tag}</span>;
            })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Trash
            onClick={() => onDelete(noteId)}
            size={16}
            className="hover:text-red-500  icon-btn"
          />
          <Edit
            onClick={() => onToogle()}
            size={16}
            className="hover:text-green-500 icon-btn"
          />
        </div>
      </div>
    </div>
  );
};

export default NotesCards;
