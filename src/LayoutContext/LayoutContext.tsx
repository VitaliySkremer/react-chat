import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {createContext, ReactNode, useState} from "react";


const app = initializeApp({
  apiKey: import.meta.env.VITE_KEY,
  authDomain: import.meta.env.VITE_DOMAIN,
  projectId: import.meta.env.VITE_OBJECT_ID,
  storageBucket: import.meta.env.VITE_ORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SENDER_ID,
  appId: import.meta.env.VITE_PID
});

export const Context = createContext<any>(null)

const auth = getAuth();
const firestore = getFirestore(app);
const urlHash = window.location.hash.split('#')[1] || null;


interface LayoutContextProps {
  children: ReactNode
}

export const LayoutContext = ({children}:LayoutContextProps) => {
  const [hash, setHash] = useState(urlHash)

  const newHash = (value: string) =>{
    setHash(value);
  }

  return (
    <Context.Provider value={{
      auth,
      firestore,
      hash,
      newHash
    }}>
      {children}
    </Context.Provider>
  )
}