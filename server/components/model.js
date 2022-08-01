const spotifyAPIcontroller = require("./spotifyAPIcontroller");
const spotyAPI=new spotifyAPIcontroller();

class Model{
    constructor(){} 
    getTrackData(trackID,respuestaCallback){
        console.log(`getTrackData was called on APP: ${trackID}`)
        spotyAPI.getTrackData(trackID,(respuesta)=>{
            //Process Spotify response
            const JSONTrackData= respuesta;
            //console.log("ISRC: "+JSON.stringify(JSONTrackData.external_ids.isrc));
            respuestaCallback(JSONTrackData)
        });
    };
    
    getPlaylistData(playlistID){
        console.log(`getPlaylistData was called on APP: ${playlistID}`)
        //const rawJSONData= spotyAPI.getPlaylistData(playlistID);
        //Process Spotify response
    };
};
module.exports = Model;