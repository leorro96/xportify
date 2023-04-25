export async function GetData(assetID,platform){
    switch(platform){
      case "track":
        fetch(`http://localhost:80/track/${assetID}`)
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
        break;
      case "album":
        fetch(`http://localhost:80/album/${assetID}`)
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
        break;
      case "playlist":
        fetch(`http://localhost:80/playlist/${assetID}`)
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
          break;
        case "playlist/items":
          fetch(`http://localhost:80/playlist/${assetID}/items`)
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
          break;
        default:
          break;
    }
    
};