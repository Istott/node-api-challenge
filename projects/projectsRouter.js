const express = require('express');
const Projects = require("../data/helpers/projectModel");

const router = express.Router();

router.get('/', (req, res) => {
    // do your magic!
    Projects.get()
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

router.post('/', (req, res) => {
    Projects.insert(req.body)
  
    .then(user => {
      if(user){
        res.status(201).json(user);
      } else {
        res.status(500).json({
        error: "There was an error while saving to the database"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the project to the database."
      });
    })
  
});


// function validateUser(req, res, next) {
// // do your magic!
// const user = req

// if(user.body) {
//     if(user.body.name) {
//     next();
//     } else {
//     res.status(400).json({message: "missing required name field"});
//     }
// } else {
//     res.status(400).json({errorMessage: "missing user data."});
// }
// }

router.delete("/:id", (req, res) => {
    Projects.remove(req.params.id)
        .then(count => {
        if (count > 0) {
            res.status(200).json({ message: "The project has been nuked" });
        } else {
            res.status(404).json({ message: "The project could not be found" });
        }
        })
        .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
            message: "Error removing the project",
        });
        });
});

router.put("/:id", (req, res) => {
    const changes = req.body;

    Projects.update(req.params.id, changes)
        .then(project => {
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: "The project could not be found" });
        }
        })
        .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
            message: "Error updating the project",
        });
        });
});

module.exports = router;