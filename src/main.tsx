import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Context.Provider value={{
      auth,
      firestore
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
)
