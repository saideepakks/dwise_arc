const express=require('express');
const app = express();
const port = 4000;


const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/First-proj",{useNewUrlParser:true});


app.use(express.json());

var nameSchema=new mongoose.Schema({
    name:String,
    perc:{type:Number,max:100}
});

var User=mongoose.model("percTable",nameSchema);

app.get("/student/perc/_all",(req,res)=>{
User.find((err,users)=>{
    if(err) return res.status(400).json(err);
    if(!users.length) return res.status(404).json({users:"NOT FOUND!!!!"})
    return res.json(users);
});
});

app.get("/student/perc/:id",(req,res)=>{
    User.findById(req.params.id,(err,user)=>{
        if(err) return res.status(400).json(err);
        if(!user) return res.status(404).json({user:"not found"});
        return res.json(user);
    });
});

app.post("/student/perc", (req, res) => {
    var user = new User(req.body);
    console.log(req.body);
    user.save()
    .then(item => {
    res.json(item);
    })
    .catch(err => {
    res.status(400).json(err);
    })


});

app.delete("/student/perc/:id", (req, res) => {
    var id = req.params.id;
    User.findByIdAndRemove(id, { sort: "_id" }, (err, data) => {
    if (err) return res.status(400).json(err);
    if (!data) return res.status(404).json({ id: "Not Found" })
    return res.json({ deleted: data });
    });
    });

    app.put('/student/perc/:id', function(req, res) {
    
        let id = req.params.id;
        var data = {
            name : req.body.name,
            perc : req.body.perc
        }
    
        User.findByIdAndUpdate(id, data, function(err, user) {
        if (err) throw err;
        res.send('Document Updated Successfully..!');
        });
   });

app.listen(port,()=>{
    console.log("server is lisening to port ",port);
});

