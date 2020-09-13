/**
 * Modulos
 */
const http = require("http");
const fs = require("fs");
const url = require("url");
const axios = require("axios");
const utils = require('./utils.js');

/**
 * Modify htmls
 */
axios.get("https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json")
  .then(function (response){
    utils(response.data, './api/proveedores.html', 1);
  });
axios.get("https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json")
  .then(function(response){
    utils(response.data, './api/clientes.html', 0);
  });


/**
 * Init server.
 */
http.createServer(function (req, res) {
    let q = url.parse(req.url, true);
    let filename = '.' + q.pathname+ '.html';
    fs.readFile(filename, function(err, data){
      if(err){
        res.writeHead(404, {'Content-type': 'text/html'});
        return res.end('404 Not Found');
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    }); 
  })
  .listen(8081);
console.log('server running in port 8081');
