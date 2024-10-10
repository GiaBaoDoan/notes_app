import { Plus } from "lucide-react";
import {
  AddEditNotes,
  NotesCards,
  Modal,
  EmptyListNotes,
} from "../../components";
import { useToogle } from "../../hook";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { DataInput } from "../..";
import { Note } from "../../slice/notes.slice";
import { useSearchParams } from "react-router-dom";
import {
  deleteNote,
  getNotes,
  pinNote,
  postNote,
  updateNote,
  userThunk,
} from "../../thunk";

const Home = () => {
  const [toogle, onToogle] = useToogle();
  const [note, setNote] = useState<Note | null>();
  const [statePost, setStatePost] = useState<string>("Add");
  const [searchParams] = useSearchParams();
  const url = searchParams.get("query");
  const { notes, isLoading } = useSelector(
    (state: RootState) => state.notesReducer
  );
  const dispatch = useDispatch<AppDispatch>();

  // post note
  const handelPostNote = (data: DataInput) => {
    dispatch(postNote(data)).then(onToogle);
  };

  // update note
  const handelUpdate = (data: DataInput, id: string) => {
    dispatch(updateNote({ note: data, id })).then(onToogle);
  };

  // delete note
  const handelDeleteNote = (id: string) => dispatch(deleteNote(id));

  // pin note
  const handelPinNote = (id: string) => dispatch(pinNote(id));

  const handelType = (data: { type: string; note?: Note }) => {
    const { type, note } = data;
    setStatePost(type);
    note ? setNote(note) : setNote(null);
    onToogle();
  };

  useEffect(() => {
    dispatch(userThunk());
    dispatch(getNotes(url || ""));
  }, [url]);
  return (
    <div>
      <div className="container pb-10 grid-cols-4 grid gap-5 mt-5">
        {notes?.map((note) => {
          return (
            <NotesCards
              key={note._id}
              id={note?._id}
              title={note?.title}
              content={note?.content}
              tags={note?.tags}
              isPinned={note?.isPinned}
              date={note?.createdAt}
              onPin={handelPinNote}
              onDelete={handelDeleteNote}
              onToogle={() => handelType({ type: "Update", note })}
            />
          );
        })}
        {(toogle || isLoading) && <Modal />}
        {!toogle && (
          <div
            onClick={() => handelType({ type: "Add" })}
            className="fixed bottom-10 right-10 bg-primary p-4 rounded-lg cursor-pointer hover:opacity-50"
          >
            <Plus size={28} className="text-white font-bold icon-btn" />
          </div>
        )}
        {toogle && (
          <AddEditNotes
            note={note as Note}
            statePost={statePost}
            onClose={onToogle}
            onPost={handelPostNote}
            onUpdate={handelUpdate}
          />
        )}
      </div>
      {!isLoading && !notes.length && (
        <EmptyListNotes
          content={
            url
              ? "Opps got no results with your searching !!"
              : `Start creating your first note!. Click the add button to jot down yours thoughts,ideas and reminders. Let's get started`
          }
        />
      )}
    </div>
  );
};

export default Home;
