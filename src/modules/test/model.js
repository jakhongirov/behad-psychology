const { fetch, fetchALL } = require("../../lib/postgres");

const TEST = `
    SELECT
        *, to_char(test_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        tests
    ORDER BY    
        test_id DESC
    LIMIT 50;  
`;

const ALL_TEST = `
    SELECT
        *, to_char(test_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        tests
    ORDER BY    
        test_id DESC;  
`;

const TEST_BY_ID = `
    SELECT
        *, to_char(test_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        tests
    WHERE
        test_id = $1
    ORDER BY    
        test_id DESC
    LIMIT 50;  
`;

const TEST_BY_CATEGORY_ID = `
    SELECT
        *, to_char(test_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        tests
    WHERE
        test_category_id = $1
    ORDER BY    
        test_id DESC;  
`;

const TEST_LIMIT_NEXT_BY_TITLE = `
    SELECT
        *, to_char(test_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        tests
    WHERE
        test_id < $1 test_title ILIKE $2
    ORDER BY    
        test_id DESC
    LIMIT 50;  
`;

const TEST_LIMIT_PREV_BY_TITLE = `
    SELECT
        *, to_char(test_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        tests
    WHERE
        test_id > $1 test_title ILIKE $2
    ORDER BY    
        test_id DESC
    LIMIT 50;  
`;

const TEST_LIMIT_NEXT = `
    SELECT
        *, to_char(test_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        tests
    WHERE
        test_id < $1
    ORDER BY    
        test_id DESC
    LIMIT 50;  
`;

const TEST_LIMIT_PREV = `
    SELECT
        *, to_char(test_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        tests
    WHERE
        test_id > $1
    ORDER BY    
        test_id DESC
    LIMIT 50;  
`;

const ADD_TEST = `
INSERT INTO
    tests (
        test_title,
        test_description,
        test_category_id,
        test_result_1,
        test_result_2,
        test_result_3,
        test_result_4,
        test_result_5,
        test_result_6,
        test_img_url,
        test_img_name
        )
    VALUES  
        (
            $1,
            $2,
            $3,
            {$4: $12},
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            $11
        ) RETURNING *;
`;

const UPDATE_TEST = `
    UPDATE
        tests
    SET
        test_title = $2,
        test_description = $3,
        test_category_id = $4,
        test_result_1 = $5,
        test_result_2 = $6,
        test_result_3 = $7,
        test_result_4 = $8,
        test_result_5 = $9,
        test_result_6 = $10,
        test_img_url = $11,
        test_img_name = $12
    WHERE
        test_id = $1
    RETURNING *;
`;

const DELETE_TEST = `
    DELETE FROM
        tests
    WHERE
        test_id = $1
    RETURNING *;
`

const testAll = () => fetchALL(ALL_TEST)
const tests = () => fetchALL(TEST)
const testByid = (id) => fetch(TEST_BY_ID, id)
const testByCategoryId = (categoryId) => fetchALL(TEST_BY_CATEGORY_ID, categoryId)
const testLimitNextByTitle = (id, title) => fetchALL(TEST_LIMIT_NEXT_BY_TITLE, id, title)
const testLimitPrevByTitle = (id, title) => fetchALL(TEST_LIMIT_PREV_BY_TITLE, id, title)
const testLimitNext = (id) => fetchALL(TEST_LIMIT_NEXT, id)
const testLimitPrev = (id) => fetchALL(TEST_LIMIT_PREV, id)
const addTest = (title, description, category_id, result_1, result_2, result_3, result_4, result_5, result_6, image_url, image_name, point_1) => fetch(ADD_TEST, title, description, category_id, result_1, result_2, result_3, result_4, result_5, result_6, image_url, image_name, point_1)
const updateTest = (id, title, description, category_id, result_1, result_2, result_3, result_4, result_5, result_6, image_url, image_name) => fetch(UPDATE_TEST, id, title, description, category_id, result_1, result_2, result_3, result_4, result_5, result_6, image_url, image_name)
const deleteTest = (id) => fetch(DELETE_TEST, id)

module.exports = {
    testAll,
    tests,
    testByid,
    testByCategoryId,
    testLimitNextByTitle,
    testLimitPrevByTitle,
    testLimitNext,
    testLimitPrev,
    addTest,
    updateTest,
    deleteTest
}