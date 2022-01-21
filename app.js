const PORT = 3000;
const express = require('express');
const app = express();
const morgan = require('morgan')
app.use(morgan('dev'));
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
const layout = require("./views/layout");
const { db, Page, User } = require('./models');
const usersRouter = require('./routes/users');
const wikiRouter = require('./routes/wiki');

app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);


db.authenticate()
  .then(() => {
    console.log('connected to the database');
})







app.get('/', (req, res, next) => {
  res.redirect('/wiki');

}) 


const init = async () => {
//  await Page.sync();
//  await User.sync();
  await db.sync({force: true});
  // make sure that you have a PORT constant
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
}

init();

//app.listen(PORT, () => {
//  console.log(`App listening in port ${PORT}`);
//});

