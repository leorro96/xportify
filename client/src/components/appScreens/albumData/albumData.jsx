import { Box, Grid, Stack, TableBody, TableContainer, TableRow, Typography, TableCell, Paper, Table, TableHead} from "@mui/material"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"
import DownloadCSVButton from "../../downloadCSV/downloadCSV";
import { GetData } from "../../fetch/GetData";

const AlbumData=()=>{
    
    const data= useLocation()["state"]
    const [tracks, setTracks]= useState([])

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
    //Duration
    const changeTime=(ms)=>{
        let seconds = ms / 1000;
        const hours = parseInt(seconds / 3600); 
        seconds = seconds % 3600; 
        const minutes = parseInt(seconds / 60); 
        seconds = Math.round(seconds % 60);
        return `${hours<10?"0"+hours:hours}:${minutes<10?"0"+minutes:minutes}:${seconds<10?"0"+seconds:seconds}`
    }
    useEffect(()=>{
        async function fetchData(){
            await data["tracks"]["items"].map((track)=>{
                GetData(track["id"],"track", (respuesta)=> {
                    respuesta["album"]["name"]=data["name"]
                    respuesta["album"]["label"]=data["label"]
                    respuesta["album"]["type"]=data["type"].charAt(0).toUpperCase()+data["type"].slice(1)
                    respuesta["album"]["upc"]=data["external_ids"]["upc"]
                    respuesta["album"]["copyright"]=data["copyrights"].map((line)=>line["type"]+":"+line["text"]).join("|")
                    respuesta["duration_hhmmss"]=changeTime(parseInt(respuesta["duration_ms"]))
                    setTracks(tracks => [...tracks, respuesta].sort((a,b)=>{
                        return a["track_number"]-b["track_number"]
                    }))
                })
                return track
            })
        }
        fetchData()
    },[])
    const Track= (props)=>{
        
        if (!props.trackData) return (
            <TableRow  key={"loading"} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right">{"loading"}</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{}</TableCell>
            </TableRow>
        )
        else{
            return (
                <TableRow  key={props.trackData["name"]} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="left">{props.trackData["name"]}</TableCell>
                    <TableCell align="left">{props.trackData["artists"].map((artist)=>artist["name"]).join(", ")}</TableCell>
                    <TableCell align="left">{props.trackData["duration_hhmmss"]}</TableCell>
                    <TableCell align="left">{props.trackData["track_number"]}</TableCell>
                    <TableCell align="left">{props.trackData["external_ids"]["isrc"]}</TableCell>
                </TableRow>            
            )
        }
    }
    return (
        <Stack direction={"column"}>
            <Grid container direction={{xs:"column", md:"row"}}>
                <Grid item justifyContent="center" alignItems="center"  display="flex">
                    <a href={data["external_urls"]["spotify"]} target="_blank" rel="noreferrer"><Box component="img" display="flex" sx={{maxHeight:400, maxWidth:400,heigh:"auto", width:"100%"}} src={data["images"][0]["url"]} alt={data["name"]} /></a>
                </Grid>
                <Grid item display="flex" justifyContent={{xs:"center", md:"start"}} alignItems="center">
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
                        <Typography variant={"h6"} component={"p"}>Type: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["type"].charAt(0).toUpperCase()+data["type"].slice(1)}</Typography></Typography>
                        <Typography variant={"h6"} component={"p"}>Artists: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["artists"].map((artist)=>artist["name"]).join(", ")}</Typography></Typography>
                        <Typography variant={"h6"} component={"p"}>Release date: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["release_date"]}</Typography></Typography>
                        <Typography variant={"h6"} component={"p"}>UPC: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["external_ids"]["upc"]}</Typography></Typography>
                        <Typography variant={"h6"} component={"p"}>Total tracks: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["total_tracks"]}</Typography></Typography>
                        <Typography variant={"h6"} component={"p"}>Label: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["label"]}</Typography></Typography>
                        <Typography variant={"h6"} component={"p"}>Available Markets: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{avMarkets.filter((market)=> !data["available_markets"].includes(market)).length===0?"Worldwide":"Worldwide - "+avMarkets.filter((market)=> !data["available_markets"].includes(market)).join(",")}</Typography></Typography>
                        <Typography variant={"h6"} component={"p"}>© <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["copyrights"].map((line)=>line["type"]==="P"?line["text"]:"")}</Typography></Typography>
                        <Typography variant={"h6"} component={"p"}>℗ <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["copyrights"].map((line)=>line["type"]==="C"?line["text"]:"")}</Typography></Typography>
                        <DownloadCSVButton jsonData={tracks} type="album" />
                    </Stack>                                                    
                </Grid>
            </Grid>   
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Album track">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Title</TableCell>
                        <TableCell align="left">Artists</TableCell>
                        <TableCell align="left">Duration</TableCell>
                        <TableCell align="left">Track Number</TableCell>
                        <TableCell align="left">ISRC</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tracks.map((track,index)=><Track key={track["name"]+"_"+index} trackData={track}/>)}
                </TableBody>
                </Table>
            </TableContainer>
        </Stack>
        
    )
}

export default AlbumData