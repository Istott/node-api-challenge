const express = require('express');
const Actions = require("../data/helpers/actionModel");
const Projects = require("../data/helpers/projectModel");

const router = express.Router();

router.get('/', (req, res) => {
    // do your magic!
    Actions.get()
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the actions",
        });
      });
});

router.post('/:id/actions', (req, res) => {
    // do your magic!
    const body = req.body;
    body.project_id = req.params.id
  
    Actions.insert(body)
      .then(action => {
        res.status(201).json(action)
      })
      .catch(err => {
        console.log(err),
        res.status(500).json({
          error: "There was an error while saving the action to the database."
        });
      });
});

// function validatePost(req, res, next) {
//     // do your magic!
//     const post = req.body
    
//     if(post.text) {
//       next()
//     } else {
//       res.status(400).json({message: "missing post data"});
//     }
// }

router.delete("/:id", (req, res) => {
    Actions.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "The action has been nuked" });
        } else {
          res.status(404).json({ message: "The action could not be found" });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error removing the action",
        });
      });
});

router.put("/:id", (req, res) => {
    const changes = req.body;
    Actions.update(req.params.id, changes)
      .then(action => {
        if (action) {
          res.status(200).json(action);
        } else {
          res.status(404).json({ message: "The action could not be found" });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error updating the action",
        });
      });
  });

module.exports = router;