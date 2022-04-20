
const express = require('express');
const router =express.Router();

const uuid= require('uuid');
const members = require('../../members');
//GEt ALll members
router.get('/',(req,res) => res.json(members) );

//Get Single Member
 /*  app.get('/api/members/:id',(req,res) => {
    res.send(req.params.id) }
    ); */

    router.get('/:id',(req,res) => {
       const recordFound= members.some(member => member.id=== parseInt(req.params.id));
       if(recordFound){
        res.json(members.filter(member => member.id=== parseInt(req.params.id))) 
       }else{
           res.status(400).json({msg:'no member not found'});  
             }
   
    });

//Create Member

router.post('/',(req,res)=>{
 // res.send(req.body)

 const newMember = { //npm install uuid
    id:uuid.v4(),
    name:req.body.name,
    email:req.body.email,
    status:'active'
 }

 if(!newMember.name || !newMember.email){
   res.status(400).json({msg:"Please include a name and email"})
 }

 members.push(newMember);
 res.json(members);
})

// update Member
router.put('/:id',(req,res) => {
  const recordFound= members.some(member => member.id=== parseInt(req.params.id));
  if(recordFound){

     const updateMember =req.body;
     members.forEach(member => {
       if(member.id=== parseInt(req.params.id)){
         member.name= updateMember.name ? updateMember.name:member.name;
         member.email=updateMember.email ? updateMember.email : member.email;
        res.json ({msg:'Member Updated',member});

       }
     });
  // res.json(members.filter(member => member.id=== parseInt(req.params.id))) 
  }else{
      res.status(400).json({msg:'no member not found'});  
        }

});

//Delete Member 

router.delete('/:id',(req,res) => {
  const recordFound= members.some(member => member.id=== parseInt(req.params.id));
  if(recordFound){
   res.json({msg:'Member Deleted',members:members.filter(member => member.id !== parseInt(req.params.id))}) ;
  }else{
      res.status(400).json({msg:'no member not found'});  
        }

});

module.exports= router;