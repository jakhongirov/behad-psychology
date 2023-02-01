CREATE TABLE test_categories (
    test_category_id bigserial PRIMARY KEY,
    test_category_title text not null,
    test_category_img_url text,
    test_category_img_name text,
    test_category_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tests (
    test_id bigserial PRIMARY KEY,
    test_title text not null,
    test_description text not null,
    test_category_id int not null REFERENCES test_categories(test_category_id) ON DELETE CASCADE,
    test_result_1 json NOT NULL,
    test_result_2 json NOT NULL,
    test_result_3 json,
    test_result_4 json,
    test_result_5 json,
    test_result_6 json,
    test_img_url text DEFAULT '',
    test_img_name text DEFAULT '',
    test_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE test_questions (
    test_question_id bigserial PRIMARY KEY,
    test_question_text text not null,
    test_id int not null REFERENCES tests(test_id) ON DELETE CASCADE,
    test_answer_1 json NOT NULL,
    test_answer_2 json NOT NULL,
    test_answer_3 json,
    test_answer_4 json,
    test_answer_5 json,
    test_answer_6 json,
    test_question_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);