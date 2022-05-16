const express=require('express')

const route=express.Router()    //allows us to create different router in a seperate file

const service=require('../service/render')

const controller=require('../controller/controller');

route.get('/list',service.homepages);
route.get('/',service.homepages);

route.get('/add_lamp',service.add_lamp);

route.get('/update_lamp',service.update_lamp);


// API
route.post('/api/lamps',controller.create);
route.get('/api/lamps',controller.find);
route.post('/api/lamps/:id',controller.update);
 
 
module.exports=route 