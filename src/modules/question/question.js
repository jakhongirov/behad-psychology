const model = require('./model');
const path = require('path')
const FS = require('../../lib/fs')

module.exports = {
    GET: async (req, res) => {
        try {
            const { id, testId, position, title } = req.query

            if (position == 'all') {
                const questionAll = await model.questionAll()
                return res.json({
                    status: 200,
                    message: "Success",
                    data: questionAll
                })

            } else if (position == "next" && id && title) {
                const questionLimitNextByTitle = await model.questionLimitNextByTitle(id, title)
                return res.json({
                    status: 200,
                    message: "Success",
                    data: questionLimitNextByTitle
                })
            } else if (position == "prev" && id && title) {
                const questionLimitPrevByTitle = await model.questionLimitPrevByTitle(id, title)
                return res.json({
                    status: 200,
                    message: "Success",
                    data: questionLimitPrevByTitle
                })
            } else if (position == "next" && id) {
                const questionLimitNext = await model.questionLimitNext(id)
                return res.json({
                    status: 200,
                    message: "Success",
                    data: questionLimitNext
                })
            } else if (position == "prev" && id) {
                const questionLimitPrev = await model.questionLimitPrev(id)
                return res.json({
                    status: 200,
                    message: "Success",
                    data: questionLimitPrev
                })
            } else if (testId) {
                const questionByTestId = await model.questionByTestId(testId)
                return res.json({
                    status: 200,
                    message: "Success",
                    data: questionByTestId
                })
            } else {
                const question = await model.question()
                return res.json({
                    status: 200,
                    message: "Success",
                    data: question
                })
            }

        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },

    POST: async (req, res) => {
        try {
            const { text, testId, answer_1, answer_2, answer_3, answer_4, answer_5, answer_6 } = req.body

            // const uploadPhoto = req.file;
            // let image_name = "";
            // let image_url = "";
            // if (uploadPhoto) {
            //     image_name = uploadPhoto.filename;
            //     image_url = `https://psychology.behad.uz/public/images/${uploadPhoto.filename}`;
            // }

            const addQuestion = await model.addQuestion(text, testId, answer_1, answer_2, answer_3, answer_4, answer_5, answer_6)

            if (addQuestion) {
                return res.json({
                    status: 200,
                    message: "Success"
                })
            } else {
                return res.json({
                    status: 400,
                    message: "Bad request"
                })
            }

        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },

    PUT: async (req, res) => {
        try {
            const { id, text, testId, answer_1, answer_2, answer_3, answer_4, answer_5, answer_6 } = req.body

            const updateQuestion = await model.updateQuestion(id, text, testId, answer_1, answer_2, answer_3, answer_4, answer_5, answer_6)

            if (updateQuestion) {
                return res.json({
                    status: 200,
                    message: "Success"
                })
            } else {
                return res.json({
                    status: 400,
                    message: "Bad request"
                })
            }
        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },

    DELETE: async (req, res) => {
        try {
            const { id } = req.body
            const deleteQuestion = await model.deleteQuestion(id)

            if (deleteQuestion) {
                return res.json({
                    status: 200,
                    message: "Success"
                })
            } else {
                return res.json({
                    status: 400,
                    message: "Bad request"
                })
            }
        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    }
}