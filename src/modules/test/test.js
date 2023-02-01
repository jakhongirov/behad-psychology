const model = require('./model');
const path = require('path')
const FS = require('../../lib/fs')

module.exports = {
    GET: async (req, res) => {
        try {
            const { title, id, position, categoryId } = req.query

            if (position == 'all') {
                const testAll = await model.testAll()
                return res.json({
                    status: 200,
                    message: "Succcess",
                    data: testAll
                })
            } else if (categoryId) {
                const testByCategoryId = await model.testByCategoryId(categoryId)
                return res.json({
                    status: 200,
                    message: "Succcess",
                    data: testByCategoryId
                })
            } else if (position == 'next' && id && title) {
                const testLimitNextByTitle = await model.testLimitNextByTitle(id, title)
                return res.json({
                    status: 200,
                    message: "Succcess",
                    data: testLimitNextByTitle
                })

            } else if (position == 'prev' && id && title) {
                const testLimitPrevByTitle = await model.testLimitPrevByTitle(id, title)
                return res.json({
                    status: 200,
                    message: "Succcess",
                    data: testLimitPrevByTitle
                })
            } else if (position == 'next' && id) {
                const testLimitNext = await model.testLimitNext(id)
                return res.json({
                    status: 200,
                    message: "Succcess",
                    data: testLimitNext
                })
            } else if (position == 'prev' && id) {
                const testLimitPrev = await model.testLimitPrev(id)
                return res.json({
                    status: 200,
                    message: "Succcess",
                    data: testLimitPrev
                })
            } else {
                const tests = await model.tests()
                return res.json({
                    status: 200,
                    message: "Succcess",
                    data: tests
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
            const {
                title,
                description,
                category_id,
                result_1,
                result_2,
                result_3,
                result_4,
                result_5,
                result_6,
                point_1,
                point_2,
                point_3,
                point_4,
                point_5,
                point_6,
            } = req.body
            const uploadPhoto = req.file;

            console.log(result_1);

            let image_name = "";
            let image_url = "";

            if (uploadPhoto) {
                image_name = uploadPhoto.filename;
                image_url = `https://psychology.behad.uz/public/images/${uploadPhoto.filename}`;
            }

            const addTest = await model.addTest(title, description, category_id, result_1, result_2, result_3, result_4, result_5, result_6, image_url, image_name , point_1)

            if (addTest) {
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
            const {
                id,
                title,
                description,
                category_id,
                result_1,
                result_2,
                result_3,
                result_4,
                result_5,
                result_6
            } = req.body
            const uploadPhoto = req.file;
            const testByid = await model.testByid(id)

            let image_name = "";
            let image_url = "";

            if (testByid) {
                const deleteOldLogo = await new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${testByid?.test_img_name}`))

                if (uploadPhoto) {
                    deleteOldLogo.delete()
                    image_name = uploadPhoto.filename
                    image_url = `https://psychology.behad.uz/public/images/${uploadPhoto.filename}`
                } else {
                    image_url = testByid?.test_img_url
                    image_name = testByid?.test_img_name
                }

                const updateTest = await model.updateTest(
                    id,
                    title,
                    description,
                    category_id,
                    result_1,
                    result_2,
                    result_3,
                    result_4,
                    result_5,
                    result_6,
                    image_url,
                    image_name
                )

                if (updateTest) {
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

            } else {
                return res.json({
                    status: 404,
                    message: "Not found"
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
            const testByid = await model.testByid(id)
            const deleteOldLogo = await new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${testByid?.test_img_name}`))
            const deleteTest = await model.deleteTest(id)

            if (deleteTest) {
                deleteOldLogo.delete()
                return res.json({
                    status: 200,
                    message: "Success"
                })
            } else {
                return res.json({
                    status: 400,
                    message: "Baq request"
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