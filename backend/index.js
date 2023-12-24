const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const connection = require('./connection');
const Friend = require('./model.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => { console.log(`Server is running on port ${port}`) });



app.get('/friends', async (req, res) => {
try {
    const allFriend = await Friend.find({});
    res.send({status: 200, data: allFriend})
} catch (err) {
    console.log(err);
}    
});
app.get('/friends/:id', (req, res) => {
    Friend.findById(req.params.id, (err, friend) => {
        if (err) {
            console.log(err);
        } else {
            res.json(friend);
        }
    });
});