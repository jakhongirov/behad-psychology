const model = require('./model');
const path = require('path')
const FS = require('../../lib/fs')

module.exports = {
    GET: async (req, res) => {
        try {
            const { position, id } = req.query;

            if (position === 'next' && id) {
                const categoriesLimitNext = await model.categoriesLimitNext(id)

                return res.json({
                    status: 200,
                    message: "Succcess",
                    data: categoriesLimitNext
                })

            } else if (position === 'prev' && id) {
                const categoriesLimitPrev = await model.categoriesLimitPrev(id)

                return res.json({
                    status: 200,
                    message: "Succcess",
                    data: categoriesLimitPrev
                })
            } else {
                const categories = await model.categories()

                return res.json({
                    status: 200,
                    message: "Succcess",
                    data: categories
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
            const { title } = req.body
            const uploadPhoto = req.file;
            const image_name = uploadPhoto.filename;
            const image_url = `https://psychology.behad.uz/public/images/${uploadPhoto.filename}`;
            const addCategory = await model.addCategory(title, image_url, image_name)

            if (addCategory) {
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
            const uploadPhoto = req.file;
            const { id, title } = req.body
            const categoryByid = await model.getCategoryByid(id)

            let image_name = "";
            let image_url = "";

            if (categoryByid) {
                const deleteOldLogo = await new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${categoryByid?.test_category_img_name}`))

                if (uploadPhoto) {
                    deleteOldLogo.delete()
                    image_name = uploadPhoto.filename
                    image_url = `https://psychology.behad.uz/public/images/${uploadPhoto.filename}`
                } else {
                    image_url = categoryByid?.test_category_img_url
                    image_name = categoryByid?.test_category_img_name
                }

                const updateCategory = await model.updateCategory(id, title, image_url, image_name)

                if (updateCategory) {
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
            const categoryByid = await model.getCategoryByid(id)
            const deleteOldLogo = await new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${categoryByid?.test_category_img_name}`))
            const deleteCategory = await model.deleteCategory(id)

            if (deleteCategory) {
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
    },

}