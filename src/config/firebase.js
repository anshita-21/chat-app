import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, setDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
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
            chatsData:[]
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

const resetPass = async (email) => {
    if(!email){
        toast.error("enter your email");
        return null;
    }
    try{
        const userRef = collection(db ,'users');
        const q = query(userRef, where("email", "==", email))
        const querySnap = await getDocs(q);
        if(!querySnap.empty){
            await sendPasswordResetEmail(auth, email);
            toast.success("reset password link sent to your email");
        }
        else{
            toast.error("email not found");
        }
    }catch(error){
        console.error(error);
        toast.error(error.message);
    }
}

export {signup, login, logout, auth, db, resetPass}