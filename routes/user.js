const express=require('express');
const router=express.Router();
const usercontroller=require('../controller/usercontroller');
const auth=require('../middleware/auth');

router.post('/:user_id',auth,usercontroller.getuser);

router.put('/update/:user_id',auth,usercontroller.updateUserData)

router.post('/createPlaylist/:user_id',auth,usercontroller.createPlaylist);

router.post('/LikedSong/:user_id',auth,usercontroller.LikedSong);

router.post('/unLikedSong/:user_id',auth,usercontroller.unLikedSong);

router.get('/search/:query',auth,usercontroller.getSearch);

module.exports=router;
