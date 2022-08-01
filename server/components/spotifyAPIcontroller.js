//Rest API Spotify
const request = require('request');

class spotifyAPIcontroller {
    constructor(){
        this.client_id = '03d427b66de64288aa3ff645be1c4df7';
        this.client_secret = 'bcb6f26df3924f46bc33753bab8bcd54'; 
        this.redirect_uri = 'http://localhost:3000/callback'; 
        this.authorizeApp((authToken)=>{
            this.authToken = authToken;
            //console.log(this.authToken)
        });
    }
    //Spotify API Methods
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