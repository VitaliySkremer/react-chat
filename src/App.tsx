import {NavBar} from "./Components/NavBar";
import {useContext} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import {Chat} from "./Components/Chat";
import Typography from "@mui/material/Typography";
import { Context } from "./LayoutContext/LayoutContext";

function App() {

  const {auth} = useContext(Context)
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="app">
      {loading
        ?<div style={{ position: 'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)' }}>
          <CircularProgress size={100}/>
        </div>
        :<>
          <NavBar/>
          {user ? <Chat/> : <Typography style={{ position: 'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}} variant="h6">Авторизуйтесь</Typography>}
        </>
      }
    </div>
  )
}

export default App
