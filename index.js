var express = require('express');
var app = express();

var fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.post('/python', function (req, res) {
  
    var pythoncode= req.body.sourcecode;

    console.log(req.body.sourcecode);
    fs.writeFileSync("./test.py", req.body.sourcecode); 
    
    var PythonShell = require('python-shell');
    //var pyshell = new PythonShell('./test.py');

    PythonShell.run('./test.py', function (err, results) {
            if (err) throw err;
            //console.log(results);
            res.send(results);
            });

    


    /*
    pyshell.send('hello');

    pyshell.on('message', function (message) {       
        console.log(message);     
        //result= message;
        res.send(message);
    });

    pyshell.end(function (err) {
        if (err) throw err;
        console.log('finished');
        //res.send('finished');
    });*/


    //res.send('Hello World!');


});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});



    // sends a message to the Python script via stdin 
    //pyshell.send(pythoncode);
    
    
    
     //end the input stream and allow the process to exit 
    