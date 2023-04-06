import {NavBar} from "./Components/NavBar";
import {useContext} from "react";
import {Context} from "./main";
import {useAuthState} from "react-firebase-hooks/auth";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import {Chat} from "./Components/Chat";

function App() {

  const {auth} = useContext(Context)
  const [user, loading, error] = useAuthState(auth);

  return (
    <div>
      {loading
        ?<div style={{ position: 'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)' }}>
          <CircularProgress size={100}/>
        </div>
        :<>
          <NavBar/>
          {user ? <Chat/> : <div>Авторизуйтесь</div>}
        </>
      }
    </div>
  )
}

export default App
