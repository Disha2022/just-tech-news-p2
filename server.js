const path = require('path');
const exhbs = require('express-handlebars'); //handlebars
const hbs = exhbs.create({}); //handlebars
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const session = require('express-session'); //cookies
const SequelizeStore = require('connect-session-sequelize')(session.Store);//cookies

const app = express();
const PORT = process.env.PORT||3001;

//cookies
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

//set handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middlewares
app.use(session(sess)); //cookies
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
//turn on routes
app.use(routes);

//turn on connection to db and server. //force:false: to avoid dropping and creating new database
sequelize.sync({force:false}).then(()=>{
    app.listen(PORT,()=>console.log(`Now listening at ${PORT}`));
})