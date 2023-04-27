//Rest API Spotify
const request = require('request');

class spotifyAPIcontroller {
    constructor(){
        this.client_id = '';
        this.client_secret = ''; 
        this.redirect_uri = 'http://localhost:3000/callback'; 
        this.authorizeApp((authToken)=>{
            this.authToken = authToken;
            //console.log(this.authToken)
        });
    }
    //Spotify API Methods
    //TRACK
    getTrackData(trackID,respuesta){
        const options = {
            url: `https://api.spotify.com/v1/tracks/${trackID}`,
            headers: {
                'Authorization': 'Bearer ' + this.authToken
            },
        };
        request.get(options, (err, res, body) => {
            if (err) { return console.log("Ha habido un error en el request: "+err); }
            const response=JSON.parse(body);
            //console.log("Respuesta de Spotify Track: "+JSON.stringify(response));
            respuesta(response);
        });
    }
    //ALBUM
    getAlbumData(albumID,respuesta){
        const options = {
            url: `https://api.spotify.com/v1/albums/${albumID}`,
            headers: {
                'Authorization': 'Bearer ' + this.authToken
            },
        };
        request.get(options, (err, res, body) => {
            if (err) { return console.log("Ha habido un error en el request: "+err); }
            const response=JSON.parse(body);
            //console.log("Respuesta de Spotify Track: "+JSON.stringify(response));
            respuesta(response);
        });
    }
    //PLAYLIST
    getPlaylistData(playlistID,respuesta){
        const options = {
            url: `https://api.spotify.com/v1/playlists/${playlistID}`,
            headers: {
                'Authorization': 'Bearer ' + this.authToken
            },
        };
        request.get(options, (err, res, body) => {
            if (err) { return console.log("Ha habido un error en el request: "+err); }
            const response=JSON.parse(body);
            //console.log("Respuesta de Spotify Track: "+JSON.stringify(response));
            respuesta(response);
        });
    }
    //PLAYLIST
    getPlaylistItems(playlistID,offset, respuesta){
        const options = {
            url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks?limit=50&offset=${offset}`,
            headers: {
                'Authorization': 'Bearer ' + this.authToken
            },
        };
        request.get(options, (err, res, body) => {
            if (err) { return console.log("Ha habido un error en el request: "+err); }
            const response=JSON.parse(body);
            //console.log("Respuesta de Spotify Track: "+JSON.stringify(response));
            respuesta(response);
        });
    }
    //Authorize app
    authorizeApp(respuesta){
        const options = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${this.client_id}:${this.client_secret}`).toString('base64')
            },
            form:{
                grant_type:'client_credentials'
            }
        };
        request.post(options, (err, res, body) => {
            if (err) { return console.log("Ha habido un error en el request: "+err); }
            const response=JSON.parse(body);
            console.log("Respuesta de Spotify Auth: "+response.access_token);
            respuesta(response.access_token);
        });
    }
}

//Export the controller
module.exports = spotifyAPIcontroller;
