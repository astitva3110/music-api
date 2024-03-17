const express=require('express');
const router=express.Router();
const usercontroller=require('../controller/usercontroller');
const verify=require('../middleware/verify');

router.get('/:user_id',verify,usercontroller.getuser);

router.put('/update/:user_id',verify,usercontroller.updateUserData);

router.post('/appName/:user_id',verify,usercontroller.appName);

router.get('/createPlaylist/:user_id',verify,usercontroller.getappname);

router.post('/createPlaylist/:user_id',verify,usercontroller.createPlaylist);

router.post('/LikedSong/:song_id',verify,usercontroller.LikedSong);

router.post('/unLikedSong/:song_id',verify,usercontroller.unLikedSong);

router.get('/search/:query',verify,usercontroller.getSearch);

router.get('/shufflePlay',usercontroller.shufflePlay);

module.exports=router;
