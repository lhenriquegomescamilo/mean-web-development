var express = require('express'),
    morgan = require('morgan').
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session');


module.exports = function(){
  var app = express();

  configureEnvironment()

  configureBodyParser(app);

  configureViewPages(app);

  require('../app/routes/index.server.routes.js')(app);

  app.use(express.static('./public'));
  return app;
};

var configureBodyParser = function(app){
  app.use(bodyParser.urlencoded({
    extended : true
  }));
  
  app.use(bodyParser.json());
  app.use(methodOverride());

};

var configureViewPages = function(app){
  app.set('views','./app/views');
  app.set('view engine','ejs');
};


var configureEnvironment = function(app){
  if(process.env.NODE_ENV === 'deploymonent'){
    app.use(morgan('dev'));
  }else if(process.env.NODE_ENV === 'production'){
    app.use(compress());
  }
};
