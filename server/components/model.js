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
    getAlbumData(albumID,respuestaCallback){
        console.log(`getAlbumData was called on APP: ${albumID}`)
        spotyAPI.getAlbumData(albumID,(respuesta)=>{
            //Process Spotify response
            const JSONAlbumData= respuesta;
            respuestaCallback(JSONAlbumData)
        });
    };
    getPlaylistData(playlistID,respuestaCallback){
        console.log(`getPlaylistData was called on APP: ${playlistID}`)
        spotyAPI.getPlaylistData(playlistID,(respuesta)=>{
            //Process Spotify response
            const JSONPlaylistData= respuesta;
            respuestaCallback(JSONPlaylistData)
        });
        //Process Spotify response
    };
    getPlaylistItems(playlistID,respuestaCallback){
        console.log(`getPlaylistItems was called on APP: ${playlistID}`)
        spotyAPI.getPlaylistItems(playlistID,0,(respuesta)=>{
            //Process Spotify response
            const JSONPlaylistItems= respuesta;
            //console.log(JSONPlaylistItems["items"].map((item)=>item["track"]))
            var totalItems=Array.from(JSONPlaylistItems["items"].map((item)=>item["track"]))
            console.log(totalItems.length)
            //console.log(Array.from({length: JSONPlaylistItems["total"]%50==0?(JSONPlaylistItems["total"]/50)-1:(Math.ceil(JSONPlaylistItems["total"]/50))-1}, (x, i) => i+1))
            const offsetMult=Array.from({length: JSONPlaylistItems["total"]%50==0?(JSONPlaylistItems["total"]/50)-1:(Math.ceil(JSONPlaylistItems["total"]/50))-1}, (x, i) => i+1)
            offsetMult.map((num, index)=>{
                spotyAPI.getPlaylistItems(playlistID,50*num,(respuesta)=>{
                    Array.prototype.push.apply(totalItems,respuesta["items"].map((item)=>item["track"])); 
                    if(index+1==offsetMult.length){
                        //console.log(totalItems.length)
                        respuestaCallback(totalItems)
                    }
                })
            })

        });
    };
};
module.exports = Model;