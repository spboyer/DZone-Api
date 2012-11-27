var express = require('express');
var app = express();
app.get('/test', function (req, res) {
    res.send([
        {
            name: 'wine1'
        }, 
        {
            name: 'wine2'
        }
    ]);
});
app.get('/test/:id', function (req, res) {
    res.send({
        id: req.params.id,
        name: "The Name",
        description: "description"
    });
});
app.listen(process.env.port || 3000);