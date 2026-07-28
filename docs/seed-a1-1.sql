-- A1.1 교육과정 원안 적재
--
-- lib/seed/a1-1.ts 에서 생성된 SQL 입니다.
-- 이 파일을 직접 고치지 말고 원본 TS 를 고친 뒤 다시 생성하세요.
--
-- 사전 조건: docs/tables.sql 로 units · can_do_statements · grammar_points ·
--            lexical_items 테이블이 만들어져 있어야 합니다.
--
-- 두 번 실행하면 중복 적재됩니다. 한 번만 실행하세요.

begin;

-- 1. 단원 14개
insert into app_6.units
  (level_code, order_index, title, title_ko, theme, weeks, overview, is_published)
values
  ('A1.1', 1, 'Hello!', '인사와 이름', '만남', 1, '문법: be동사 (I am / You are), 인칭대명사 주격 I · you, 알파벳 대소문자
신규 어휘 12개', true),
  ('A1.1', 2, 'Numbers & Age', '숫자와 나이', '나', 1, '문법: 숫자 1–20, How old are you? / I am ~ years old
신규 어휘 13개', true),
  ('A1.1', 3, 'My Family', '우리 가족', '가족', 1, '문법: this / that, 소유격 my · your · his · her, be동사 3인칭 (He is / She is)
신규 어휘 14개', true),
  ('A1.1', 4, 'My Things', '내 물건', '사물', 1, '문법: 명사 복수형, 관사 a / an, What’s this? / It’s a ~
신규 어휘 15개', true),
  ('A1.1', 5, 'Colors & Shapes', '색깔과 모양', '묘사', 1, '문법: 형용사 + 명사 어순, It is + 형용사
신규 어휘 16개', true),
  ('A1.1', 6, 'My Classroom', '우리 교실', '학교', 1, '문법: There is / There are, some / many
신규 어휘 17개', true),
  ('A1.1', 7, 'Review 1', '중간 통합', '복습·점검', 1, '문법: 1–6단원 통합
통합·복습 단원 (신규 어휘 없음)', true),
  ('A1.1', 8, 'Where Is It?', '어디에 있나요', '위치', 1, '문법: 장소 전치사 in / on / under / next to, Where is ~?
신규 어휘 17개', true),
  ('A1.1', 9, 'Food I Like', '좋아하는 음식', '음식', 1, '문법: 일반동사 현재형 긍정 (I like ~), 일반동사 부정 (I don’t like ~)
신규 어휘 18개', true),
  ('A1.1', 10, 'Animals', '동물', '동물', 1, '문법: 일반동사 의문문 (Do you like ~?), Yes, I do. / No, I don’t.
신규 어휘 18개', true),
  ('A1.1', 11, 'My Day', '하루 일과', '일상', 1, '문법: 현재시제 일과 표현, 시각 말하기 (at seven / o’clock), 시간 전치사 at
신규 어휘 19개', true),
  ('A1.1', 12, 'Can You?', '할 수 있는 것', '능력', 1, '문법: can / can’t, Can you ~? 의문문
신규 어휘 20개', true),
  ('A1.1', 13, 'My Friends', '내 친구', '관계', 1, '문법: 3인칭 단수 현재형 (He likes / She has), 인물 묘사 형용사
신규 어휘 21개', true),
  ('A1.1', 14, 'About Me', '나를 소개해요', '통합·발표', 1, '문법: 1–13단원 통합
통합·복습 단원 (신규 어휘 없음)', true);

-- 2. 성취기준
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
  (5, 'speaking', '사물의 색과 크기를 함께 말할 수 있다. (It’s a big red bag.)', 5),
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

-- 3. 문법 항목 (설명 포함)
insert into app_6.grammar_points
  (unit_id, title, can_do, explanation_md, cefr_level, order_index, is_published)
select u.id, v.title, v.can_do, v.explanation, 'A1', v.ord, true
from (values
  (1, 'be동사 (I am / You are)', '자기를 소개하는 문장을 만들 수 있다.', 10),
  (1, '인칭대명사 주격 I · you', '나와 상대를 가리켜 말할 수 있다.', 11),
  (1, '알파벳 대소문자', '이름을 바르게 표기할 수 있다.', 12),
  (2, '숫자 1–20', '스무 개까지 수를 세어 말할 수 있다.', 20),
  (2, 'How old are you? / I am ~ years old', '나이를 묻고 답할 수 있다.', 21),
  (3, 'this / that', '가까운 것과 먼 것을 가리켜 말할 수 있다.', 30),
  (3, '소유격 my · your · his · her', '누구의 것인지 밝혀 말할 수 있다.', 31),
  (3, 'be동사 3인칭 (He is / She is)', '제3자를 소개할 수 있다.', 32),
  (4, '명사 복수형', '하나와 여럿을 구별해 말할 수 있다.', 40),
  (4, '관사 a / an', '셀 수 있는 명사 앞에 관사를 붙여 말할 수 있다.', 41),
  (4, 'What’s this? / It’s a ~', '사물의 이름을 묻고 답할 수 있다.', 42),
  (5, '형용사 + 명사 어순', '사물을 꾸며 말할 수 있다.', 50),
  (5, 'It is + 형용사', '사물의 성질을 말할 수 있다.', 51),
  (6, 'There is / There are', '무엇이 있는지 말할 수 있다.', 60),
  (6, 'some / many', '막연한 수량을 말할 수 있다.', 61),
  (7, '1–6단원 통합', '배운 문형을 섞어 자기를 소개할 수 있다.', 70),
  (8, '장소 전치사 in / on / under / next to', '위치를 나타내어 말할 수 있다.', 80),
  (8, 'Where is ~?', '물건이 어디 있는지 물을 수 있다.', 81),
  (9, '일반동사 현재형 긍정 (I like ~)', '좋아하는 것을 말할 수 있다.', 90),
  (9, '일반동사 부정 (I don’t like ~)', '싫어하는 것을 말할 수 있다.', 91),
  (10, '일반동사 의문문 (Do you like ~?)', '상대의 취향을 물을 수 있다.', 100),
  (10, 'Yes, I do. / No, I don’t.', '짧은 대답으로 응답할 수 있다.', 101),
  (11, '현재시제 일과 표현', '반복되는 일상을 말할 수 있다.', 110),
  (11, '시각 말하기 (at seven / o’clock)', '몇 시에 하는지 말할 수 있다.', 111),
  (11, '시간 전치사 at', '시각을 문장에 넣을 수 있다.', 112),
  (12, 'can / can’t', '할 수 있는 일과 없는 일을 말할 수 있다.', 120),
  (12, 'Can you ~? 의문문', '상대가 할 수 있는지 물을 수 있다.', 121),
  (13, '3인칭 단수 현재형 (He likes / She has)', '제3자의 행동과 취향을 말할 수 있다.', 130),
  (13, '인물 묘사 형용사', '사람의 성격을 말할 수 있다.', 131),
  (14, '1–13단원 통합', '배운 것을 모두 이어 자기소개를 완성할 수 있다.', 140)
) as v(unit_order, title, can_do, explanation, ord)
join app_6.units u
  on u.level_code = 'A1.1' and u.order_index = v.unit_order;

-- 4. 어휘 (예문 포함)
insert into app_6.lexical_items
  (unit_id, headword, meaning_ko, pos, item_type, example_en, example_ko, cefr_level, is_published)
select u.id, v.headword, v.meaning_ko, v.pos, v.item_type, v.example_en, v.example_ko,
       'A1', true
from (values
  (1, 'hello', '안녕하세요', 'phrase', 'idiom', 'Hello, I am Mina.', '안녕하세요, 저는 미나예요.'),
  (1, 'hi', '안녕', 'phrase', 'idiom', 'Hi! Nice to meet you.', '안녕! 만나서 반가워.'),
  (1, 'good morning', '좋은 아침', 'phrase', 'collocation', 'Good morning, teacher.', '안녕하세요, 선생님. (아침 인사)'),
  (1, 'good afternoon', '안녕하세요 (오후 인사)', 'phrase', 'collocation', 'Good afternoon, Jun.', '안녕, 준. (오후 인사)'),
  (1, 'good evening', '안녕하세요 (저녁 인사)', 'phrase', 'collocation', 'Good evening!', '안녕하세요! (저녁 인사)'),
  (1, 'goodbye', '안녕히 가세요', 'phrase', 'idiom', 'Goodbye, teacher.', '안녕히 계세요, 선생님.'),
  (1, 'name', '이름', 'noun', 'word', 'My name is Jun.', '제 이름은 준이에요.'),
  (1, 'nice', '좋은, 반가운', 'adjective', 'word', 'Nice to meet you.', '만나서 반가워요.'),
  (1, 'meet', '만나다', 'verb', 'word', 'I meet my teacher.', '저는 선생님을 만나요.'),
  (1, 'teacher', '선생님', 'noun', 'word', 'You are my teacher.', '당신은 제 선생님이에요.'),
  (1, 'student', '학생', 'noun', 'word', 'I am a student.', '저는 학생이에요.'),
  (1, 'please', '부탁합니다', 'adverb', 'word', 'Your name, please.', '이름을 말해 주세요.'),
  (2, 'one', '하나', 'noun', 'word', 'one student', '학생 한 명'),
  (2, 'two', '둘', 'noun', 'word', 'two teachers', '선생님 두 분'),
  (2, 'three', '셋', 'noun', 'word', 'three students', '학생 세 명'),
  (2, 'four', '넷', 'noun', 'word', 'I am four years old.', '저는 네 살이에요.'),
  (2, 'five', '다섯', 'noun', 'word', 'five students', '학생 다섯 명'),
  (2, 'six', '여섯', 'noun', 'word', 'I am six years old.', '저는 여섯 살이에요.'),
  (2, 'seven', '일곱', 'noun', 'word', 'I am seven years old.', '저는 일곱 살이에요.'),
  (2, 'eight', '여덟', 'noun', 'word', 'eight students', '학생 여덟 명'),
  (2, 'nine', '아홉', 'noun', 'word', 'She is nine years old.', '그 애는 아홉 살이에요.'),
  (2, 'ten', '열', 'noun', 'word', 'I am ten years old.', '저는 열 살이에요.'),
  (2, 'old', '나이가 ~인, 오래된', 'adjective', 'word', 'How old are you?', '몇 살이에요?'),
  (2, 'year', '해, 년', 'noun', 'word', 'I am ten years old.', '저는 열 살이에요.'),
  (2, 'birthday', '생일', 'noun', 'word', 'It is my birthday.', '제 생일이에요.'),
  (3, 'father', '아버지', 'noun', 'word', 'My father is tall.', '우리 아빠는 키가 커요.'),
  (3, 'mother', '어머니', 'noun', 'word', 'My mother is kind.', '우리 엄마는 친절해요.'),
  (3, 'brother', '형, 오빠, 남동생', 'noun', 'word', 'This is my brother.', '이 애는 제 동생이에요.'),
  (3, 'sister', '누나, 언니, 여동생', 'noun', 'word', 'Her sister is nine.', '그 애 여동생은 아홉 살이에요.'),
  (3, 'grandfather', '할아버지', 'noun', 'word', 'My grandfather is old.', '우리 할아버지는 연세가 많으세요.'),
  (3, 'grandmother', '할머니', 'noun', 'word', 'That is my grandmother.', '저분은 우리 할머니예요.'),
  (3, 'parents', '부모님', 'noun', 'word', 'My parents are teachers.', '우리 부모님은 선생님이세요.'),
  (3, 'family', '가족', 'noun', 'word', 'I love my family.', '저는 우리 가족을 사랑해요.'),
  (3, 'baby', '아기', 'noun', 'word', 'The baby is my sister.', '그 아기는 제 여동생이에요.'),
  (3, 'tall', '키가 큰', 'adjective', 'word', 'He is tall.', '그는 키가 커요.'),
  (3, 'kind', '친절한', 'adjective', 'word', 'She is kind.', '그녀는 친절해요.'),
  (3, 'this', '이것, 이 사람', 'pronoun', 'word', 'This is my mother.', '이분은 우리 엄마예요.'),
  (3, 'that', '저것, 저 사람', 'pronoun', 'word', 'That is my father.', '저분은 우리 아빠예요.'),
  (3, 'love', '사랑하다', 'verb', 'word', 'I love my parents.', '저는 부모님을 사랑해요.'),
  (4, 'pen', '펜', 'noun', 'word', 'I have a pen.', '저는 펜이 있어요.'),
  (4, 'pencil', '연필', 'noun', 'word', 'This is my pencil.', '이건 제 연필이에요.'),
  (4, 'book', '책', 'noun', 'word', 'I have two books.', '저는 책이 두 권 있어요.'),
  (4, 'notebook', '공책', 'noun', 'word', 'This is my notebook.', '이건 제 공책이에요.'),
  (4, 'eraser', '지우개', 'noun', 'word', 'I have an eraser.', '저는 지우개가 있어요.'),
  (4, 'ruler', '자', 'noun', 'word', 'That is a ruler.', '저건 자예요.'),
  (4, 'bag', '가방', 'noun', 'word', 'This is my bag.', '이건 제 가방이에요.'),
  (4, 'desk', '책상', 'noun', 'word', 'I have a desk.', '저는 책상이 있어요.'),
  (4, 'chair', '의자', 'noun', 'word', 'This is my chair.', '이건 제 의자예요.'),
  (4, 'key', '열쇠', 'noun', 'word', 'I have a key.', '저는 열쇠가 있어요.'),
  (4, 'cup', '컵', 'noun', 'word', 'That is a cup.', '저건 컵이에요.'),
  (4, 'box', '상자', 'noun', 'word', 'I have two boxes.', '저는 상자가 두 개 있어요.'),
  (4, 'thing', '물건, 것', 'noun', 'word', 'What is this thing?', '이 물건은 뭐예요?'),
  (4, 'have', '가지다', 'verb', 'word', 'I have three pens.', '저는 펜이 세 자루 있어요.'),
  (4, 'my', '나의', 'determiner', 'word', 'This is my book.', '이건 제 책이에요.'),
  (5, 'red', '빨강', 'adjective', 'word', 'I have a red pen.', '저는 빨간 펜이 있어요.'),
  (5, 'blue', '파랑', 'adjective', 'word', 'My bag is blue.', '제 가방은 파란색이에요.'),
  (5, 'yellow', '노랑', 'adjective', 'word', 'The pencil is yellow.', '그 연필은 노란색이에요.'),
  (5, 'green', '초록', 'adjective', 'word', 'My bag is green.', '제 가방은 초록색이에요.'),
  (5, 'black', '검정', 'adjective', 'word', 'My chair is black.', '제 의자는 검은색이에요.'),
  (5, 'white', '하양', 'adjective', 'word', 'My notebook is white.', '제 공책은 하얀색이에요.'),
  (5, 'orange', '주황', 'adjective', 'word', 'I have an orange cup.', '저는 주황색 컵이 있어요.'),
  (5, 'pink', '분홍', 'adjective', 'word', 'Her bag is pink.', '그 애 가방은 분홍색이에요.'),
  (5, 'brown', '갈색', 'adjective', 'word', 'The desk is brown.', '그 책상은 갈색이에요.'),
  (5, 'circle', '원', 'noun', 'word', 'This is a circle.', '이건 원이에요.'),
  (5, 'square', '정사각형', 'noun', 'word', 'That is a square.', '저건 정사각형이에요.'),
  (5, 'triangle', '삼각형', 'noun', 'word', 'The triangle is small.', '그 삼각형은 작아요.'),
  (5, 'big', '큰', 'adjective', 'word', 'My bag is big.', '제 가방은 커요.'),
  (5, 'small', '작은', 'adjective', 'word', 'The box is small.', '그 상자는 작아요.'),
  (5, 'long', '긴', 'adjective', 'word', 'This ruler is long.', '이 자는 길어요.'),
  (5, 'color', '색깔', 'noun', 'word', 'What color is it?', '그건 무슨 색이에요?'),
  (6, 'classroom', '교실', 'noun', 'word', 'Our classroom is big.', '우리 교실은 커요.'),
  (6, 'board', '칠판', 'noun', 'word', 'There is a board.', '칠판이 하나 있어요.'),
  (6, 'window', '창문', 'noun', 'word', 'There are two windows.', '창문이 두 개 있어요.'),
  (6, 'door', '문', 'noun', 'word', 'The door is white.', '그 문은 하얀색이에요.'),
  (6, 'clock', '시계', 'noun', 'word', 'There is a clock.', '시계가 하나 있어요.'),
  (6, 'map', '지도', 'noun', 'word', 'There is a map.', '지도가 하나 있어요.'),
  (6, 'picture', '그림, 사진', 'noun', 'word', 'This picture is nice.', '이 그림은 멋져요.'),
  (6, 'computer', '컴퓨터', 'noun', 'word', 'There is a computer.', '컴퓨터가 하나 있어요.'),
  (6, 'wall', '벽', 'noun', 'word', 'The wall is white.', '그 벽은 하얀색이에요.'),
  (6, 'floor', '바닥', 'noun', 'word', 'The floor is brown.', '바닥은 갈색이에요.'),
  (6, 'light', '전등, 빛', 'noun', 'word', 'There are many lights.', '전등이 많이 있어요.'),
  (6, 'school', '학교', 'noun', 'word', 'My school is big.', '우리 학교는 커요.'),
  (6, 'class', '반, 수업', 'noun', 'word', 'My class is small.', '우리 반은 작아요.'),
  (6, 'many', '많은', 'determiner', 'word', 'There are many books.', '책이 많이 있어요.'),
  (6, 'some', '몇몇의', 'determiner', 'word', 'There are some pens.', '펜이 몇 자루 있어요.'),
  (6, 'there', '거기에', 'adverb', 'word', 'There are five chairs.', '의자가 다섯 개 있어요.'),
  (6, 'new', '새로운', 'adjective', 'word', 'My notebook is new.', '제 공책은 새것이에요.'),
  (8, 'in', '~ 안에', 'preposition', 'word', 'The pen is in the bag.', '그 펜은 가방 안에 있어요.'),
  (8, 'on', '~ 위에', 'preposition', 'word', 'The book is on the desk.', '그 책은 책상 위에 있어요.'),
  (8, 'under', '~ 아래에', 'preposition', 'word', 'My bag is under the desk.', '제 가방은 책상 아래에 있어요.'),
  (8, 'next to', '~ 옆에', 'preposition', 'collocation', 'The chair is next to the desk.', '그 의자는 책상 옆에 있어요.'),
  (8, 'behind', '~ 뒤에', 'preposition', 'word', 'The door is behind me.', '문은 제 뒤에 있어요.'),
  (8, 'in front of', '~ 앞에', 'preposition', 'collocation', 'The board is in front of the class.', '칠판은 교실 앞에 있어요.'),
  (8, 'room', '방', 'noun', 'word', 'My room is small.', '제 방은 작아요.'),
  (8, 'table', '탁자', 'noun', 'word', 'The cup is on the table.', '그 컵은 탁자 위에 있어요.'),
  (8, 'bed', '침대', 'noun', 'word', 'My bed is big.', '제 침대는 커요.'),
  (8, 'sofa', '소파', 'noun', 'word', 'The sofa is brown.', '그 소파는 갈색이에요.'),
  (8, 'kitchen', '부엌', 'noun', 'word', 'My mother is in the kitchen.', '우리 엄마는 부엌에 계세요.'),
  (8, 'house', '집', 'noun', 'word', 'Our house is new.', '우리 집은 새집이에요.'),
  (8, 'where', '어디에', 'adverb', 'word', 'Where is my pen?', '제 펜이 어디 있어요?'),
  (8, 'here', '여기에', 'adverb', 'word', 'My book is here.', '제 책은 여기 있어요.'),
  (8, 'put', '놓다', 'verb', 'word', 'Put the pen on the desk.', '펜을 책상 위에 놓으세요.'),
  (8, 'find', '찾다', 'verb', 'word', 'I find my key.', '저는 제 열쇠를 찾아요.'),
  (8, 'look', '보다', 'verb', 'word', 'Look at the board.', '칠판을 보세요.'),
  (9, 'rice', '밥, 쌀', 'noun', 'word', 'I eat rice.', '저는 밥을 먹어요.'),
  (9, 'bread', '빵', 'noun', 'word', 'I like bread.', '저는 빵을 좋아해요.'),
  (9, 'milk', '우유', 'noun', 'word', 'I drink milk.', '저는 우유를 마셔요.'),
  (9, 'water', '물', 'noun', 'word', 'I drink water.', '저는 물을 마셔요.'),
  (9, 'juice', '주스', 'noun', 'word', 'I want juice.', '저는 주스를 원해요.'),
  (9, 'apple', '사과', 'noun', 'word', 'The apple is red.', '그 사과는 빨개요.'),
  (9, 'banana', '바나나', 'noun', 'word', 'I eat a banana.', '저는 바나나를 먹어요.'),
  (9, 'egg', '달걀', 'noun', 'word', 'I like eggs.', '저는 달걀을 좋아해요.'),
  (9, 'meat', '고기', 'noun', 'word', 'I don’t like meat.', '저는 고기를 안 좋아해요.'),
  (9, 'fish', '생선', 'noun', 'word', 'Fish is on the table.', '생선이 탁자 위에 있어요.'),
  (9, 'soup', '국, 수프', 'noun', 'word', 'I eat soup.', '저는 국을 먹어요.'),
  (9, 'cake', '케이크', 'noun', 'word', 'I like cake.', '저는 케이크를 좋아해요.'),
  (9, 'food', '음식', 'noun', 'word', 'Food is on the table.', '음식이 탁자 위에 있어요.'),
  (9, 'eat', '먹다', 'verb', 'word', 'I eat an apple.', '저는 사과를 먹어요.'),
  (9, 'drink', '마시다', 'verb', 'word', 'I drink juice.', '저는 주스를 마셔요.'),
  (9, 'like', '좋아하다', 'verb', 'word', 'I like apples.', '저는 사과를 좋아해요.'),
  (9, 'want', '원하다', 'verb', 'word', 'I want some bread.', '저는 빵을 좀 원해요.'),
  (9, 'hungry', '배고픈', 'adjective', 'word', 'I am hungry.', '저는 배고파요.'),
  (10, 'dog', '개', 'noun', 'word', 'My dog is big.', '우리 개는 커요.'),
  (10, 'cat', '고양이', 'noun', 'word', 'The cat is white.', '그 고양이는 하얀색이에요.'),
  (10, 'bird', '새', 'noun', 'word', 'The bird is small.', '그 새는 작아요.'),
  (10, 'rabbit', '토끼', 'noun', 'word', 'The rabbit is small.', '그 토끼는 작아요.'),
  (10, 'horse', '말', 'noun', 'word', 'The horse is brown.', '그 말은 갈색이에요.'),
  (10, 'cow', '소', 'noun', 'word', 'The cow is big.', '그 소는 커요.'),
  (10, 'pig', '돼지', 'noun', 'word', 'The pig is pink.', '그 돼지는 분홍색이에요.'),
  (10, 'lion', '사자', 'noun', 'word', 'I like lions.', '저는 사자를 좋아해요.'),
  (10, 'tiger', '호랑이', 'noun', 'word', 'I like tigers.', '저는 호랑이를 좋아해요.'),
  (10, 'elephant', '코끼리', 'noun', 'word', 'The elephant is big.', '그 코끼리는 커요.'),
  (10, 'monkey', '원숭이', 'noun', 'word', 'Monkeys jump.', '원숭이들은 뛰어요.'),
  (10, 'animal', '동물', 'noun', 'word', 'I like animals.', '저는 동물을 좋아해요.'),
  (10, 'pet', '반려동물', 'noun', 'word', 'My pet is a cat.', '제 반려동물은 고양이예요.'),
  (10, 'tail', '꼬리', 'noun', 'word', 'The tail is long.', '그 꼬리는 길어요.'),
  (10, 'run', '달리다', 'verb', 'word', 'Horses run.', '말들은 달려요.'),
  (10, 'jump', '뛰다', 'verb', 'word', 'Rabbits jump.', '토끼들은 뛰어요.'),
  (10, 'fly', '날다', 'verb', 'word', 'Birds fly.', '새들은 날아요.'),
  (10, 'cute', '귀여운', 'adjective', 'word', 'The rabbit is cute.', '그 토끼는 귀여워요.'),
  (11, 'get up', '일어나다', 'verb', 'phrasal_verb', 'I get up at seven.', '저는 일곱 시에 일어나요.'),
  (11, 'wash', '씻다', 'verb', 'word', 'I wash my cup.', '저는 제 컵을 씻어요.'),
  (11, 'go', '가다', 'verb', 'word', 'I go to school.', '저는 학교에 가요.'),
  (11, 'come', '오다', 'verb', 'word', 'Come here, please.', '이리 오세요.'),
  (11, 'study', '공부하다', 'verb', 'word', 'I study at home.', '저는 집에서 공부해요.'),
  (11, 'play', '놀다', 'verb', 'word', 'I play in my room.', '저는 제 방에서 놀아요.'),
  (11, 'sleep', '자다', 'verb', 'word', 'I sleep at ten.', '저는 열 시에 자요.'),
  (11, 'morning', '아침', 'noun', 'word', 'I study in the morning.', '저는 아침에 공부해요.'),
  (11, 'afternoon', '오후', 'noun', 'word', 'I play in the afternoon.', '저는 오후에 놀아요.'),
  (11, 'evening', '저녁', 'noun', 'word', 'I eat dinner in the evening.', '저는 저녁에 저녁밥을 먹어요.'),
  (11, 'night', '밤', 'noun', 'word', 'Good night!', '잘 자요!'),
  (11, 'day', '날, 하루', 'noun', 'word', 'It is a long day.', '긴 하루예요.'),
  (11, 'time', '시간', 'noun', 'word', 'What time is it?', '몇 시예요?'),
  (11, 'home', '집', 'noun', 'word', 'I go home at five.', '저는 다섯 시에 집에 가요.'),
  (11, 'breakfast', '아침 식사', 'noun', 'word', 'I eat breakfast at seven.', '저는 일곱 시에 아침을 먹어요.'),
  (11, 'lunch', '점심 식사', 'noun', 'word', 'Lunch is at one.', '점심은 한 시예요.'),
  (11, 'dinner', '저녁 식사', 'noun', 'word', 'I eat dinner at seven.', '저는 일곱 시에 저녁을 먹어요.'),
  (11, 'early', '이른, 일찍', 'adjective', 'word', 'I get up early.', '저는 일찍 일어나요.'),
  (11, 'late', '늦은, 늦게', 'adjective', 'word', 'I sleep late.', '저는 늦게 자요.'),
  (12, 'can', '~할 수 있다', 'verb', 'word', 'I can swim.', '저는 수영할 수 있어요.'),
  (12, 'swim', '수영하다', 'verb', 'word', 'I can swim well.', '저는 수영을 잘해요.'),
  (12, 'ride', '타다', 'verb', 'word', 'I can ride a bike.', '저는 자전거를 탈 수 있어요.'),
  (12, 'sing', '노래하다', 'verb', 'word', 'She can sing a song.', '그 애는 노래를 부를 수 있어요.'),
  (12, 'dance', '춤추다', 'verb', 'word', 'We can dance together.', '우리는 함께 춤출 수 있어요.'),
  (12, 'draw', '그리다', 'verb', 'word', 'I can draw a cat.', '저는 고양이를 그릴 수 있어요.'),
  (12, 'cook', '요리하다', 'verb', 'word', 'My mother can cook.', '우리 엄마는 요리할 수 있어요.'),
  (12, 'read', '읽다', 'verb', 'word', 'I can read English.', '저는 영어를 읽을 수 있어요.'),
  (12, 'write', '쓰다', 'verb', 'word', 'I can write my name.', '저는 제 이름을 쓸 수 있어요.'),
  (12, 'speak', '말하다', 'verb', 'word', 'I can speak Korean.', '저는 한국어를 말할 수 있어요.'),
  (12, 'help', '돕다', 'verb', 'word', 'Can you help me?', '저 좀 도와줄래요?'),
  (12, 'try', '해 보다', 'verb', 'word', 'Try again!', '다시 해 봐요!'),
  (12, 'well', '잘', 'adverb', 'word', 'He can sing well.', '그는 노래를 잘해요.'),
  (12, 'again', '다시', 'adverb', 'word', 'Read it again, please.', '다시 읽어 주세요.'),
  (12, 'together', '함께', 'adverb', 'word', 'We study together.', '우리는 함께 공부해요.'),
  (12, 'English', '영어', 'noun', 'word', 'I like English.', '저는 영어를 좋아해요.'),
  (12, 'Korean', '한국어', 'noun', 'word', 'I speak Korean.', '저는 한국어를 해요.'),
  (12, 'bike', '자전거', 'noun', 'word', 'My bike is red.', '제 자전거는 빨간색이에요.'),
  (12, 'song', '노래', 'noun', 'word', 'This song is nice.', '이 노래는 좋아요.'),
  (12, 'game', '놀이, 게임', 'noun', 'word', 'We play a game.', '우리는 게임을 해요.'),
  (13, 'friend', '친구', 'noun', 'word', 'She is my friend.', '그 애는 제 친구예요.'),
  (13, 'classmate', '반 친구', 'noun', 'word', 'He is my classmate.', '그 애는 제 반 친구예요.'),
  (13, 'boy', '소년', 'noun', 'word', 'The boy is tall.', '그 남자아이는 키가 커요.'),
  (13, 'girl', '소녀', 'noun', 'word', 'The girl can sing.', '그 여자아이는 노래할 수 있어요.'),
  (13, 'party', '파티', 'noun', 'word', 'I go to a party.', '저는 파티에 가요.'),
  (13, 'gift', '선물', 'noun', 'word', 'I have a gift.', '저는 선물이 있어요.'),
  (13, 'funny', '재미있는', 'adjective', 'word', 'My friend is funny.', '제 친구는 재미있어요.'),
  (13, 'smart', '똑똑한', 'adjective', 'word', 'She is smart.', '그 애는 똑똑해요.'),
  (13, 'quiet', '조용한', 'adjective', 'word', 'He is quiet.', '그 애는 조용해요.'),
  (13, 'best', '가장 좋은', 'adjective', 'word', 'She is my best friend.', '그 애는 제 가장 친한 친구예요.'),
  (13, 'happy', '행복한', 'adjective', 'word', 'I am happy.', '저는 행복해요.'),
  (13, 'sad', '슬픈', 'adjective', 'word', 'He is sad.', '그 애는 슬퍼요.'),
  (13, 'same', '같은', 'adjective', 'word', 'We are in the same class.', '우리는 같은 반이에요.'),
  (13, 'different', '다른', 'adjective', 'word', 'Our bags are different.', '우리 가방은 서로 달라요.'),
  (13, 'favorite', '가장 좋아하는', 'adjective', 'word', 'Blue is my favorite color.', '파란색은 제가 가장 좋아하는 색이에요.'),
  (13, 'know', '알다', 'verb', 'word', 'I know her name.', '저는 그 애 이름을 알아요.'),
  (13, 'talk', '이야기하다', 'verb', 'word', 'We talk in the morning.', '우리는 아침에 이야기해요.'),
  (13, 'laugh', '웃다', 'verb', 'word', 'We laugh together.', '우리는 함께 웃어요.'),
  (13, 'share', '나누다', 'verb', 'word', 'I share my food.', '저는 제 음식을 나눠요.'),
  (13, 'always', '항상', 'adverb', 'word', 'She is always kind.', '그 애는 항상 친절해요.'),
  (13, 'sometimes', '가끔', 'adverb', 'word', 'I sometimes play games.', '저는 가끔 게임을 해요.')
) as v(unit_order, headword, meaning_ko, pos, item_type, example_en, example_ko)
join app_6.units u
  on u.level_code = 'A1.1' and u.order_index = v.unit_order;

-- 5. 단원 지문 (class_id 가 비어 있으면 모든 반이 공유하는 표준 자료)
insert into app_6.materials
  (unit_id, class_id, title, material_type, week, body, is_published)
select u.id, null, v.title, v.kind, u.order_index, v.body, true
from (values
  (1, 'Nice to meet you', 'reading', 'A: Hello! My name is Mina.
B: Hi, Mina. I am Jun.
A: Nice to meet you, Jun.
B: Nice to meet you, too.
A: Goodbye!
B: Goodbye, Mina.

---

A: 안녕! 내 이름은 미나야.
B: 안녕, 미나. 나는 준이야.
A: 만나서 반가워, 준.
B: 나도 만나서 반가워.
A: 안녕!
B: 잘 가, 미나.'),
  (2, 'How old are you?', 'reading', 'A: Hi! What is your name?
B: My name is Suho.
A: How old are you, Suho?
B: I am ten years old. And you?
A: I am nine.
B: Nice to meet you, Suho.

---

A: 안녕! 이름이 뭐야?
B: 내 이름은 수호야.
A: 몇 살이야, 수호?
B: 나는 열 살이야. 너는?
A: 나는 아홉 살이야.
B: 만나서 반가워, 수호.'),
  (3, 'My Family', 'reading', 'Hello! My name is Mina. I am ten years old.
This is my family. My father is tall. My mother is kind.
That is my brother. He is six years old.
My grandmother is here, too. I love my family.

---

안녕하세요! 제 이름은 미나예요. 저는 열 살이에요.
이쪽은 우리 가족이에요. 우리 아빠는 키가 커요. 우리 엄마는 친절해요.
저 애는 제 동생이에요. 여섯 살이에요.
우리 할머니도 여기 계세요. 저는 우리 가족을 사랑해요.'),
  (4, 'What’s in your bag?', 'reading', 'A: What’s this?
B: It’s a pencil. It is my pencil.
A: And what are these?
B: They are books. I have two books.
A: Is that an eraser?
B: Yes! I have an eraser and a ruler.

---

A: 이게 뭐야?
B: 연필이야. 내 연필이야.
A: 그럼 이것들은 뭐야?
B: 책이야. 나는 책이 두 권 있어.
A: 저건 지우개야?
B: 응! 나는 지우개랑 자가 있어.'),
  (5, 'What color is it?', 'reading', 'A: I have a big bag.
B: What color is it?
A: It is blue. It is big.
B: My bag is small and pink.
A: I have a red pen, too.
B: Nice! My pencil is yellow.

---

A: 나 큰 가방 있어.
B: 무슨 색이야?
A: 파란색이야. 크기도 커.
B: 내 가방은 작고 분홍색이야.
A: 나는 빨간 펜도 있어.
B: 좋다! 내 연필은 노란색이야.'),
  (6, 'Our Classroom', 'reading', 'This is our classroom. It is big and nice.
There is a board. There is a clock, too.
There are two windows and one door.
There are many chairs and desks. My desk is new.
My classroom is nice.

---

여기는 우리 교실이에요. 크고 좋아요.
칠판이 하나 있어요. 시계도 하나 있어요.
창문이 두 개, 문이 하나 있어요.
의자와 책상이 많이 있어요. 제 책상은 새것이에요.
우리 교실은 좋아요.'),
  (7, 'Meet Suho', 'reading', 'Hello! My name is Suho. I am ten years old.
This is my family. My mother is kind. My father is tall.
I have a blue bag. I have two books and a red pen.
My classroom is big. There are many windows.
Nice to meet you!

---

안녕하세요! 제 이름은 수호예요. 저는 열 살이에요.
이쪽은 우리 가족이에요. 우리 엄마는 친절해요. 우리 아빠는 키가 커요.
저는 파란 가방이 있어요. 책 두 권과 빨간 펜이 있어요.
우리 교실은 커요. 창문이 많이 있어요.
만나서 반가워요!'),
  (8, 'Where is my key?', 'reading', 'A: Where is my key?
B: Is it in your bag?
A: No. My bag is under the desk. It is not there.
B: Look on the table.
A: Yes! It is next to the cup. Thank you!
B: You are welcome.

---

A: 내 열쇠 어디 있지?
B: 가방 안에 있어?
A: 아니. 내 가방은 책상 아래에 있는데, 거기 없어.
B: 탁자 위를 봐.
A: 있다! 컵 옆에 있어. 고마워!
B: 천만에.'),
  (9, 'I am hungry', 'reading', 'A: I am hungry.
B: Do you want some bread?
A: Yes, please. I like bread.
B: Here is bread and milk.
A: Thank you! I don’t like milk. I want water.
B: OK. Here is water.

---

A: 나 배고파.
B: 빵 좀 먹을래?
A: 응, 부탁해. 나 빵 좋아해.
B: 여기 빵이랑 우유 있어.
A: 고마워! 나는 우유는 안 좋아해. 물이 좋아.
B: 알았어. 여기 물 있어.'),
  (10, 'Do you like animals?', 'reading', 'A: Do you like animals?
B: Yes, I do. I like rabbits. They are cute.
A: Do you like dogs?
B: No, I don’t. Do you?
A: Yes! My pet is a dog. He is big and brown.
B: Is he cute?
A: Yes! He runs and jumps.

---

A: 동물 좋아해?
B: 응, 좋아해. 나는 토끼를 좋아해. 귀엽거든.
A: 개는 좋아해?
B: 아니, 안 좋아해. 너는?
A: 응! 우리 반려동물이 개야. 크고 갈색이야.
B: 귀여워?
A: 응! 달리고 뛰어.'),
  (11, 'My Day', 'reading', 'I get up at seven. I wash and eat breakfast.
I go to school at eight. My school is big.
Lunch is at one. I eat rice and soup.
In the afternoon, I study at home. I go home at five.
I eat dinner at seven. I sleep at ten.
It is a good day!

---

저는 일곱 시에 일어나요. 씻고 아침을 먹어요.
여덟 시에 학교에 가요. 우리 학교는 커요.
점심은 한 시예요. 저는 밥과 국을 먹어요.
오후에는 집에서 공부해요. 다섯 시에 집에 가요.
일곱 시에 저녁을 먹어요. 열 시에 자요.
좋은 하루예요!'),
  (12, 'Can you swim?', 'reading', 'A: Can you swim?
B: Yes, I can. I swim well.
A: Can you ride a bike?
B: No, I can’t. Can you?
A: Yes, I can. My bike is red.
B: Can you help me? I want to try.
A: Sure! We can go together.

---

A: 수영할 수 있어?
B: 응, 할 수 있어. 나는 수영을 잘해.
A: 자전거는 탈 수 있어?
B: 아니, 못 타. 너는?
A: 응, 탈 수 있어. 내 자전거는 빨간색이야.
B: 나 좀 도와줄래? 해 보고 싶어.
A: 물론이지! 같이 갈 수 있어.'),
  (13, 'My Best Friend', 'reading', 'This is Jiho. He is my best friend. He is ten years old.
We are in the same class. He is next to me.
Jiho likes animals. He has a cat. It is white and cute.
He can draw well. He is quiet, but he is funny, too.
We talk and laugh together. I am happy.

---

이 애는 지호예요. 제 가장 친한 친구예요. 열 살이에요.
우리는 같은 반이에요. 지호는 제 옆에 있어요.
지호는 동물을 좋아해요. 고양이를 키워요. 하얗고 귀여워요.
그림을 잘 그려요. 조용하지만 재미있기도 해요.
우리는 함께 이야기하고 웃어요. 저는 행복해요.'),
  (14, 'About Me — 발표 예시', 'reading', 'Hello! My name is Mina. I am ten years old.
This is my family. My mother is kind and my father is tall.
I have one brother. He is six.
I like apples and cake. I don’t like milk.
I can swim and I can draw. I can’t cook.
I get up at seven and I go to school at eight.
My favorite color is blue. Thank you!

---

안녕하세요! 제 이름은 미나예요. 저는 열 살이에요.
이쪽은 우리 가족이에요. 우리 엄마는 친절하고 아빠는 키가 커요.
저는 남동생이 한 명 있어요. 여섯 살이에요.
저는 사과와 케이크를 좋아해요. 우유는 안 좋아해요.
저는 수영할 수 있고 그림도 그릴 수 있어요. 요리는 못해요.
저는 일곱 시에 일어나고 여덟 시에 학교에 가요.
제가 가장 좋아하는 색은 파란색이에요. 감사합니다!')
) as v(unit_order, title, kind, body)
join app_6.units u
  on u.level_code = 'A1.1' and u.order_index = v.unit_order;

commit;
