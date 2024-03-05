"use client";

import { AuthProvider } from "@/context/AuthContext";
import { NoteProvider } from "@/context/NoteContext";
import { Provider } from "react-redux";
import store from "@/redux/store";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NoteProvider>{children}</NoteProvider>
      </AuthProvider>
    </Provider>
  );
}
