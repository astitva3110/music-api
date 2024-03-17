const express=require('express');
const router=express.Router();
const playlistcontroller=require('../controller/playlistcontroller');
const verify=require('../middleware/verify');


router.post('/Playlistadd/:playlist_id',verify,playlistcontroller.addSongIntoPlaylist);

router.post('/removeSong/:playlist_id',verify,playlistcontroller.removeSong);

router.delete('/deletePlaylist/:playlist_id',verify,playlistcontroller.deletePlaylist);

router.put('/Playlistedit/:playlist_id',verify,playlistcontroller.editPlaylist);


router.get('Playlist/:playlist_id',verify,playlistcontroller.getPlaylist);

module.exports=router;