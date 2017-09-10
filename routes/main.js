/**
 * Created by rejhan on 9.9.2017.
 */
var fs = require('fs');
module.exports= function(app){
    // app.get("/",function(req,res){
    //     res.send("Starting point for server side");
    // });
    // app.get("/home",function(req,res,next){
    //     res.sendFile("index.html",{
    //         root: __dirname+"/public"
    //     });
    // });
    app.post("/writeToFile",function(req,res,next){
        console.log("The file was saved!"+req.body);

        fs.writeFile("files/jsonOutput.txt",JSON.stringify(req.body), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });

    });
};
