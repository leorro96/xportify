import React, { useState, useRef }from 'react'
import { GetISRC } from "../../components/ajax/GetISRC";
import {Checkbox} from '../../components/checkbox/Checkbox';
import './main.css'

const Main = ()=>{
    const [isrc,setISRC]=useState("Export track data");
    const [trackID,setTrackID]=useState("");
    const [buttonText,setButtonText] = useState("EXPORT");
    const [options,setOptions]=useState([
        {"Artists":{id:"artists",value:false}},
        {"ISRC,EAN,UPC":{id:"codes",value:false}},
        {"Album Images":{id:"images",value:false}},
        {"Track Title":{id:"tracktitle",value:false}},
        {"Available Markets":{id:"markets",value:false}},
        {"Track ID":{id:"trackid",value:false}},
        {"Explicit Lyrics":{id:"explicit",value:false}},
        {"Duration":{id:"duration",value:false}}
    ])
    const inputRef=useRef();

    const handleClick=()=>{
        var inputTrackLink=inputRef.current.value;
        if(inputTrackLink==="") return
        inputTrackLink=(inputTrackLink.split("/")[4]).split("?")[0]
        setTrackID(inputTrackLink)
        GetISRC(trackID,(res)=>{
            setISRC(res)
        })
        inputRef.current.value=""; //Clear input field
        //setButtonText("New Export")
    };

    return (
    <main id="main">
        <div className="appContent">
            <div className="appItem"><h1 className="title">{isrc}</h1></div>
            <div className="appItem"><h2 className="title">from 90+ million tracks on Spotify.</h2></div>
            <div className="appItem"><input id="inputTrackLink" ref={inputRef} type="text" placeholder="Spotify Track Link"/></div>
            <div className="appItem"><button id="getDataButton" onClick={handleClick}>{buttonText}</button></div>
            <div className="appItem checkboxes">
                {
                    options.map((opcion)=>(
                        <Checkbox key={Object.keys(opcion)} option={opcion}/>
                    ))
                }
            </div>
        </div>
    </main>
    )
}

export default Main