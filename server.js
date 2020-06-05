const express = require('express');

const projectRouter = require("./projects/projectsRouter.js");
const actionRouter = require("./actions/actionsRouter.js");

const server = express();
server.use(express.json());

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get('/', (req, res) => {
    res.status(200).json({ 
      environment: process.env.NODE_ENV, 
      port: process.env.PORT,
      greeting: process.env.GREET
    });
});

function logger(req, res, next) {
console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
    'Origin'
    )}`
);

next();
}

server.use(logger);

module.exports = server;