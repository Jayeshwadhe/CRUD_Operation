var express = require('express');
var usersModel = require('../modules/users');
var router = express.Router();
var users = usersModel.find({});

/* GET home page. */
router.get('/', function(req, res, next) {
users.exec(function(err,data){
  if(err) throw err; 
  res.render('index', { title:'Users Records', records:data, success:'' });
});
  
});

router.post('/', function(req, res, next) {

  var usersDetails = new usersModel({
    name: req.body.uname,
    age: req.body.age,
    email: req.body.email,
    country: req.body.country,
    totalamount: req.body.totalamount,
    totalhours: req.body.totalhours,
    total: parseInt (req.body.totalamount)* parseInt (req.body.totalhours),
  });
   //console.log(usersDetails)
   usersDetails.save(function(err, res1){
     if(err) throw err;
    users.exec(function(err,data){
      if(err) throw err; 
      res.render('index', { title:'Users Records', records:data, success:"Records Inserted successfully" });
    });
  });

   });

   router.post('/search/', function(req, res, next) {

    var flrtName = req.body.fltrname;
    var flrtEmail = req.body.fltremail;
    
    
    if(flrtName !='' && flrtEmail !=''){
  
     var flterParameter={$and:[{name:flrtName},{email:flrtEmail}]}
    
    }else if(flrtName !='' && flrtEmail ==''){
      var flterParameter={ $and:[{ name:flrtName}]
         }
    }else if(flrtName =='' && flrtEmail !=''){

      var flterParameter={ $and:[{ email:flrtEmail}]
         }
    }else{
      var flterParameter={}
    }
    var usersFilter =usersModel.find(flterParameter);
    usersFilter.exec(function(err,data){
        if(err) throw err;
        res.render('index', { title: 'Users Records', records:data });
          });
    
    
  });

  router.get('/delete/:id', function(req, res, next) {
    var id=req.params.id;
    var del= usersModel.findByIdAndDelete(id);

    del.exec(function(err){
      if(err) throw err; 
      users.exec(function(err,data){
        if(err) throw err; 
        res.render('index', { title:'Users Records', records:data, success:"Records deleted successfully" });
      });
    });
    });

    
    router.get('/edit/:id', function(req, res, next) {
      var id=req.params.id;
      var edit= usersModel.findById(id);

      edit.exec(function(err,data){
        if(err) throw err; 
        res.render('edit', { title:'Edit Users Records', records:data });
      });
        
      });

      router.post('/update/', function(req, res, next)  {
       
        var update= usersModel.findByIdAndUpdate(req.body.id,{
            name: req.body.uname,
            age: req.body.age,
            email: req.body.email,
            country: req.body.country,
            totalamount: req.body.totalamount,
            totalhours: req.body.totalhours,
            total: parseInt(req.body.totalamount)* parseInt(req.body.totalhours) 
        });
        //  console.log(update)
  
        update.exec(function(err,data){
          if(err) throw err; 
          users.exec(function(err,data){
            if(err) throw err; 
            res.render('index', { title:'Users Records', records:data, success:"Records updated successfully" });
        });
          
        });
      });

module.exports=router;