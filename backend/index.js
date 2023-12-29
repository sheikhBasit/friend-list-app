const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const connection = require('./connection');
const Friend = require('./model');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
connection();
app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => { console.log(`Server is running on port ${port}`) });

app.get('/', async (req, res) => {
    try {
      const friends = await Friend.find();
      res.json(friends);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
app.get('/:id', async (req, res) => {
    Friend.findById(req.params.id)
        .then((friend) => {
            if (!friend) {
                return res.status(404).json({ error: 'Friend not found' });
            }
            res.json(friend);
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

// Fetch user ID by email
app.get('/friendByEmail/:email', async (req, res) => {
    try {
      const friend = await Friend.findOne({ email: req.params.email });
      if (!friend) {
        return res.status(404).json({ error: 'Friend not found' });
      }
      res.json(friend);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
app.post('/friends', async (req, res) => {
    try {
      const { name, age, email } = req.body;
  
      // Create a new Friend instance
      const newFriend = new Friend({
        name,
        age,
        email,
      });
  
      // Save the new friend to the database
      const savedFriend = await newFriend.save();
  
      res.json(savedFriend);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.put('/update/:id', async (req, res) => {
    Friend.findById(req.params.id)
        .then(Friend => {
            Friend.name = req.body.name;
            Friend.age = req.body.age;
            Friend.save()
                .then(() => res.json('Friend updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
app.put('/update/:email', async (req, res) => {
    Friend.findById(req.params.email)
        .then(Friend => {
            Friend.name = req.body.name;
            Friend.age = req.body.age;
            Friend.save()
                .then(() => res.json('Friend updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
// Assuming your route is for deleting by email and getting ID
app.delete('/deleteByEmail/:email', async (req, res) => {
    try {
        // Find the friend by email and retrieve the ID
        const friend = await Friend.findOne({ email: req.params.email });
        
        if (friend) {
            // Delete the friend using the obtained ID
            await Friend.findByIdAndDelete(friend._id);
            res.json('Friend deleted.');
        } else {
            res.status(404).json('Friend not found.');
        }
    } catch (err) {
        res.status(500).json('Error: ' + err);
    }
});
app.delete('/delete/:id', async (req, res) => {
    Friend.findByIdAndDelete(req.params.id)
        .then(() => res.json('Friend deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});