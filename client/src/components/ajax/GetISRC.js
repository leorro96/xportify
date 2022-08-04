export function GetISRC(trackID,respuesta){
    //console.log("Prueba")
    fetch(`https://xportify-server.herokuapp.com/track/${trackID}`)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log("Result Ajax: "+result.external_ids.isrc)
          respuesta(result.external_ids.isrc)
        },
        (error) => {
            console.log("Error Ajax: "+error)
        }
      )
};