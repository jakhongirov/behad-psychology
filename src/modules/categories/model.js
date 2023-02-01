const { fetch, fetchALL } = require("../../lib/postgres");

const CATEGORIES = `
    SELECT
        *, to_char(test_category_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        test_categories
    ORDER BY    
        test_category_id DESC
    LIMIT 50;   
`;

const ALL_CATEGORIES = `
    SELECT
        *, to_char(test_category_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        test_categories
    ORDER BY    
        test_category_id DESC;   
`;

const CATEGORIES_LIMIT_NEXT = `
    SELECT
        *, to_char(test_category_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        test_categories
    WHERE
        test_category_id < $1
    ORDER BY    
        test_category_id DESC
    LIMIT 50;   
`;

const CATEGORIES_LIMIT_PREV = `
    SELECT
        *, to_char(test_category_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        test_categories
    WHERE
        test_category_id > $1
    ORDER BY    
        test_category_id DESC
    LIMIT 50;   
`;

const CATEGORIES_BY_ID = `
    SELECT
        *, to_char(test_category_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        test_categories
    WHERE
        test_category_id = $1
    ORDER BY    
        test_category_id DESC;   
`;

const ADD_CATEGORY = `
    INSERT INTO
        test_categories (
            test_category_title,
            test_category_img_url,
            test_category_img_name
            )
        VALUES  
            (
                $1,
                $2,
                $3
            ) RETURNING *;
`;

const UPDATE_CATEGORY =`
    UPDATE
        test_categories
    SET
        test_category_title = $2,
        test_category_img_url = $3,
        test_category_img_name = $4
    WHERE
        test_category_id = $1 RETURNING * ;
`;

const DELETE_CATEGORY = `
    DELETE FROM
        test_categories
    WHERE
        test_category_id = $1
    RETURNING *;
`

const categoriesAll = () => fetchALL(ALL_CATEGORIES)
const categories = () => fetchALL(CATEGORIES)
const categoriesLimitNext = (id) => fetchALL(CATEGORIES_LIMIT_NEXT, id)
const categoriesLimitPrev = (id) => fetchALL(CATEGORIES_LIMIT_PREV, id)
const getCategoryByid = (id) => fetch(CATEGORIES_BY_ID , id)
const addCategory = (title, image_url, image_name) => fetch(ADD_CATEGORY, title, image_url, image_name)
const updateCategory = (id, title, image_url, image_name) => fetch(UPDATE_CATEGORY, id, title, image_url, image_name)
const deleteCategory = (id) => fetch(DELETE_CATEGORY, id)

module.exports = {
    categoriesAll,
    categories,
    categoriesLimitNext,
    categoriesLimitPrev,
    getCategoryByid,
    addCategory,
    updateCategory,
    deleteCategory
}