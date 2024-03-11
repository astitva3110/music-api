const express=require('express');
const router=express.Router();
const playlistcontroller=require('../controller/playlistcontroller');
const verify=require('../middleware/verify');


router.post('/Playlistadd/:playlist_id',verify,playlistcontroller.addSongIntoPlaylist);

router.post('/removeSong/:playlist_id',playlistcontroller.removeSong);

router.delete('/deletePlaylist/:playlist_id',playlistcontroller.deletePlaylist);

router.put('/Playlistedit/:playlist_id',playlistcontroller.editPlaylist);


router.get('Playlist/:playlist_id',playlistcontroller.getPlaylist);

module.exports=router;