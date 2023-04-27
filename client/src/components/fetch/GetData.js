export async function GetData(assetID,platform){
  var response;
  switch(platform){
    case "track":
      response=await fetch(`http://localhost:80/track/${assetID}`)
      .then(res => res.json())
      .then(
        (result) => {
            //console.log("Result Ajax: "+result.external_ids.isrc)
            return(result)
        },
        (error) => {
            console.log("Error Ajax: "+error)
        }
      )
      return response;
    case "album":
      response=await fetch(`http://localhost:80/album/${assetID}`)
      .then(res => res.json())
      .then(
        (result) => {
            //console.log("Result Ajax: "+result)
            return(result)
        },
        (error) => {
            console.log("Error Ajax: "+error)
        }
      )
      return response;
    case "playlist":
      response=await fetch(`http://localhost:80/playlist/${assetID}`)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log("Result Ajax: "+result.external_ids.isrc)
          return(result)
        },
        (error) => {
            console.log("Error Ajax: "+error)
        }
      )
      return response;

      case "playlist/items":
        response=await fetch(`http://localhost:80/playlist/${assetID}/items`)
        .then(res => res.json())
        .then(
          (result) => {
            //console.log("Result Ajax: "+result.external_ids.isrc)
            return(result)
          },
          (error) => {
              console.log("Error Ajax: "+error)
          }
        )
        return response;
        
        default:
        break;
  }
    
};