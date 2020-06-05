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

module.exports = router;