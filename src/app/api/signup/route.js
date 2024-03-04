import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, getDoc, doc } from "firebase/firestore";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  try {
    const user = await request.json();
    let { email, password } = user;

    // hash password
    const salt = await bcryptjs.genSalt(10);
    password = await bcryptjs.hash(password, salt);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = userCredential.user.uid;

    const data = {
      fullName: user.fullName,
      email,
      accessToken: userCredential.user.accessToken,
    };
    await setDoc(doc(db, "users", uid), { user });

    return Response.json(
      { message: "User created successfully", success: true, data },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
