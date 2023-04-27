import React, { useState, useRef } from 'react'
import './main.css'
import { Container, TextField, Typography, InputAdornment, IconButton, Grid, Stack} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SignInSnackbar from '../../components/signInSnackbar/signInSnackbar';
//Internal Route
import {TrackData, AlbumData, PlaylistData, ArtistData} from "../../components/appScreens/index"
import { Route, Routes, useNavigate } from 'react-router';
import { GetData } from '../../components/fetch/GetData';

const Main = ()=>{
    const [inputSize, handleInputFocus]=useState(8);
    const inputRef=useRef();
    var [assetID,setID]=useState("");
    var [wrongInput, setWrongInput]=useState(false)
    const navigate = useNavigate();

    const handleGetData= async ()=>{
        const urlPattern = new RegExp('https://[A-Za-z]+.spotify.com/[A-Za-z]+/[A-Za-z0-9]+');
        var inputAssetLink=inputRef.current.value;
        if(inputAssetLink==="" || !urlPattern.test(inputAssetLink)){
            setWrongInput(true)
            return
        }
        else{
            assetID=(inputAssetLink.split("/")[4]).split("?")[0]
            var respuesta;
            setID(inputAssetLink)
            switch(inputAssetLink.split("/")[3]){
                case "album":
                    //Call getData --> Callback to setAppScreen("album")
                    respuesta= await GetData(assetID,"album")
                    navigate("/album",{state: respuesta})
                    console.log("Call album data and display album container")
                    break;
                case "playlist":
                    respuesta= await GetData(assetID,"playlist")
                    navigate("/playlist",{state: respuesta})
                    console.log("Call playlist data and display playlist container")
                    break;
                case "track":
                    respuesta= await GetData(assetID,"track")
                    navigate("/track",{state: respuesta})
                    console.log("Call track data and display track container")
                    //console.log(respuesta)
                    break;
                case "artist":
                    respuesta= await GetData(assetID,"artist")
                    navigate("/artist",{state: respuesta})
                    console.log("Call artist data and display artist container")
                    break;
                default:
                    setWrongInput(true)
                    break;
            }
            inputRef.current.value=""; //Clear input field
        }
        
    };
    //Display for main screen
    const MainScreen=()=>{
       return(
       <Stack 
            component="div"
            sx={{
                '& .MuiTextField-root': { width: '80%' },
                justifyContent:'center',
                alignItems:'center',
                display:'flex',
                width:'80%'
            }}
            noValidate
            autoComplete="off"
        >
            <Typography variant={'h3'} className='title'>Get music data</Typography>
            <Typography variant={'h5'} className='title'>from 90+ million tracks, album and playlists on Spotify.</Typography>
            <Grid container sx={{justifyContent:"center"}} component="div" noValidate  autoComplete="off">
                <Grid item xs={inputSize} sx={{
                    textAlign:"center",
                    }} onFocus={()=>{handleInputFocus(9); setWrongInput(false)}} onBlur={()=>handleInputFocus(6)}>
                    <TextField error={wrongInput} fullWidth id='assetLink' label="Spotify Album, Track, Playlist or Artist Link"  inputRef={inputRef}
                        InputProps={
                        {
                            endAdornment: (
                            <InputAdornment position="start">
                                <IconButton color='primary' aria-label="export data" component="label" onClick={handleGetData}>
                                    <SearchIcon/>
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                        variant="standard" onKeyDown={(e)=>e.key === 'Enter'?handleGetData():null}/>
                </Grid>
            </Grid>
            <SignInSnackbar/>
        </Stack>
        )
    }

    return (
    <Container component="main" sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }} 
        maxWidth={false} 
        className='main'>
        <Routes>
            <Route path="*" element={<MainScreen/>}/>
            <Route path="/track" element={<TrackData/>}/>
            <Route path="/playlist" element={<PlaylistData/>}/>
            <Route path="/artist" element={<ArtistData/>}/>
            <Route path="/album" element={<AlbumData/>}/>
        </Routes>
        
    </Container>
    ) 
}

export default Main