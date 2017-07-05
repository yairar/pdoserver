var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds149122.mlab.com:49122/pdo-events-db', ['pdoevents']);



// Add new Event
router.get('/events/add', function(req, res){
    var event = {};
    // Minimum parameters required
    /*
    if(!req.params.project || !req.params.engineer){
        res.status(400);
        var err_resp = {};
        if(!req.params.project){
            err_resp.error = 'project param required'; 
        }
        if(!req.params.engineer){
            err_resp.error += ', engineer param required'; 
        }
        res.json(err_resp);
    } else {
*/
        event.project = req.params.project || 'default';
        event.engineer = req.params.engineer || 'default';
        event.status = req.params.status || 'started';
        var date = new Date();

        event.timeCreated = date.getDate()+'/'
            +date.getMonth()+'/'
            +date.getFullYear()+' '
            +date.getHours()+':'
            +date.getMinutes()+':'
            +date.getSeconds();

        db.pdoevents.save(event, function(err, pdoevent){
            if (err){
                res.send(err);
            }
            res.json(pdoevent);
        });
        /*
    }*/
});


// Get All events
router.get('/events', function(req, res, next){
    db.pdoevents.find(function(err, pdoevents){
        console.log(pdoevents);
        if (err){
            res.send(err);
        }
        res.json(pdoevents);
    });
});

// Get specific event
router.get('/events/:id', function(req, res){
   db.pdoevents.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, pdoevent){
        console.log(pdoevent);
        if (err){
            res.send(err);
        }
        res.json(pdoevent);
    });
});


// Delete specific event
router.delete('/events/:id', function(req, res){
   db.pdoevents.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, pdoevent){
        console.log(pdoevent);
        if (err){
            res.send(err);
        }
        res.json(pdoevent);
    });
});
///---------------------------------





router.get('/events/update', function(req, res){
    res.send('API /api/events/update');
});


module.exports = router;