"use client";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";
import { useNote } from "@/context/NoteContext";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Note = ({ data }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [note, setNote] = useState(data.note);
  const { deleteNote, updateNote } = useNote();
  const router = useRouter();

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleDelete = async () => {
    try {
      await deleteNote(data.id);
      toast.success("Note deleted successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpdate = async () => {
    if (note.trim() !== "") {
      try {
        await updateNote({ id: data.id, note });
        toast.success("Note successfully updated!");
        setIsEditable(false);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="cursor-pointer w-full h-[15rem] bg-slate-50 hover:bg-sky-100 transition-colors duration-300 border rounded-lg border-gray-400 shadow-xl p-4 flex flex-col gap-3 justify-between">
      {isEditable ? (
        <textarea
          className={"text-gray-700 outline-none h-full bg-sky-100"}
          value={note}
          onChange={handleChange}
        />
      ) : (
        <Link href={`/home/${data.id}`}>
          <p
            onClick={() => router.push(`/home/${data.id}`)}
            className="h-[10rem] text-ellipsis overflow-hidden text-gray-700"
          >
            {note}
          </p>
        </Link>
      )}
      <div className="relative flex justify-end items-center gap-3">
        {isEditable ? (
          <FaRegSave
            onClick={handleUpdate}
            className={`cursor-pointer text-[1.7rem] absolute right-[4rem] bottom-[0.3rem] z-20 ${
              note ? "text-green-700" : "text-grey-600"
            }`}
          />
        ) : (
          <FaRegEdit
            onClick={() => setIsEditable(true)}
            className="cursor-pointer text-[1.7rem] absolute right-[4rem] bottom-[0.3rem] z-20"
          />
        )}
        <IoTrashBinOutline
          onClick={handleDelete}
          className="cursor-pointer text-red-600 text-[1.7rem] absolute right-[1rem] z-20 bottom-[0.3rem]"
        />
      </div>
    </div>
  );
};

export default Note;
