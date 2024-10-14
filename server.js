// Using 3rd party packages

// nodemon (installed globally)

// local packages (use git init) then download packages you need.
// Using loadash (with git init too!)
// During sharing this project you don't upload node_modules(they're too many) you simply upload this package.json which shows dependencies(then we can simply use npm install to install all 3rd party packages).

const http = require('http');
const fs = require('fs');
const _ = require('lodash'); //using lodash

const server = http.createServer((req, res) => {

  //lodash
  const num = _.random(0, 20);
  console.log(num);

  const greet = _.once(() => {
    console.log('Hello To you All!');
  })
  greet();
  greet();

  res.setHeader('Content-Type', 'text/html');
  let path = './views/';
  switch (req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-us':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});


server.listen('3000', 'localhost', () => {
  console.log('Listening for request on port 3000');
});