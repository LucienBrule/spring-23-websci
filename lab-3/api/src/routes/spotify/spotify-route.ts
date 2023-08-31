import * as querystring from "querystring";
import express from "express";
import config from "@/config";
import {generateRandomString} from "@/util";

const SPOTIFY_SCOPE = 'user-read-private user-read-email'
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize'
const SPOTIFY_RESPONSE_TYPE = 'code'
let spotifyRouter = express.Router();

spotifyRouter.get('/login', (req, res)=> {
  res.redirect(`${SPOTIFY_AUTH_URL}?` +
    querystring.stringify({
      response_type: SPOTIFY_RESPONSE_TYPE,
      client_id: config.spotify.client_id,
      scope: SPOTIFY_SCOPE,
      redirect_uri: config.spotify.redirect_uri,
      state: generateRandomString(16);
    }));
});



export {
  spotifyRouter
}