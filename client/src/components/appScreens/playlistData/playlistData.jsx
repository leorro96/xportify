
import { Box, Grid, Stack, TableBody, TableContainer, TableRow, TablePagination, Typography, TableCell, Paper, Table, TableHead} from "@mui/material"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"
import DownloadCSVButton from "../../downloadCSV/downloadCSV";
import { GetData } from "../../fetch/GetData";

const PlaylistData=()=>{
    
    const data= useLocation()["state"]
    const [tracks, setTracks]= useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

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
            var respuesta=await GetData(data["id"],"playlist/items")        
            respuesta.map((track)=>{
                track["playlist"]={
                    "name":data["name"],
                    "owner":data["owner"]["display_name"]
                }
                track["duration_hhmmss"]=changeTime(parseInt(track["duration_ms"]))
                return track
            })
            setTracks(respuesta)
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
    //Page navigation
    const handleChangePage=(event, newPage)=>{
        setPage(newPage);
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //console.log(data)
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
                        <Typography variant={"h6"} component={"p"}>Name: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["name"]}</Typography></Typography>
                        <Typography variant={"h6"} component={"p"}>Owner: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["owner"]["display_name"]}</Typography></Typography>
                        <Typography variant={"h6"} component={"p"}>Description: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["description"]}</Typography></Typography>
                        <Typography variant={"h6"} component={"p"}>Collaborative: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["collaborative"]?"Yes":"No"}</Typography></Typography>
                        <Typography variant={"h6"} component={"p"}>Total Tracks: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["tracks"]["total"]}</Typography></Typography>                       
                        <Typography variant={"h6"} component={"p"}>Followers: <Typography component="span" variant={"h7"} sx={{ fontWeight: 'regular' }}>{data["followers"]["total"]}</Typography></Typography>

                        <DownloadCSVButton jsonData={tracks} type="playlist" />
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
                    {tracks.length > 0 ? tracks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((track,index)=><Track key={track["name"]+"_"+index} trackData={track}/>): tracks.map((track,index)=><Track key={track["name"]+"_"+index} trackData={track}/>)}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[15,25,50]}
                labelRowsPerPage={"Tracks per page"}
                component="div"
                count={tracks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
        </Stack>
        
    )
}

export default PlaylistData