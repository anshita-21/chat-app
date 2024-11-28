import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBuIIpNv8CZ_fCKPFv6fVzPLBmArJT4XJs",
  authDomain: "chat-app-118c7.firebaseapp.com",
  projectId: "chat-app-118c7",
  storageBucket: "chat-app-118c7.firebasestorage.app",
  messagingSenderId: "121899556098",
  appId: "1:121899556098:web:9bb164c0ceab894755361b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//initialize db
const db = getFirestore(app);

const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"hey using chatapp",
            lastSeen: Date.now()
        })
        await setDoc(doc(db, "chats", user.uid), {
            chatData:[]
        })
    } catch (error) {
        console.error(error)
        toast.error(error.code)
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password); 
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async () => {
    try{
        await signOut(auth)
    }
    catch(error){
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

export {signup, login, logout, auth, db}