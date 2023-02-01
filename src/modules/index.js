const express = require("express")
const router = express.Router()
const { AUTH } = require('../middleware/auth')
const FileUpload = require('../middleware/multer')

const Categories = require('./categories/categories')
const Test = require('./test/test')
const Questions = require('./question/question')

router
    .get('/testCategories', AUTH, Categories.GET)
    .post('/addTestCategories', AUTH, FileUpload.single('photo'), Categories.POST)
    .put('/updateTestCategories', AUTH, FileUpload.single('photo'), Categories.PUT)
    .delete('/deleteTestCategories', AUTH, Categories.DELETE)

    .get('/tests', AUTH, Test.GET)
    .post('/addTest', AUTH, FileUpload.single('photo'), Test.POST)
    .put('/updateTest', AUTH, FileUpload.single('photo'), Test.PUT)
    .delete('/deleteTest', AUTH, Test.DELETE)

    .get('/questions', AUTH, Questions.GET)
    .post('/addQuestion', AUTH, Questions.POST)
    .put('/updateQuestion', AUTH, Questions.PUT)
    .delete('/deleteQuestion', AUTH, Questions.DELETE);

module.exports = router
