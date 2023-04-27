import { Box, Grid, IconButton, Stack, Typography } from "@mui/material"
import React, { useRef, useState, useEffect } from "react"
import { useLocation } from "react-router"
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PauseIcon from '@mui/icons-material/Pause';
import DownloadCSVButton from "../../downloadCSV/downloadCSV";
import { GetData } from "../../fetch/GetData";

const TrackData=()=>{
    const data= useLocation()["state"]
    const [iconDisplay, setIconDisplay]=useState(<VolumeUpIcon/>)
    const [playing, setPlaying]=useState(false)

    //Markets
    const avMarkets=["AR","AU","AT","BE","BO","BR","BG","CA","CL","CO","CR","CY","CZ","DK","DO",
        "DE","EC","EE","SV","FI","FR","GR","GT","HN","HK","HU","IS","IE","IT","LV","LT","LU",
        "MY","MT","MX","NL","NZ","NI","NO","PA","PY","PE","PH","PL","PT","SG","SK","ES","SE",
        "CH","TW","TR","UY","US","GB","AD","LI","MC","ID","JP","TH","VN","RO","IL","ZA","SA",
        "AE","BH","QA","OM","KW","EG","MA","DZ","TN","LB","JO","PS","IN","BY","KZ","MD","UA",
        "AL","BA","HR","ME","MK","RS","SI","KR","BD","PK","LK","GH","KE","NG","TZ","UG","AG",
        "AM","BS","BB","BZ","BT","BW","BF","CV","CW","DM","FJ","GM","GE","GD","GW","GY","HT",
        "JM","KI","LS","LR","MW","MV","ML","MH","FM","NA","NR","NE","PW","PG","WS","SM","ST",
        "SN","SC","SL","SB","KN","LC","VC","SR","TL","TO","TT","TV","VU","AZ","BN","BI","KH",
        "CM","TD","KM","GQ","SZ","GA","GN","KG","LA","MO","MR","MN","NP","RW","TG","UZ","ZW",
        "BJ","MG","MU","MZ","AO","CI","DJ","ZM","CD","CG","IQ","LY","TJ","VE","ET","XK"]
    //Audio
    var audioRef= useRef(new Audio(typeof data["preview_url"] != "undefined"&& data["preview_url"]!==""?data["preview_url"]:null));  
    //Duration
    const changeTime=(ms)=>{
        let seconds = ms / 1000;
        const hours = parseInt(seconds / 3600); 
        seconds = seconds % 3600; 
        const minutes = parseInt(seconds / 60); 
        seconds = Math.round(seconds % 60);
        return `${hours<10?"0"+hours:hours}:${minutes<10?"0"+minutes:minutes}:${seconds<10?"0"+seconds:seconds}`
    }
    data["duration_hhmmss"]=changeTime(parseInt(data["duration_ms"]))
    //Handle audioplay
    const play = () => {
        setPlaying(true);
        audioRef.current.play();
        setIconDisplay(<PauseIcon/>)
    };
    const pause = () => {
        setPlaying(false);
        audioRef.current.pause();
        setIconDisplay(<VolumeUpIcon/>)
      };
    //Get album data
    useEffect(()=>{
        async function fetchData(){
            var respuesta=await GetData(data["album"]["id"],"album")
            data["album"]["label"]=respuesta["label"]

        }
        fetchData()
    },[])
    
    return (
        <Grid container direction={{xs:"column", md:"row"}}>
            <Grid item={true} justifyContent="center" alignItems="center" xs={4} display="flex">
                <a href={data["album"]["external_urls"]["spotify"]} target="_blank" rel="noreferrer"><Box component="img" display="flex" sx={{maxHeight:400, maxWidth:400,heigh:"auto", width:"100%"}} src={data["album"]["images"][0]["url"]} alt={data["album"]["name"]} /></a>
            </Grid>
            <Grid item={true} display="flex" justifyContent={{xs:"center", md:"start"}} alignItems="center" xs={8}>
                <Stack 
                component="div"
                sx={{
                    '& .MuiTextField-root': { width: '80%' },
                    justifyContent:'center',
                    alignItems:'start',
                    display:'flex',
                    width:'80%',
                }}
                paddingLeft={{xs:0,md:'3rem'}}               
                noValidate
                autoComplete="off"
                >
                    <Typography variant={"h6"} component={"p"}>Titel: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["name"]}</Typography></Typography>
                    <Typography variant={"h6"} component={"p"}>Artists: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["artists"].map((artist)=>artist["name"]).join(", ")}</Typography></Typography>
                    <Typography variant={"h6"} component={"p"}>Album: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["album"]["name"]}</Typography></Typography>
                    <Typography variant={"h6"} component={"p"}>Release Date: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["album"]["release_date"]}</Typography></Typography>
                    <Typography variant={"h6"} component={"p"}>Duration: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["duration_hhmmss"]}</Typography></Typography>
                    <Typography variant={"h6"} component={"p"}>ISRC: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["external_ids"]["isrc"]}</Typography></Typography>
                    <Typography variant={"h6"} component={"p"}>Track Number: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["track_number"]}/{data["album"]["total_tracks"]}</Typography></Typography>
                    <Typography variant={"h6"} component={"p"}>Label: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["album"]["label"]}</Typography></Typography>
                    <Typography variant={"h6"} component={"p"}>Available Markets: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{avMarkets.filter((market)=> !data["available_markets"].includes(market)).length===0?"Worldwide":"Worldwide - "+avMarkets.filter((market)=> !data["available_markets"].includes(market)).join(",")}</Typography></Typography>
                    <Typography sx={typeof data["preview_url"] != "undefined"&& data["preview_url"]!==""?{}:{display:'hidden'}} component={"h2"}>Preview: <IconButton onClick={playing?pause:play} color="primary">{iconDisplay}</IconButton></Typography>
                    <DownloadCSVButton jsonData={data} type="track" />
                </Stack>                                                    
            </Grid>
        </Grid>
    )
}

export default TrackData