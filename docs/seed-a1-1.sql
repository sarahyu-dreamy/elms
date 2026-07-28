-- A1.1 교육과정 원안 적재
-- lib/seed/a1-1.ts 에서 생성된 SQL 입니다.
-- 이 파일을 직접 고치지 말고 원본 TS 를 고친 뒤 다시 생성하세요.
--
-- 먼저 docs/tables.sql 로 units / can_do_statements 테이블을 만들어야 합니다.
-- 두 번 실행하면 중복 적재되니 한 번만 실행하세요.

begin;

insert into app_6.units
  (level_code, order_index, title, title_ko, theme, weeks, overview, is_published)
values
  ('A1.1', 1, 'Hello!', '인사와 이름', '만남', 1, '문법: be동사 (I am / You are), 인칭대명사 주격 I·you, 알파벳 대소문자
대표 어휘: hello, hi, good morning, good afternoon, goodbye, name, nice, meet, teacher, student, friend
신규 어휘 17개', true),
  ('A1.1', 2, 'Numbers & Age', '숫자와 나이', '나', 1, '문법: How old are you? / I am ~ years old, 숫자 1–20, be동사 의문문 기초
대표 어휘: one, two, three, ten, twenty, age, old, how, year, birthday, number
신규 어휘 17개', true),
  ('A1.1', 3, 'My Family', '우리 가족', '가족', 1, '문법: this / that, 소유격 my·your·his·her, be동사 3인칭 (He is / She is)
대표 어휘: father, mother, brother, sister, grandfather, grandmother, family, baby, tall, kind
신규 어휘 17개', true),
  ('A1.1', 4, 'My Things', '내 물건', '사물', 1, '문법: 명사 복수형, 관사 a / an, What’s this?
대표 어휘: pen, pencil, book, notebook, eraser, ruler, bag, desk, chair, key
신규 어휘 17개', true),
  ('A1.1', 5, 'Colors & Shapes', '색깔과 모양', '묘사', 1, '문법: 형용사 + 명사 어순, It is + 형용사, 형용사 나열
대표 어휘: red, blue, yellow, green, black, white, circle, square, big, small, long
신규 어휘 17개', true),
  ('A1.1', 6, 'My Classroom', '우리 교실', '학교', 1, '문법: There is / There are, some / many 기초
대표 어휘: classroom, board, window, door, clock, map, picture, computer, wall, floor
신규 어휘 17개', true),
  ('A1.1', 7, 'Review 1', '중간 통합', '복습·점검', 1, '문법: 1–6단원 통합
통합·복습 단원 (신규 어휘 없음)', true),
  ('A1.1', 8, 'Where Is It?', '어디에 있나요', '위치', 1, '문법: 장소 전치사 in / on / under / next to, Where is ~?
대표 어휘: in, on, under, next to, behind, room, table, bed, kitchen, where
신규 어휘 17개', true),
  ('A1.1', 9, 'Food I Like', '좋아하는 음식', '음식', 1, '문법: 일반동사 현재형 긍정·부정 (I like / I don’t like)
대표 어휘: rice, bread, milk, water, juice, apple, egg, meat, fish, cake
신규 어휘 17개', true),
  ('A1.1', 10, 'Animals', '동물', '동물', 1, '문법: 일반동사 의문문 Do you like ~?, Yes, I do. / No, I don’t.
대표 어휘: dog, cat, bird, rabbit, horse, lion, tiger, elephant, monkey, pet
신규 어휘 17개', true),
  ('A1.1', 11, 'My Day', '하루 일과', '일상', 1, '문법: 현재시제 일과 표현, 시각 말하기 (at seven), 시간 전치사 at
대표 어휘: get up, wash, eat, go, study, play, sleep, morning, evening, o’clock
신규 어휘 17개', true),
  ('A1.1', 12, 'Can You?', '할 수 있는 것', '능력', 1, '문법: can / can’t, Can you ~? 의문문
대표 어휘: swim, ride, sing, dance, draw, cook, read, write, speak, well
신규 어휘 16개', true),
  ('A1.1', 13, 'My Friends', '내 친구', '관계', 1, '문법: 3인칭 단수 현재형 (He likes / She has), 인물 묘사 형용사
대표 어휘: friend, classmate, funny, smart, quiet, have, has, together, best, know
신규 어휘 14개', true),
  ('A1.1', 14, 'About Me', '나를 소개해요', '통합·발표', 1, '문법: 1–13단원 통합
통합·복습 단원 (신규 어휘 없음)', true);

insert into app_6.can_do_statements (unit_id, skill, statement_ko, order_index)
select u.id, v.skill, v.statement, v.ord
from (values
  (1, 'listening', '아침·점심·저녁 인사말을 듣고 언제 쓰는 인사인지 구별할 수 있다.', 1),
  (1, 'listening', '상대가 또박또박 말하는 이름의 철자를 듣고 받아 적을 수 있다.', 2),
  (1, 'reading', '이름표에 적힌 이름을 소리 내어 읽을 수 있다.', 3),
  (1, 'reading', '인사말이 적힌 문장을 읽고 알맞은 상황 그림과 연결할 수 있다.', 4),
  (1, 'speaking', '시간대에 맞는 인사말로 먼저 인사할 수 있다.', 5),
  (1, 'speaking', '이름을 묻고 답할 수 있다. (What’s your name? — My name is ~)', 6),
  (1, 'writing', '자기 이름을 알파벳 대소문자로 바르게 쓸 수 있다.', 7),
  (1, 'writing', 'My name is ~ 문장을 첫 글자 대문자와 마침표를 지켜 쓸 수 있다.', 8),
  (2, 'listening', '1–20 사이의 숫자를 듣고 아라비아 숫자로 받아 적을 수 있다.', 1),
  (2, 'listening', '나이를 말하는 문장을 듣고 몇 살인지 알 수 있다.', 2),
  (2, 'reading', '숫자 단어(one, two …)를 읽고 아라비아 숫자와 연결할 수 있다.', 3),
  (2, 'reading', '이름과 나이가 적힌 소개 카드를 읽고 정보를 찾을 수 있다.', 4),
  (2, 'speaking', '나이를 묻고 답할 수 있다.', 5),
  (2, 'speaking', '전화번호를 한 자리씩 또박또박 말할 수 있다.', 6),
  (2, 'writing', '1–20을 영어 단어로 쓸 수 있다.', 7),
  (2, 'writing', 'I am ~ years old. 문장을 쓸 수 있다.', 8),
  (3, 'listening', '가족 호칭을 듣고 가계도에서 해당 인물을 찾을 수 있다.', 1),
  (3, 'listening', '가족을 소개하는 말을 듣고 가족이 몇 명인지 셀 수 있다.', 2),
  (3, 'reading', '가족 소개 글을 읽고 인물과 관계를 연결할 수 있다.', 3),
  (3, 'reading', 'his 와 her 를 구별해 누구의 것인지 파악할 수 있다.', 4),
  (3, 'speaking', '사진을 보며 This is my ~ 로 가족을 소개할 수 있다.', 5),
  (3, 'speaking', '가족 구성원을 세 명 이상 이어서 소개할 수 있다.', 6),
  (3, 'writing', 'He is / She is 를 구별해 가족 소개 문장을 쓸 수 있다.', 7),
  (3, 'writing', '가족을 소개하는 문장 세 개를 이어서 쓸 수 있다.', 8),
  (4, 'listening', '물건 이름을 듣고 여러 그림 중에서 고를 수 있다.', 1),
  (4, 'listening', '단수와 복수를 듣고 한 개인지 여러 개인지 구별할 수 있다.', 2),
  (4, 'reading', '물건 목록을 읽고 각각 몇 개인지 파악할 수 있다.', 3),
  (4, 'reading', 'a 와 an 이 알맞게 쓰였는지 찾아낼 수 있다.', 4),
  (4, 'speaking', '물건을 가리키며 What’s this? 로 묻고 답할 수 있다.', 5),
  (4, 'speaking', '자기 가방 속 물건을 세 가지 이상 말할 수 있다.', 6),
  (4, 'writing', '명사의 복수형을 규칙에 맞게 쓸 수 있다.', 7),
  (4, 'writing', 'It’s a ~ / They are ~ 문장을 구별해 쓸 수 있다.', 8),
  (5, 'listening', '색깔 이름을 듣고 해당 색을 고를 수 있다.', 1),
  (5, 'listening', '색과 크기를 함께 설명하는 말을 듣고 알맞은 그림을 찾을 수 있다.', 2),
  (5, 'reading', '색깔·모양 단어를 읽고 그림과 연결할 수 있다.', 3),
  (5, 'reading', '사물을 묘사한 짧은 문장을 읽고 알맞은 그림을 고를 수 있다.', 4),
  (5, 'speaking', '사물의 색과 크기를 함께 말할 수 있다. (It’s a big red ball.)', 5),
  (5, 'speaking', '좋아하는 색을 말하고 그 색의 물건을 하나 들 수 있다.', 6),
  (5, 'writing', '형용사와 명사의 순서를 지켜 문장을 쓸 수 있다.', 7),
  (5, 'writing', '사물 두 개를 색과 크기로 묘사하는 문장을 쓸 수 있다.', 8),
  (6, 'listening', '교실 사물의 이름을 듣고 교실에서 찾을 수 있다.', 1),
  (6, 'listening', 'There is 와 There are 를 듣고 하나인지 여럿인지 구별할 수 있다.', 2),
  (6, 'reading', '교실을 설명한 글을 읽고 없는 물건을 찾아낼 수 있다.', 3),
  (6, 'reading', 'There is/are 문장을 읽고 사물의 개수를 파악할 수 있다.', 4),
  (6, 'speaking', '교실에 무엇이 있는지 There is/are 로 말할 수 있다.', 5),
  (6, 'speaking', '교실 사물 다섯 가지를 이어서 말할 수 있다.', 6),
  (6, 'writing', 'There is 와 There are 를 구별해 쓸 수 있다.', 7),
  (6, 'writing', '교실을 설명하는 문장 세 개를 쓸 수 있다.', 8),
  (7, 'listening', '1–6단원 표현이 섞인 짧은 대화를 듣고 이름·나이·물건을 파악할 수 있다.', 1),
  (7, 'listening', '들은 정보를 표에 나누어 정리할 수 있다.', 2),
  (7, 'reading', '배운 어휘로 쓰인 짧은 소개 글을 읽고 내용을 파악할 수 있다.', 3),
  (7, 'reading', '글을 읽고 주어진 문장의 참·거짓을 판단할 수 있다.', 4),
  (7, 'speaking', '이름·나이·가족·물건을 섞어 자기를 소개할 수 있다.', 5),
  (7, 'speaking', '짝에게 배운 표현으로 세 가지 이상 질문할 수 있다.', 6),
  (7, 'writing', '배운 문형으로 자기소개 문장 다섯 개를 쓸 수 있다.', 7),
  (7, 'writing', '첫 글자 대문자와 마침표를 지켜 쓸 수 있다.', 8),
  (8, 'listening', '위치를 설명하는 말을 듣고 물건을 찾을 수 있다.', 1),
  (8, 'listening', '전치사를 듣고 알맞은 위치의 그림을 고를 수 있다.', 2),
  (8, 'reading', '위치를 나타낸 문장을 읽고 그림과 연결할 수 있다.', 3),
  (8, 'reading', '방을 설명한 글을 읽고 각 물건이 어디 있는지 파악할 수 있다.', 4),
  (8, 'speaking', '물건의 위치를 묻고 답할 수 있다.', 5),
  (8, 'speaking', '자기 방에 무엇이 어디 있는지 세 가지 이상 말할 수 있다.', 6),
  (8, 'writing', '전치사를 써서 위치를 나타내는 문장을 쓸 수 있다.', 7),
  (8, 'writing', '그림을 보고 위치를 설명하는 문장 세 개를 쓸 수 있다.', 8),
  (9, 'listening', '음식 이름을 듣고 그림에서 고를 수 있다.', 1),
  (9, 'listening', '좋아함과 싫어함을 나타내는 말을 듣고 구별할 수 있다.', 2),
  (9, 'reading', '음식 이름을 읽고 종류별로 분류할 수 있다.', 3),
  (9, 'reading', '좋아하는 음식을 소개한 글에서 원하는 정보를 찾을 수 있다.', 4),
  (9, 'speaking', '좋아하는 음식과 싫어하는 음식을 말할 수 있다.', 5),
  (9, 'speaking', '짝에게 좋아하는 음식을 묻고 답할 수 있다.', 6),
  (9, 'writing', 'I like / I don’t like 문장을 쓸 수 있다.', 7),
  (9, 'writing', '좋아하는 음식 세 가지를 문장으로 쓸 수 있다.', 8),
  (10, 'listening', '동물 이름을 듣고 그림에서 고를 수 있다.', 1),
  (10, 'listening', 'Do you like ~? 질문과 대답을 듣고 좋아하는지 알 수 있다.', 2),
  (10, 'reading', '동물을 묘사한 짧은 글을 읽고 어떤 동물인지 맞힐 수 있다.', 3),
  (10, 'reading', '질문과 대답을 읽고 알맞게 짝지을 수 있다.', 4),
  (10, 'speaking', 'Do you like ~? 로 묻고 Yes/No 로 답할 수 있다.', 5),
  (10, 'speaking', '좋아하는 동물을 색과 크기를 넣어 소개할 수 있다.', 6),
  (10, 'writing', 'Do you like ~? 형태의 의문문을 쓸 수 있다.', 7),
  (10, 'writing', '좋아하는 동물을 소개하는 문장 세 개를 쓸 수 있다.', 8),
  (11, 'listening', '시각을 듣고 시계 그림과 연결할 수 있다.', 1),
  (11, 'listening', '하루 일과를 듣고 일어난 순서대로 정리할 수 있다.', 2),
  (11, 'reading', '일과표를 읽고 시간과 활동을 연결할 수 있다.', 3),
  (11, 'reading', '하루를 설명한 글을 읽고 순서를 파악할 수 있다.', 4),
  (11, 'speaking', '자기 하루 일과를 시간과 함께 세 가지 이상 말할 수 있다.', 5),
  (11, 'speaking', '몇 시에 무엇을 하는지 묻고 답할 수 있다.', 6),
  (11, 'writing', 'I get up at seven. 같은 시각 표현 문장을 쓸 수 있다.', 7),
  (11, 'writing', '자기 하루를 네 문장으로 순서대로 쓸 수 있다.', 8),
  (12, 'listening', 'can 과 can’t 를 듣고 구별할 수 있다.', 1),
  (12, 'listening', '누가 무엇을 할 수 있는지 듣고 표에 표시할 수 있다.', 2),
  (12, 'reading', 'can 문장을 읽고 가능한지 아닌지 판단할 수 있다.', 3),
  (12, 'reading', '인물 소개 글을 읽고 그 사람이 할 수 있는 일을 찾을 수 있다.', 4),
  (12, 'speaking', '자기가 할 수 있는 것과 할 수 없는 것을 말할 수 있다.', 5),
  (12, 'speaking', 'Can you ~? 로 묻고 답할 수 있다.', 6),
  (12, 'writing', 'can 과 can’t 문장을 구별해 쓸 수 있다.', 7),
  (12, 'writing', '자기가 할 수 있는 일 세 가지를 문장으로 쓸 수 있다.', 8),
  (13, 'listening', '친구를 소개하는 말을 듣고 그 친구의 특징을 파악할 수 있다.', 1),
  (13, 'listening', 'He 와 She 를 듣고 누구를 가리키는지 알 수 있다.', 2),
  (13, 'reading', '친구 소개 글을 읽고 인물의 특징을 정리할 수 있다.', 3),
  (13, 'reading', '3인칭 단수 문장을 읽고 누구에 대한 이야기인지 찾을 수 있다.', 4),
  (13, 'speaking', '친구를 이름·나이·좋아하는 것과 함께 소개할 수 있다.', 5),
  (13, 'speaking', 'He likes ~ / She has ~ 형태로 말할 수 있다.', 6),
  (13, 'writing', '3인칭 단수에 -s 를 붙여 문장을 쓸 수 있다.', 7),
  (13, 'writing', '친구를 소개하는 문장 네 개를 쓸 수 있다.', 8),
  (14, 'listening', '또래의 자기소개 발표를 듣고 핵심 정보를 파악할 수 있다.', 1),
  (14, 'listening', '발표를 듣고 그 사람에게 물어볼 질문 한 가지를 만들 수 있다.', 2),
  (14, 'reading', '자기소개 글을 읽고 인물 정보를 표로 정리할 수 있다.', 3),
  (14, 'reading', '여러 사람의 소개 글을 읽고 공통점을 찾을 수 있다.', 4),
  (14, 'speaking', '자기소개를 이어진 3–4문장으로 할 수 있다.', 5),
  (14, 'speaking', '발표 후 간단한 질문에 답할 수 있다.', 6),
  (14, 'writing', '자기소개 글을 다섯 문장 이상으로 쓸 수 있다.', 7),
  (14, 'writing', '대문자·마침표·띄어쓰기를 지켜 글을 쓸 수 있다.', 8)
) as v(unit_order, skill, statement, ord)
join app_6.units u
  on u.level_code = 'A1.1' and u.order_index = v.unit_order;

commit;
