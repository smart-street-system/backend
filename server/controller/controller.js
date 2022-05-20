const Lampdb = require('../model/model');

//create and save new lamp API
exports.create=(req,res)=>{
    if(!req.body)
    {
        res.stauts(400).send({message : "content can't be empty"});
        return;
    }
    console.log(req.body);

    const lamp =new Lampdb({
        lampName :req.body.lampName,
        longitude :req.body.longitude,
        lattitude :req.body.lattitude,
        isActive :req.body.active


    });

    //save in db
    lamp.save(lamp).then(data=>{
        res.send(data)})
        .catch(err=>{
            res.status(500).send({message : err.message || "some error has occured"});
        });

}

//retrieving lamps
exports.find=(req,res)=>{

    Lampdb.find().then(lamp=>{
        res.send(lamp)
    }).catch(err=>{
        res.status(500).send({message:err.message || "Something went wrong during retrieving"})
    })

}


//update a lamp by id

exports.update=(req,res)=>{

    if(!req.body)
    {
       return res.stauts(400).send({message : "data to update can't be empty"})
    }

    const id=req.params.id;

    Lampdb.findByIdAndUpdate(id,req.body,{useFindAndModify : false})
    .then(data=>{
        if(!data)
        {
            res.status(404).send({message:`cannot update with lamp id ${id}. May be lamp not found`})
        }
        else{
            
            res.send(data)
        }
        }).catch(err=>
            {
                res.status(500).send({message:"error while updating"})
            })

}