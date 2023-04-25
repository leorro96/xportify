import DownloadIcon from '@mui/icons-material/Download';
import { Button } from '@mui/material';

const DownloadCSVButton=(props)=>{
    let csv
    let jsonData
    let headers
    let values
    let filename
    switch(props.type){
        case "track":
            if(props.jsonData){
                jsonData = props.jsonData
                filename=jsonData["name"]
                headers=["name","album","artists","track_number","album_tracks", "disc_number","duration","ISRC","release_date","label","explicit","available_markets","url","preview_url", "spotify_id","image_url"]
                values=[jsonData["name"],jsonData["album"]["name"],jsonData["artists"].map((artist)=>artist["name"]).join("|"),jsonData["track_number"],jsonData["album"]["total_tracks"], jsonData["disc_number"],jsonData["duration_hhmmss"],jsonData["external_ids"]["isrc"],jsonData["album"]["release_date"],jsonData["album"]["label"],jsonData["explicit"],jsonData["available_markets"].join("|"),jsonData["external_urls"]["spotify"],jsonData["preview_url"],jsonData["id"],jsonData["album"]["images"][0]["url"]]
                csv=headers+'\r\n'+values
            }
            //console.log(headers+'\r\n'+values)
            break;
        case "playlist":
            if(!!props.jsonData.length){
                jsonData = props.jsonData
                filename=jsonData[0]["playlist"]["name"]
                headers=["name","album","artists","track_number","album_tracks","duration","ISRC","release_date","explicit","available_markets","url","preview_url", "spotify_id","image_url","playlist_name","playlist_owner"]
                values=[]
                jsonData.map((track)=>values.push([track["name"],track["album"]["name"],track["artists"].map((artist)=>artist["name"]).join("|"),track["track_number"],track["album"]["total_tracks"],track["duration_hhmmss"],track["external_ids"]["isrc"],track["album"]["release_date"],track["explicit"],track["available_markets"].join("|"),track["external_urls"]["spotify"],track["preview_url"],track["id"],track["album"]["images"][0]["url"],track["playlist"]["name"],track["playlist"]["owner"]]))
                csv=headers+'\r\n'+values.join('\r\n')
            }
            break;
        case "album":
            if(!!props.jsonData.length){
                jsonData = props.jsonData
                filename=jsonData[0]["album"]["name"]
                headers=["name","album","artists","track_number","album_tracks", "disc_number","duration","ISRC","album_upc","release_date","album_type","label","copyright","explicit","available_markets","url","preview_url", "spotify_id","image_url"]
                values=[]
                jsonData.map((track)=> values.push([track["name"],track["album"]["name"],track["artists"].map((artist)=>artist["name"]).join("|"),track["track_number"],track["album"]["total_tracks"], track["disc_number"],track["duration_hhmmss"],track["external_ids"]["isrc"],track["album"]["upc"],track["album"]["release_date"],track["album"]["type"],track["album"]["label"],track["album"]["copyright"],track["explicit"],track["available_markets"].join("|"),track["external_urls"]["spotify"],track["preview_url"],track["id"],track["album"]["images"][0]["url"]]))
                csv=headers+'\r\n'+values.join('\r\n')
            }
            break;
        case "artist":
            break;
        default:
            break;
    }

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const HandleClick=()=>{
        if(csv!=null){
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, filename+".csv");
            } else {
                var link = document.createElement("a");
                if (link.download !== undefined) { // feature detection
                    // Browsers that support HTML5 download attribute
                    var url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", filename+".csv");
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        }
    }

    return (<Button variant="text" startIcon={<DownloadIcon/>} onClick={HandleClick}>Download as CSV</Button>)
}

export default DownloadCSVButton