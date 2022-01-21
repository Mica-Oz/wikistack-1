const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const {Page} = require("../models");
const wikiPage = require('../views/wikipage')


router.get('/', (req, res, next) => {
  res.send('got to GET /wiki/');
})

router.post('/', async (req, res, next) => {
//  console.log(req.body.title)
//  res.send('got to GET /wiki/');

/*
  authorName: 'asdassssssssssssss',
  email: 'dsad',
  title: 'dasd',
  textArea: 'dasdas',
  pageStatus: 'asdasd'
}
*/


  try {
    
    const page = await Page.create({
      title: req.body.title,
      content: req.body.textArea,
      //slug: ${}
    });

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    //res.redirect('/');
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }

})

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    //res.json(page);
    res.send(wikiPage(page, 'placeholder'));
  } catch (error) {next(error)}
});

module.exports = router;

