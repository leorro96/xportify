//Rest API
const express=require('express');
const Model = require('./model');
//const dependencias = require('./dependencias');
const controller=express();
controller.use(express.json());//Parse JSON
controller.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Pass to next layer of middleware
    next();
});

var modelo = new Model();

//API Methods
//GET TRACK
controller.get("/track/:trackID", (req,res)=>{
    console.log("Track was called")
    //Call App
    console.log(req.params.trackID)
    var trackID=req.params.trackID;
    modelo.getTrackData(trackID,(respuesta)=>{
        //Llamar a la vista
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(respuesta),null,3);
    });
});
//GET ALBUM
controller.get("/album/:albumID", (req,res)=>{
    console.log("Album was called")
    //Call App
    console.log(req.params.albumID)
    var albumID=req.params.albumID;
    modelo.getAlbumData(albumID,(respuesta)=>{
        //Llamar a la vista
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(respuesta),null,3);
    });
});
//GET PLAYLIST
controller.get("/playlist/:playlistID", (req,res)=>{
    console.log("Playlists was called");
    //Call App
    console.log(req.params.playlistID);
    var playlistID=req.params.playlistID;
    modelo.getPlaylistData(playlistID, (respuesta)=>{
        //llamar vista
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(respuesta),null,3);
    });
});
//GET PLAYLIST
controller.get("/playlist/:playlistID/items", (req,res)=>{
    console.log("Playlists items was called");
    //Call App
    console.log(req.params.playlistID);
    var playlistID=req.params.playlistID;
    modelo.getPlaylistItems(playlistID, (respuesta)=>{
        //llamar vista
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(respuesta),null,3);
    });
});
//Export the controller
module.exports.Controller = controller;