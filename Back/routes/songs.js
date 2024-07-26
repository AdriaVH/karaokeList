const express=require('express')
const router=express.Router()
const {getSongById, getSongs, updateSelectedById}=require('../controllers/songs')

router.get('/', getSongs)

router.get('/:id', getSongById)
router.patch('/:id', updateSelectedById)

module.exports=router