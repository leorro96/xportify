import React from "react";
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";

const SignInSnackbar =()=>{
    const [open, setOpen] = React.useState(true);
    //Alert sign in
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    //Sign In Spotify
    const signIn=()=>{
        return
    }
    //Show alert
    const action = (
        <React.Fragment>
          <IconButton color="primary" size="small" onClick={signIn}><LoginIcon/>
          </IconButton>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    return(
        <Snackbar 
                open={open}
                autoHideDuration={null}
                onClose={handleClose}
                message="Download your Spotify playlists"
                action={action}>
            </Snackbar>
    )
}

export default SignInSnackbar