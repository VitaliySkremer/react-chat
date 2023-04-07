import {FormEvent, useContext, useEffect, useRef, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {IconButton, InputBase} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { collection, addDoc, query, orderBy, serverTimestamp  } from "firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import {Message} from "./Message";
import { Context } from "../LayoutContext/LayoutContext";

export const Chat = () => {
  const {auth,firestore, hash} = useContext(Context)
  const [user] = useAuthState(auth);
  const [messages, loading,error] = useCollection(
    query(collection(firestore, hash || 'messages'), orderBy('createdAt')),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const ref = useRef<HTMLDivElement>(null)

  const [text, setText] = useState('');
  const [loadingMessage, setLoadingMessage] = useState(false)

  const sendMessage = async (event: FormEvent) =>{
    event.preventDefault();
    if(loadingMessage || !text) return;
    try {
      setLoadingMessage(true);
      const test = await addDoc(collection(firestore,hash || 'messages'),{
        uid:user?.uid,
        displayName: user?.displayName,
        photo: user?.photoURL,
        text,
        createdAt:serverTimestamp()
      })
    }
    catch (e){
    }
    finally {
      setLoadingMessage(false)
    }
    setText('')
  }

  useEffect(()=>{
    if(ref.current){
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  },[messages])

  if(loading){
    return (
      <div style={{ position: 'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)' }}>
        <CircularProgress size={100}/>
      </div>
    )
  }

  return (
    <div className="chat__wrapper">
      <div ref={ref} className="chat__wrapper-container">
        {messages && messages.docs.map((doc) => (
            <Message key={doc.id} isYour={doc.data().uid === user?.uid} photo={doc.data().photo} name={doc.data().displayName} text={doc.data().text}/>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chat__wrapper-settings">
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Ваше сообщение..."
          inputProps={{ 'aria-label': 'search google maps' }}
          value={text}
          onChange={e=> setText(e.target.value)}
        />
        <IconButton onClick={sendMessage} disabled={loadingMessage} type="button" color={'primary'} sx={{ p: '10px' }} aria-label="search">
          <SendIcon />
        </IconButton>
      </form>
    </div>
  )
}