"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Note from "@/components/Note";
import { useAuth } from "@/context/AuthContext";
import { useNote } from "@/context/NoteContext";
import { useRouter } from "next/navigation";
import HomeLoading from "./loading";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const { currentUser, loading } = useAuth();
  const { addNote } = useNote();
  const [note, setNote] = useState("");
  const [noteErr, setNoteErr] = useState("");
  const notes = useSelector((state) => state.store.notes);

  if (!currentUser) {
    return router.push("/");
  }

  // handle click 'Enter'
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Prevent the default form submission behavior
      e.preventDefault();
      // Call a function to handle form submission
      submitHandler(e);
    }
  };

  // add note
  const submitHandler = async (e) => {
    e.preventDefault();
    if (note.trim() !== "") {
      try {
        setNoteErr("");
        await addNote({
          userId: currentUser.uid,
          note: note.trim(),
          date: new Date().toLocaleString(),
        });
        toast.success("Note created successfully!");
        setNote("");
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      setNoteErr("Type something to create");
    }
  };

  // handle note input
  const handleInputChange = (e) => {
    setNote(e.target.value);
    if (e.target.value.trim() === "") {
      return setNoteErr("Type something to create");
    }
    setNoteErr("");
  };

  return (
    <div className="flex min-h-screen flex-col items-center pt-24 pb-10 px-[1rem] sm:px-[3rem]">
      <h1 className="text-2xl font-header underline mt-9">Notes</h1>
      <form
        onSubmit={submitHandler}
        className="w-full sm:w-1/2 mt-6 mb-10 flex flex-col gap-2 items-center"
      >
        {noteErr && (
          <small className="text-red-600 p-2 w-full border border-red-600 text-center">
            {noteErr}
          </small>
        )}
        <textarea
          rows="2"
          type="text"
          className="w-full border border-gray-600 outline-none rounded-lg p-3"
          onKeyPress={handleKeyPress}
          placeholder="Take a note..."
          value={note}
          onChange={handleInputChange}
          autoFocus
        />
        <button
          type="submit"
          className="bg-sky-600 hover:bg-sky-800 transition-all duration-500 text-white p-2 w-full rounded-lg outline-none uppercase tracking-widest"
        >
          Add Note
        </button>
      </form>

      {loading ? (
        <HomeLoading />
      ) : (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full auto-rows-min	">
          {notes.length > 0 &&
            notes.map((note) => <Note data={note} key={note.id} />)}
        </div>
      )}
    </div>
  );
}
