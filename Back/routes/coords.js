const express=require('express')
const router=express.Router()
const {getCoords}=require('../controllers/coords')

router.get('/', getCoords)


module.exports=router