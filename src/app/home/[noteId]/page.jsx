"use client";
import { useCallback, useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";
import { FaRegSave } from "react-icons/fa";
import { useNote } from "@/context/NoteContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

const Modal = ({ params }) => {
  const { deleteNote, updateNote, getNote } = useNote();
  const { currentUser } = useAuth();
  const [isEditable, setIsEditable] = useState(false);
  const [note, setNote] = useState("");
  const router = useRouter();
  const overlay = useRef(null);
  const wrapper = useRef(null);

  const getNoteData = async () => {
    try {
      const data = await getNote(params.noteId);
      setNote(data.note);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getNoteData();
  }, []);

  const onDismiss = useCallback(() => {
    router.back();
    setIsEditable(false);
  }, [router]);

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const handleDelete = async () => {
    try {
      await deleteNote(params.noteId);
      toast.success("Note deleted successfully!");
      router.back();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpdate = async () => {
    if (note.trim() !== "") {
      try {
        await updateNote({ id: params.noteId, note });
        toast.success("Note successfully updated!");
        setIsEditable(false);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  if (!currentUser) return router.push("/");
  return (
    <div
      ref={overlay}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60 p-10"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12 md:w-8/12 lg:w-2/5 p-6"
      >
        <div className="bg-slate-50 border rounded-lg border-gray-400 shadow-xl p-4 sm:aspect-square flex flex-col gap-3 justify-between">
          {isEditable ? (
            <textarea
              className="text-gray-700 outline-none border border-gray-600 p-2 rounded h-full bg-slate-50"
              value={note}
              onChange={handleChange}
            />
          ) : (
            <p
              onClick={() => setIsEditable(true)}
              className="text-gray-700 h-full border border-gray-600 p-2 rounded"
            >
              {note}
            </p>
          )}
          <div className="flex justify-end items-center gap-3">
            {isEditable ? (
              <FaRegSave
                onClick={handleUpdate}
                className={`cursor-pointer text-[1.7rem] ${
                  note ? "text-green-700" : "text-grey-600"
                }`}
              />
            ) : (
              <FaRegEdit
                onClick={() => setIsEditable(true)}
                className="cursor-pointer text-[1.7rem]"
              />
            )}
            <IoTrashBinOutline
              onClick={handleDelete}
              className="cursor-pointer text-red-600 text-[1.7rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
