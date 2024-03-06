"use client";
import { createContext, useState, useEffect, useContext, useRef } from "react";
import { db } from "@/config/firebase";
import {
  doc,
  setDoc,
  updateDoc,
  getDocs,
  getDoc,
  deleteDoc,
  collection,
  where,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { useAuth } from "@/context/AuthContext";
import { useDispatch } from "react-redux";
import { setItems, deleteItem, addItem, updateItem } from "@/redux/storeSlice";

export const NoteContext = createContext();

export const useNote = () => {
  return useContext(NoteContext);
};

export const NoteProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [allNotes, setAllNotes] = useState([]);
  const { currentUser } = useAuth();

  // create note
  const addNote = async (data) => {
    const itemId = uuid();
    await setDoc(doc(db, "notes", itemId), {
      data,
    });
    dispatch(addItem({ id: itemId, ...data }));
  };

  // get note data
  const getNote = async (id) => {
    const data = await getDoc(doc(db, "notes", id));
    return data.data().data;
  };

  // update note
  const updateNote = async (data) => {
    await updateDoc(doc(db, "notes", data.id), {
      data: { note: data.note },
    });
    dispatch(updateItem(data));
  };

  // delete note
  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    dispatch(deleteItem(id));
  };

  // get all notes of the current user
  const getUserNotes = async () => {
    console.log(currentUser?.uid, "currentUser.uid");
    const querySnapshot = await getDocs(
      collection(db, "notes"),
      where("data.userId", "==", currentUser?.uid)
    );
    let data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data().data };
    });
    console.log(data, "data");
    data = data.filter((item) => item.userId === currentUser?.uid);
    console.log(data, "data2");
    setAllNotes(data)
    dispatch(setItems(data));
  };

  useEffect(() => {
    try {
      getUserNotes();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const value = { addNote, updateNote, deleteNote, loading, getNote,allNotes };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
