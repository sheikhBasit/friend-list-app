const express = require('express');
const connection = require('./connection');
const cors = require('cors');
const bodyParser = require('body-parser');
const Friend  = require('./model');
const app = express();
const port = 3001;
connection();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    const Friend = mongoose.model('Friend');
    Friend.find({}, (err, friends) => {
        if (err) {
            console.log(err);
        } else {
            res.send(friends);
        }
    });
}); 

app.get('/friends', (req, res) => {
    const Friend = mongoose.model('Friend');
    Friend.find({}, (err, friends) => {
        if (err) {
            console.log(err);
        } else {
            res.send(friends);
        }
    });
});

app.post('/add-friend', (req, res) => {
    const Friend = mongoose.model('Friend');
    const friend = new Friend(req.body);
    friend.save((err, friend) => {
        if (err) {
            console.log(err);
        } else {
            res.send(friend);
        }
    });
});   
app.put('/update-friend', (req, res) => {  
    const Friend = mongoose.model('Friend');
    const friend = new Friend(req.body);
    Friend.updateOne({ _id: friend._id }, friend, (err, friend) => {
        if (err) {
            console.log(err);
        } else {
            res.send(friend);
        }
    });

});

app.delete('/delete-friend/:id', (req, res) => {
    const Friend = mongoose.model('Friend');
    Friend.deleteOne({ _id: req.params.id }, (err, friend) => {
        if (err) {
            console.log(err);
        } else {
            res.send(friend);
        }
    });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
