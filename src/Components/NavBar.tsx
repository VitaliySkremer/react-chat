import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useContext} from "react";
import {Context} from "../main";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const NavBar = () => {
  const {auth} = useContext(Context)

  const login = async () =>{
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const {user} = await signInWithPopup(auth,provider);
    console.log(user)
  }

  const user = false;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Общий чат
          </Typography>
          {user
            ?<Button color="inherit">выйти</Button>
            :<Button onClick={login} color="inherit">авторизоваться</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};