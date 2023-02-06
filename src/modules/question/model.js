const { fetch, fetchALL } = require("../../lib/postgres");

const QUESTIONS = `
    SELECT
        *, to_char(test_question_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        test_questions
    ORDER BY    
        test_question_id DESC
    LIMIT 50;  
`;

const ALL_QUESTIONS = `
    SELECT
        *, to_char(test_question_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        test_questions
    ORDER BY    
        test_question_id DESC;  
`;

const QUESTION_BY_ID = `
    SELECT
        *, to_char(test_question_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        test_questions
    WHERE
        test_question_id = $1
    ORDER BY    
        test_question_id DESC;  
`;

const QUESTION_LIMIT_NEXT_BY_TITLE = `
    SELECT
        *, to_char(test_question_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        test_questions
    WHERE
        test_question_id < $1 test_question_text ILIKE $2
    ORDER BY    
        test_question_id DESC
    LIMIT 50;  
`;

const QUESTION_LIMIT_PREV_BY_TITLE = `
    SELECT
        *, to_char(test_question_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        test_questions
    WHERE
        test_question_id > $1 test_question_text ILIKE $2
    ORDER BY    
        test_question_id DESC
    LIMIT 50;  
`;

const QUESTION_LIMIT_NEXT = `
    SELECT
        *, to_char(test_question_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        test_questions
    WHERE
        test_question_id < $1
    ORDER BY    
        test_question_id DESC
    LIMIT 50;  
`;

const QUESTION_LIMIT_PREV = `
    SELECT
        *, to_char(test_question_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        test_questions
    WHERE
        test_question_id > $1
    ORDER BY    
        test_question_id DESC
    LIMIT 50;  
`;

const QUESTION_BY_TEST_ID = `
    SELECT
        *, to_char(test_question_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        test_questions
    WHERE
        test_id = $1
    ORDER BY    
        test_question_id DESC;  
`;

const ADD_QUESTION = `
    INSERT INTO
        test_questions (
            test_question_text,
            test_id,
            test_answer_1,
            test_answer_2,
            test_answer_3,
            test_answer_4,
            test_answer_5,
            test_answer_6,
            question_img_url,
            question_img_name
            )
        VALUES  
            (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9,
                $10
            ) RETURNING *;
`;

const UPDATE_QUESTION = `
    UPDATE
        test_questions
    SET
        test_question_text = $2,
        test_id = $3,
        test_answer_1 = $4,
        test_answer_2 = $5,
        test_answer_3 = $6,
        test_answer_4 = $7,
        test_answer_5 = $8,
        test_answer_6 = $9,
        question_img_url = $10,
        question_img_name = $11
    WHERE
        test_question_id = $1 RETURNING * ;
`;

const DELETE_QUESTION = `
    DELETE FROM
        test_questions
    WHERE
        test_question_id = $1
    RETURNING *;
`;

const questionAll = () => fetchALL(ALL_QUESTIONS)
const question = () => fetchALL(QUESTIONS)
const questionById = (id) => fetch(QUESTION_BY_ID, id)
const questionLimitNextByTitle = (id, title) => fetchALL(QUESTION_LIMIT_NEXT_BY_TITLE, id, title)
const questionLimitPrevByTitle = (id, title) => fetchALL(QUESTION_LIMIT_PREV_BY_TITLE, id, title)
const questionLimitNext = (id) => fetchALL(QUESTION_LIMIT_NEXT, id)
const questionLimitPrev = (id) => fetchALL(QUESTION_LIMIT_PREV, id)
const questionByTestId = (testId) => fetchALL(QUESTION_BY_TEST_ID, testId)
const addQuestion = (title, testId, answer_1, answer_2, answer_3, answer_4, answer_5, answer_6, image_url, image_name) => fetch(ADD_QUESTION, title, testId, answer_1, answer_2, answer_3, answer_4, answer_5, answer_6, image_url, image_name)
const updateQuestion = (id, title, testId, answer_1, answer_2, answer_3, answer_4, answer_5, answer_6, image_url, image_name) => fetch(UPDATE_QUESTION, id, title, testId, answer_1, answer_2, answer_3, answer_4, answer_5, answer_6, image_url, image_name)
const deleteQuestion = (id) => fetch(DELETE_QUESTION, id)

module.exports = {
    questionAll,
    question,
    questionById,
    questionLimitNextByTitle,
    questionLimitPrevByTitle,
    questionLimitNext,
    questionLimitPrev,
    questionByTestId,
    addQuestion,
    updateQuestion,
    deleteQuestion
}