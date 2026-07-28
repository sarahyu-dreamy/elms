import type { SeedLevel } from './types'

/**
 * A1.1 — 14단원 · 14주 · 주 4회(단원당 4차시)
 *
 * 대상: 영어를 처음 시작하는 학생.
 * 졸업 요건: "자기소개를 이어진 3–4문장으로 할 수 있다" (Unit 14 말하기)
 *
 * 어휘는 뒤로 갈수록 늘립니다 (12 → 21). 처음에는 알파벳과 소리에 적응할 시간이
 * 필요하고, 학기 후반에는 앞 단원 어휘가 받쳐 주므로 더 많이 소화할 수 있습니다.
 * 7단원과 14단원은 통합·복습이라 새 어휘가 없습니다. 합계 200개.
 *
 * ★ 예문 원칙: 그 단원까지 배운 단어로만 만듭니다.
 *   안 배운 단어가 섞이면 예문이 이해를 돕는 대신 장벽이 됩니다.
 */
export const A1_1: SeedLevel = {
  levelCode: 'A1.1',
  names: ['Mina', 'Jun', 'Suho', 'Jiho'],
  units: [
    {
      order: 1,
      title: 'Hello!',
      titleKo: '인사와 이름',
      theme: '만남',
      grammar: [
        {
          title: 'be동사 (I am / You are)',
          canDo: '자기를 소개하는 문장을 만들 수 있다.',
          explanation:
            '**I am ~** 은 "나는 ~이다", **You are ~** 는 "너는 ~이다" 입니다.\n\n' +
            '- I am a student. 나는 학생이다.\n' +
            '- You are a teacher. 당신은 선생님이다.\n\n' +
            '말할 때는 줄여서 **I’m**, **You’re** 라고 자주 합니다.',
        },
        {
          title: '인칭대명사 주격 I · you',
          canDo: '나와 상대를 가리켜 말할 수 있다.',
          explanation:
            '**I** 는 언제나 대문자로 씁니다. 문장 가운데 있어도 그렇습니다.\n\n' +
            '- I am Mina.\n' +
            '- You are my teacher.',
        },
        {
          title: '알파벳 대소문자',
          canDo: '이름을 바르게 표기할 수 있다.',
          explanation:
            '이름의 첫 글자와 문장의 첫 글자는 **대문자**로 씁니다. 문장 끝에는 **마침표**를 찍습니다.\n\n' +
            '- My name is **M**ina**.**',
        },
      ],
      vocabulary: [
        { en: 'hello', ko: '안녕하세요', pos: 'phrase', type: 'idiom', ex: 'Hello, I am Mina.', exKo: '안녕하세요, 저는 미나예요.' },
        { en: 'hi', ko: '안녕', pos: 'phrase', type: 'idiom', ex: 'Hi! Nice to meet you.', exKo: '안녕! 만나서 반가워.' },
        { en: 'good morning', ko: '좋은 아침', pos: 'phrase', type: 'collocation', ex: 'Good morning, teacher.', exKo: '안녕하세요, 선생님. (아침 인사)' },
        { en: 'good afternoon', ko: '안녕하세요 (오후 인사)', pos: 'phrase', type: 'collocation', ex: 'Good afternoon, Jun.', exKo: '안녕, 준. (오후 인사)' },
        { en: 'good evening', ko: '안녕하세요 (저녁 인사)', pos: 'phrase', type: 'collocation', ex: 'Good evening!', exKo: '안녕하세요! (저녁 인사)' },
        { en: 'goodbye', ko: '안녕히 가세요', pos: 'phrase', type: 'idiom', ex: 'Goodbye, teacher.', exKo: '안녕히 계세요, 선생님.' },
        { en: 'name', ko: '이름', pos: 'noun', ex: 'My name is Jun.', exKo: '제 이름은 준이에요.' },
        { en: 'nice', ko: '좋은, 반가운', pos: 'adjective', ex: 'Nice to meet you.', exKo: '만나서 반가워요.' },
        { en: 'meet', ko: '만나다', pos: 'verb', ex: 'I meet my teacher.', exKo: '저는 선생님을 만나요.' },
        { en: 'teacher', ko: '선생님', pos: 'noun', ex: 'You are my teacher.', exKo: '당신은 제 선생님이에요.' },
        { en: 'student', ko: '학생', pos: 'noun', ex: 'I am a student.', exKo: '저는 학생이에요.' },
        { en: 'please', ko: '부탁합니다', pos: 'adverb', ex: 'Your name, please.', exKo: '이름을 말해 주세요.' },
      ],
      text: {
        kind: 'dialogue',
        title: 'Nice to meet you',
        body: 'A: Hello! My name is Mina.\nB: Hi, Mina. I am Jun.\nA: Nice to meet you, Jun.\nB: Nice to meet you, too.\nA: Goodbye!\nB: Goodbye, Mina.',
        bodyKo:
          'A: 안녕! 내 이름은 미나야.\nB: 안녕, 미나. 나는 준이야.\nA: 만나서 반가워, 준.\nB: 나도 만나서 반가워.\nA: 안녕!\nB: 잘 가, 미나.',
      },
      canDo: [
        { skill: 'listening', statement: '아침·점심·저녁 인사말을 듣고 언제 쓰는 인사인지 구별할 수 있다.' },
        { skill: 'listening', statement: '상대가 또박또박 말하는 이름의 철자를 듣고 받아 적을 수 있다.' },
        { skill: 'reading', statement: '이름표에 적힌 이름을 소리 내어 읽을 수 있다.' },
        { skill: 'reading', statement: '인사말이 적힌 문장을 읽고 알맞은 상황 그림과 연결할 수 있다.' },
        { skill: 'speaking', statement: '시간대에 맞는 인사말로 먼저 인사할 수 있다.' },
        { skill: 'speaking', statement: '이름을 묻고 답할 수 있다. (What’s your name? — My name is ~)' },
        { skill: 'writing', statement: '자기 이름을 알파벳 대소문자로 바르게 쓸 수 있다.' },
        { skill: 'writing', statement: 'My name is ~ 문장을 첫 글자 대문자와 마침표를 지켜 쓸 수 있다.' },
      ],
    },

    {
      order: 2,
      title: 'Numbers & Age',
      titleKo: '숫자와 나이',
      theme: '나',
      grammar: [
        {
          title: '숫자 1–20',
          canDo: '스무 개까지 수를 세어 말할 수 있다.',
          explanation:
            'one, two, three … ten 까지 먼저 익히고 twenty 까지 넓힙니다.\n\n' +
            '13부터 19까지는 **-teen**, 20·30 처럼 십 단위는 **-ty** 로 끝납니다.\n' +
            '소리가 비슷하니 강세를 다르게 읽어 구별합니다.',
        },
        {
          title: 'How old are you? / I am ~ years old',
          canDo: '나이를 묻고 답할 수 있다.',
          explanation:
            '나이를 물을 때는 **How old are you?** 라고 합니다.\n\n' +
            '- I am ten years old. 나는 열 살이다.\n' +
            '- 짧게 **I am ten.** 이라고만 해도 됩니다.',
        },
      ],
      vocabulary: [
        { en: 'one', ko: '하나', pos: 'noun', ex: 'one student', exKo: '학생 한 명' },
        { en: 'two', ko: '둘', pos: 'noun', ex: 'two teachers', exKo: '선생님 두 분' },
        { en: 'three', ko: '셋', pos: 'noun', ex: 'three students', exKo: '학생 세 명' },
        { en: 'four', ko: '넷', pos: 'noun', ex: 'I am four years old.', exKo: '저는 네 살이에요.' },
        { en: 'five', ko: '다섯', pos: 'noun', ex: 'five students', exKo: '학생 다섯 명' },
        { en: 'six', ko: '여섯', pos: 'noun', ex: 'I am six years old.', exKo: '저는 여섯 살이에요.' },
        { en: 'seven', ko: '일곱', pos: 'noun', ex: 'I am seven years old.', exKo: '저는 일곱 살이에요.' },
        { en: 'eight', ko: '여덟', pos: 'noun', ex: 'eight students', exKo: '학생 여덟 명' },
        { en: 'nine', ko: '아홉', pos: 'noun', ex: 'She is nine years old.', exKo: '그 애는 아홉 살이에요.' },
        { en: 'ten', ko: '열', pos: 'noun', ex: 'I am ten years old.', exKo: '저는 열 살이에요.' },
        { en: 'old', ko: '나이가 ~인, 오래된', pos: 'adjective', ex: 'How old are you?', exKo: '몇 살이에요?' },
        { en: 'year', ko: '해, 년', pos: 'noun', ex: 'I am ten years old.', exKo: '저는 열 살이에요.' },
        { en: 'birthday', ko: '생일', pos: 'noun', ex: 'It is my birthday.', exKo: '제 생일이에요.' },
      ],
      text: {
        kind: 'dialogue',
        title: 'How old are you?',
        body: 'A: Hi! What is your name?\nB: My name is Suho.\nA: How old are you, Suho?\nB: I am ten years old. And you?\nA: I am nine.\nB: Nice to meet you, Suho.',
        bodyKo:
          'A: 안녕! 이름이 뭐야?\nB: 내 이름은 수호야.\nA: 몇 살이야, 수호?\nB: 나는 열 살이야. 너는?\nA: 나는 아홉 살이야.\nB: 만나서 반가워, 수호.',
      },
      canDo: [
        { skill: 'listening', statement: '1–20 사이의 숫자를 듣고 아라비아 숫자로 받아 적을 수 있다.' },
        { skill: 'listening', statement: '나이를 말하는 문장을 듣고 몇 살인지 알 수 있다.' },
        { skill: 'reading', statement: '숫자 단어(one, two …)를 읽고 아라비아 숫자와 연결할 수 있다.' },
        { skill: 'reading', statement: '이름과 나이가 적힌 소개 카드를 읽고 정보를 찾을 수 있다.' },
        { skill: 'speaking', statement: '나이를 묻고 답할 수 있다.' },
        { skill: 'speaking', statement: '전화번호를 한 자리씩 또박또박 말할 수 있다.' },
        { skill: 'writing', statement: '1–20을 영어 단어로 쓸 수 있다.' },
        { skill: 'writing', statement: 'I am ~ years old. 문장을 쓸 수 있다.' },
      ],
    },

    {
      order: 3,
      title: 'My Family',
      titleKo: '우리 가족',
      theme: '가족',
      grammar: [
        {
          title: 'this / that',
          canDo: '가까운 것과 먼 것을 가리켜 말할 수 있다.',
          explanation:
            '가까이 있으면 **this**(이것·이 사람), 멀리 있으면 **that**(저것·저 사람) 입니다.\n\n' +
            '- This is my mother. 이분은 우리 엄마예요.\n' +
            '- That is my father. 저분은 우리 아빠예요.',
        },
        {
          title: '소유격 my · your · his · her',
          canDo: '누구의 것인지 밝혀 말할 수 있다.',
          explanation:
            '| 누구의 | 영어 |\n|---|---|\n| 나의 | my |\n| 너의 | your |\n| 그의 | his |\n| 그녀의 | her |\n\n' +
            '- his sister 그의 여동생\n- her brother 그녀의 오빠',
        },
        {
          title: 'be동사 3인칭 (He is / She is)',
          canDo: '제3자를 소개할 수 있다.',
          explanation:
            '남자는 **He is ~**, 여자는 **She is ~** 입니다.\n\n' +
            '- He is my brother. 그는 내 남동생이다.\n' +
            '- She is kind. 그녀는 친절하다.',
        },
      ],
      vocabulary: [
        { en: 'father', ko: '아버지', pos: 'noun', ex: 'My father is tall.', exKo: '우리 아빠는 키가 커요.' },
        { en: 'mother', ko: '어머니', pos: 'noun', ex: 'My mother is kind.', exKo: '우리 엄마는 친절해요.' },
        { en: 'brother', ko: '형, 오빠, 남동생', pos: 'noun', ex: 'This is my brother.', exKo: '이 애는 제 동생이에요.' },
        { en: 'sister', ko: '누나, 언니, 여동생', pos: 'noun', ex: 'Her sister is nine.', exKo: '그 애 여동생은 아홉 살이에요.' },
        { en: 'grandfather', ko: '할아버지', pos: 'noun', ex: 'My grandfather is old.', exKo: '우리 할아버지는 연세가 많으세요.' },
        { en: 'grandmother', ko: '할머니', pos: 'noun', ex: 'That is my grandmother.', exKo: '저분은 우리 할머니예요.' },
        { en: 'parents', ko: '부모님', pos: 'noun', ex: 'My parents are teachers.', exKo: '우리 부모님은 선생님이세요.' },
        { en: 'family', ko: '가족', pos: 'noun', ex: 'I love my family.', exKo: '저는 우리 가족을 사랑해요.' },
        { en: 'baby', ko: '아기', pos: 'noun', ex: 'The baby is my sister.', exKo: '그 아기는 제 여동생이에요.' },
        { en: 'tall', ko: '키가 큰', pos: 'adjective', ex: 'He is tall.', exKo: '그는 키가 커요.' },
        { en: 'kind', ko: '친절한', pos: 'adjective', ex: 'She is kind.', exKo: '그녀는 친절해요.' },
        { en: 'this', ko: '이것, 이 사람', pos: 'pronoun', ex: 'This is my mother.', exKo: '이분은 우리 엄마예요.' },
        { en: 'that', ko: '저것, 저 사람', pos: 'pronoun', ex: 'That is my father.', exKo: '저분은 우리 아빠예요.' },
        { en: 'love', ko: '사랑하다', pos: 'verb', ex: 'I love my parents.', exKo: '저는 부모님을 사랑해요.' },
      ],
      text: {
        kind: 'reading',
        title: 'My Family',
        body:
          'Hello! My name is Mina. I am ten years old.\nThis is my family. My father is tall. My mother is kind.\nThat is my brother. He is six years old.\nMy grandmother is here, too. I love my family.',
        bodyKo:
          '안녕하세요! 제 이름은 미나예요. 저는 열 살이에요.\n이쪽은 우리 가족이에요. 우리 아빠는 키가 커요. 우리 엄마는 친절해요.\n저 애는 제 동생이에요. 여섯 살이에요.\n우리 할머니도 여기 계세요. 저는 우리 가족을 사랑해요.',
      },
      canDo: [
        { skill: 'listening', statement: '가족 호칭을 듣고 가계도에서 해당 인물을 찾을 수 있다.' },
        { skill: 'listening', statement: '가족을 소개하는 말을 듣고 가족이 몇 명인지 셀 수 있다.' },
        { skill: 'reading', statement: '가족 소개 글을 읽고 인물과 관계를 연결할 수 있다.' },
        { skill: 'reading', statement: 'his 와 her 를 구별해 누구의 것인지 파악할 수 있다.' },
        { skill: 'speaking', statement: '사진을 보며 This is my ~ 로 가족을 소개할 수 있다.' },
        { skill: 'speaking', statement: '가족 구성원을 세 명 이상 이어서 소개할 수 있다.' },
        { skill: 'writing', statement: 'He is / She is 를 구별해 가족 소개 문장을 쓸 수 있다.' },
        { skill: 'writing', statement: '가족을 소개하는 문장 세 개를 이어서 쓸 수 있다.' },
      ],
    },

    {
      order: 4,
      title: 'My Things',
      titleKo: '내 물건',
      theme: '사물',
      grammar: [
        {
          title: '명사 복수형',
          canDo: '하나와 여럿을 구별해 말할 수 있다.',
          explanation:
            '둘 이상이면 명사 뒤에 **-s** 를 붙입니다.\n\n' +
            '- one pen → two pen**s**\n- one book → three book**s**\n\n' +
            '-s, -x, -ch, -sh 로 끝나면 **-es** 를 붙입니다. (box → box**es**)',
        },
        {
          title: '관사 a / an',
          canDo: '셀 수 있는 명사 앞에 관사를 붙여 말할 수 있다.',
          explanation:
            '하나일 때 명사 앞에 **a** 를 붙입니다. 모음 소리(a·e·i·o·u)로 시작하면 **an** 입니다.\n\n' +
            '- **a** pen, **a** book\n- **an** eraser, **an** apple',
        },
        {
          title: 'What’s this? / It’s a ~',
          canDo: '사물의 이름을 묻고 답할 수 있다.',
          explanation:
            '- What’s this? 이게 뭐예요?\n- It’s a pencil. 연필이에요.\n\n' +
            '여러 개면 **They are ~** 로 답합니다.',
        },
      ],
      vocabulary: [
        { en: 'pen', ko: '펜', pos: 'noun', ex: 'I have a pen.', exKo: '저는 펜이 있어요.' },
        { en: 'pencil', ko: '연필', pos: 'noun', ex: 'This is my pencil.', exKo: '이건 제 연필이에요.' },
        { en: 'book', ko: '책', pos: 'noun', ex: 'I have two books.', exKo: '저는 책이 두 권 있어요.' },
        { en: 'notebook', ko: '공책', pos: 'noun', ex: 'This is my notebook.', exKo: '이건 제 공책이에요.' },
        { en: 'eraser', ko: '지우개', pos: 'noun', ex: 'I have an eraser.', exKo: '저는 지우개가 있어요.' },
        { en: 'ruler', ko: '자', pos: 'noun', ex: 'That is a ruler.', exKo: '저건 자예요.' },
        { en: 'bag', ko: '가방', pos: 'noun', ex: 'This is my bag.', exKo: '이건 제 가방이에요.' },
        { en: 'desk', ko: '책상', pos: 'noun', ex: 'I have a desk.', exKo: '저는 책상이 있어요.' },
        { en: 'chair', ko: '의자', pos: 'noun', ex: 'This is my chair.', exKo: '이건 제 의자예요.' },
        { en: 'key', ko: '열쇠', pos: 'noun', ex: 'I have a key.', exKo: '저는 열쇠가 있어요.' },
        { en: 'cup', ko: '컵', pos: 'noun', ex: 'That is a cup.', exKo: '저건 컵이에요.' },
        { en: 'box', ko: '상자', pos: 'noun', ex: 'I have two boxes.', exKo: '저는 상자가 두 개 있어요.' },
        { en: 'thing', ko: '물건, 것', pos: 'noun', ex: 'What is this thing?', exKo: '이 물건은 뭐예요?' },
        { en: 'have', ko: '가지다', pos: 'verb', ex: 'I have three pens.', exKo: '저는 펜이 세 자루 있어요.' },
        { en: 'my', ko: '나의', pos: 'determiner', ex: 'This is my book.', exKo: '이건 제 책이에요.' },
      ],
      text: {
        kind: 'dialogue',
        title: 'What’s in your bag?',
        body:
          'A: What’s this?\nB: It’s a pencil. It is my pencil.\nA: And what are these?\nB: They are books. I have two books.\nA: Is that an eraser?\nB: Yes! I have an eraser and a ruler.',
        bodyKo:
          'A: 이게 뭐야?\nB: 연필이야. 내 연필이야.\nA: 그럼 이것들은 뭐야?\nB: 책이야. 나는 책이 두 권 있어.\nA: 저건 지우개야?\nB: 응! 나는 지우개랑 자가 있어.',
      },
      canDo: [
        { skill: 'listening', statement: '물건 이름을 듣고 여러 그림 중에서 고를 수 있다.' },
        { skill: 'listening', statement: '단수와 복수를 듣고 한 개인지 여러 개인지 구별할 수 있다.' },
        { skill: 'reading', statement: '물건 목록을 읽고 각각 몇 개인지 파악할 수 있다.' },
        { skill: 'reading', statement: 'a 와 an 이 알맞게 쓰였는지 찾아낼 수 있다.' },
        { skill: 'speaking', statement: '물건을 가리키며 What’s this? 로 묻고 답할 수 있다.' },
        { skill: 'speaking', statement: '자기 가방 속 물건을 세 가지 이상 말할 수 있다.' },
        { skill: 'writing', statement: '명사의 복수형을 규칙에 맞게 쓸 수 있다.' },
        { skill: 'writing', statement: 'It’s a ~ / They are ~ 문장을 구별해 쓸 수 있다.' },
      ],
    },

    {
      order: 5,
      title: 'Colors & Shapes',
      titleKo: '색깔과 모양',
      theme: '묘사',
      grammar: [
        {
          title: '형용사 + 명사 어순',
          canDo: '사물을 꾸며 말할 수 있다.',
          explanation:
            '영어는 꾸미는 말이 **명사 앞**에 옵니다. 한국어와 순서가 같습니다.\n\n' +
            '- a **red** pen 빨간 펜\n- a **big** bag 큰 가방\n\n' +
            '여러 개 붙이면 **크기 → 색깔** 순서입니다. (a **big red** bag)',
        },
        {
          title: 'It is + 형용사',
          canDo: '사물의 성질을 말할 수 있다.',
          explanation:
            '사물을 가리켜 성질을 말할 때 **It is ~** 를 씁니다.\n\n' +
            '- It is red. 그것은 빨갛다.\n- It is big. 그것은 크다.',
        },
      ],
      vocabulary: [
        { en: 'red', ko: '빨강', pos: 'adjective', ex: 'I have a red pen.', exKo: '저는 빨간 펜이 있어요.' },
        { en: 'blue', ko: '파랑', pos: 'adjective', ex: 'My bag is blue.', exKo: '제 가방은 파란색이에요.' },
        { en: 'yellow', ko: '노랑', pos: 'adjective', ex: 'The pencil is yellow.', exKo: '그 연필은 노란색이에요.' },
        { en: 'green', ko: '초록', pos: 'adjective', ex: 'My bag is green.', exKo: '제 가방은 초록색이에요.' },
        { en: 'black', ko: '검정', pos: 'adjective', ex: 'My chair is black.', exKo: '제 의자는 검은색이에요.' },
        { en: 'white', ko: '하양', pos: 'adjective', ex: 'My notebook is white.', exKo: '제 공책은 하얀색이에요.' },
        { en: 'orange', ko: '주황', pos: 'adjective', ex: 'I have an orange cup.', exKo: '저는 주황색 컵이 있어요.' },
        { en: 'pink', ko: '분홍', pos: 'adjective', ex: 'Her bag is pink.', exKo: '그 애 가방은 분홍색이에요.' },
        { en: 'brown', ko: '갈색', pos: 'adjective', ex: 'The desk is brown.', exKo: '그 책상은 갈색이에요.' },
        { en: 'circle', ko: '원', pos: 'noun', ex: 'This is a circle.', exKo: '이건 원이에요.' },
        { en: 'square', ko: '정사각형', pos: 'noun', ex: 'That is a square.', exKo: '저건 정사각형이에요.' },
        { en: 'triangle', ko: '삼각형', pos: 'noun', ex: 'The triangle is small.', exKo: '그 삼각형은 작아요.' },
        { en: 'big', ko: '큰', pos: 'adjective', ex: 'My bag is big.', exKo: '제 가방은 커요.' },
        { en: 'small', ko: '작은', pos: 'adjective', ex: 'The box is small.', exKo: '그 상자는 작아요.' },
        { en: 'long', ko: '긴', pos: 'adjective', ex: 'This ruler is long.', exKo: '이 자는 길어요.' },
        { en: 'color', ko: '색깔', pos: 'noun', ex: 'What color is it?', exKo: '그건 무슨 색이에요?' },
      ],
      text: {
        kind: 'dialogue',
        title: 'What color is it?',
        body:
          'A: I have a big bag.\nB: What color is it?\nA: It is blue. It is big.\nB: My bag is small and pink.\nA: I have a red pen, too.\nB: Nice! My pencil is yellow.',
        bodyKo:
          'A: 나 큰 가방 있어.\nB: 무슨 색이야?\nA: 파란색이야. 크기도 커.\nB: 내 가방은 작고 분홍색이야.\nA: 나는 빨간 펜도 있어.\nB: 좋다! 내 연필은 노란색이야.',
      },
      canDo: [
        { skill: 'listening', statement: '색깔 이름을 듣고 해당 색을 고를 수 있다.' },
        { skill: 'listening', statement: '색과 크기를 함께 설명하는 말을 듣고 알맞은 그림을 찾을 수 있다.' },
        { skill: 'reading', statement: '색깔·모양 단어를 읽고 그림과 연결할 수 있다.' },
        { skill: 'reading', statement: '사물을 묘사한 짧은 문장을 읽고 알맞은 그림을 고를 수 있다.' },
        { skill: 'speaking', statement: '사물의 색과 크기를 함께 말할 수 있다. (It’s a big red bag.)' },
        { skill: 'speaking', statement: '좋아하는 색을 말하고 그 색의 물건을 하나 들 수 있다.' },
        { skill: 'writing', statement: '형용사와 명사의 순서를 지켜 문장을 쓸 수 있다.' },
        { skill: 'writing', statement: '사물 두 개를 색과 크기로 묘사하는 문장을 쓸 수 있다.' },
      ],
    },

    {
      order: 6,
      title: 'My Classroom',
      titleKo: '우리 교실',
      theme: '학교',
      grammar: [
        {
          title: 'There is / There are',
          canDo: '무엇이 있는지 말할 수 있다.',
          explanation:
            '하나면 **There is**, 여럿이면 **There are** 입니다.\n\n' +
            '- There **is** a clock. 시계가 하나 있다.\n' +
            '- There **are** two windows. 창문이 두 개 있다.',
        },
        {
          title: 'some / many',
          canDo: '막연한 수량을 말할 수 있다.',
          explanation:
            '정확한 수를 말하지 않을 때 씁니다.\n\n' +
            '- There are **some** books. 책이 몇 권 있다.\n' +
            '- There are **many** chairs. 의자가 많이 있다.',
        },
      ],
      vocabulary: [
        { en: 'classroom', ko: '교실', pos: 'noun', ex: 'Our classroom is big.', exKo: '우리 교실은 커요.' },
        { en: 'board', ko: '칠판', pos: 'noun', ex: 'There is a board.', exKo: '칠판이 하나 있어요.' },
        { en: 'window', ko: '창문', pos: 'noun', ex: 'There are two windows.', exKo: '창문이 두 개 있어요.' },
        { en: 'door', ko: '문', pos: 'noun', ex: 'The door is white.', exKo: '그 문은 하얀색이에요.' },
        { en: 'clock', ko: '시계', pos: 'noun', ex: 'There is a clock.', exKo: '시계가 하나 있어요.' },
        { en: 'map', ko: '지도', pos: 'noun', ex: 'There is a map.', exKo: '지도가 하나 있어요.' },
        { en: 'picture', ko: '그림, 사진', pos: 'noun', ex: 'This picture is nice.', exKo: '이 그림은 멋져요.' },
        { en: 'computer', ko: '컴퓨터', pos: 'noun', ex: 'There is a computer.', exKo: '컴퓨터가 하나 있어요.' },
        { en: 'wall', ko: '벽', pos: 'noun', ex: 'The wall is white.', exKo: '그 벽은 하얀색이에요.' },
        { en: 'floor', ko: '바닥', pos: 'noun', ex: 'The floor is brown.', exKo: '바닥은 갈색이에요.' },
        { en: 'light', ko: '전등, 빛', pos: 'noun', ex: 'There are many lights.', exKo: '전등이 많이 있어요.' },
        { en: 'school', ko: '학교', pos: 'noun', ex: 'My school is big.', exKo: '우리 학교는 커요.' },
        { en: 'class', ko: '반, 수업', pos: 'noun', ex: 'My class is small.', exKo: '우리 반은 작아요.' },
        { en: 'many', ko: '많은', pos: 'determiner', ex: 'There are many books.', exKo: '책이 많이 있어요.' },
        { en: 'some', ko: '몇몇의', pos: 'determiner', ex: 'There are some pens.', exKo: '펜이 몇 자루 있어요.' },
        { en: 'there', ko: '거기에', pos: 'adverb', ex: 'There are five chairs.', exKo: '의자가 다섯 개 있어요.' },
        { en: 'new', ko: '새로운', pos: 'adjective', ex: 'My notebook is new.', exKo: '제 공책은 새것이에요.' },
      ],
      text: {
        kind: 'reading',
        title: 'Our Classroom',
        body:
          'This is our classroom. It is big and nice.\nThere is a board. There is a clock, too.\nThere are two windows and one door.\nThere are many chairs and desks. My desk is new.\nMy classroom is nice.',
        bodyKo:
          '여기는 우리 교실이에요. 크고 좋아요.\n칠판이 하나 있어요. 시계도 하나 있어요.\n창문이 두 개, 문이 하나 있어요.\n의자와 책상이 많이 있어요. 제 책상은 새것이에요.\n우리 교실은 좋아요.',
      },
      canDo: [
        { skill: 'listening', statement: '교실 사물의 이름을 듣고 교실에서 찾을 수 있다.' },
        { skill: 'listening', statement: 'There is 와 There are 를 듣고 하나인지 여럿인지 구별할 수 있다.' },
        { skill: 'reading', statement: '교실을 설명한 글을 읽고 없는 물건을 찾아낼 수 있다.' },
        { skill: 'reading', statement: 'There is/are 문장을 읽고 사물의 개수를 파악할 수 있다.' },
        { skill: 'speaking', statement: '교실에 무엇이 있는지 There is/are 로 말할 수 있다.' },
        { skill: 'speaking', statement: '교실 사물 다섯 가지를 이어서 말할 수 있다.' },
        { skill: 'writing', statement: 'There is 와 There are 를 구별해 쓸 수 있다.' },
        { skill: 'writing', statement: '교실을 설명하는 문장 세 개를 쓸 수 있다.' },
      ],
    },

    {
      order: 7,
      title: 'Review 1',
      titleKo: '중간 통합',
      theme: '복습·점검',
      isReview: true,
      grammar: [
        {
          title: '1–6단원 통합',
          canDo: '배운 문형을 섞어 자기를 소개할 수 있다.',
          explanation:
            '지금까지 배운 것을 하나로 잇습니다.\n\n' +
            '1. **I am ~** 이름·나이\n' +
            '2. **This is my ~** 가족\n' +
            '3. **I have ~** 물건\n' +
            '4. **It is + 색·크기** 묘사\n' +
            '5. **There is / are ~** 교실\n\n' +
            '이 다섯 개를 이어 붙이면 소개 글 한 편이 됩니다.',
        },
      ],
      vocabulary: [],
      text: {
        kind: 'reading',
        title: 'Meet Suho',
        body:
          'Hello! My name is Suho. I am ten years old.\nThis is my family. My mother is kind. My father is tall.\nI have a blue bag. I have two books and a red pen.\nMy classroom is big. There are many windows.\nNice to meet you!',
        bodyKo:
          '안녕하세요! 제 이름은 수호예요. 저는 열 살이에요.\n이쪽은 우리 가족이에요. 우리 엄마는 친절해요. 우리 아빠는 키가 커요.\n저는 파란 가방이 있어요. 책 두 권과 빨간 펜이 있어요.\n우리 교실은 커요. 창문이 많이 있어요.\n만나서 반가워요!',
      },
      canDo: [
        { skill: 'listening', statement: '1–6단원 표현이 섞인 짧은 대화를 듣고 이름·나이·물건을 파악할 수 있다.' },
        { skill: 'listening', statement: '들은 정보를 표에 나누어 정리할 수 있다.' },
        { skill: 'reading', statement: '배운 어휘로 쓰인 짧은 소개 글을 읽고 내용을 파악할 수 있다.' },
        { skill: 'reading', statement: '글을 읽고 주어진 문장의 참·거짓을 판단할 수 있다.' },
        { skill: 'speaking', statement: '이름·나이·가족·물건을 섞어 자기를 소개할 수 있다.' },
        { skill: 'speaking', statement: '짝에게 배운 표현으로 세 가지 이상 질문할 수 있다.' },
        { skill: 'writing', statement: '배운 문형으로 자기소개 문장 다섯 개를 쓸 수 있다.' },
        { skill: 'writing', statement: '첫 글자 대문자와 마침표를 지켜 쓸 수 있다.' },
      ],
    },

    {
      order: 8,
      title: 'Where Is It?',
      titleKo: '어디에 있나요',
      theme: '위치',
      grammar: [
        {
          title: '장소 전치사 in / on / under / next to',
          canDo: '위치를 나타내어 말할 수 있다.',
          explanation:
            '| 전치사 | 뜻 |\n|---|---|\n| in | ~ 안에 |\n| on | ~ 위에 (닿아서) |\n| under | ~ 아래에 |\n| next to | ~ 옆에 |\n\n' +
            '- The pen is **in** the bag.\n- The book is **on** the desk.',
        },
        {
          title: 'Where is ~?',
          canDo: '물건이 어디 있는지 물을 수 있다.',
          explanation:
            '- Where is my pen? 내 펜이 어디 있어요?\n- It is **under** the chair. 의자 아래에 있어요.\n\n' +
            '여럿이면 **Where are ~?** 입니다.',
        },
      ],
      vocabulary: [
        { en: 'in', ko: '~ 안에', pos: 'preposition', ex: 'The pen is in the bag.', exKo: '그 펜은 가방 안에 있어요.' },
        { en: 'on', ko: '~ 위에', pos: 'preposition', ex: 'The book is on the desk.', exKo: '그 책은 책상 위에 있어요.' },
        { en: 'under', ko: '~ 아래에', pos: 'preposition', ex: 'My bag is under the desk.', exKo: '제 가방은 책상 아래에 있어요.' },
        { en: 'next to', ko: '~ 옆에', pos: 'preposition', type: 'collocation', ex: 'The chair is next to the desk.', exKo: '그 의자는 책상 옆에 있어요.' },
        { en: 'behind', ko: '~ 뒤에', pos: 'preposition', ex: 'The door is behind me.', exKo: '문은 제 뒤에 있어요.' },
        { en: 'in front of', ko: '~ 앞에', pos: 'preposition', type: 'collocation', ex: 'The board is in front of the class.', exKo: '칠판은 교실 앞에 있어요.' },
        { en: 'room', ko: '방', pos: 'noun', ex: 'My room is small.', exKo: '제 방은 작아요.' },
        { en: 'table', ko: '탁자', pos: 'noun', ex: 'The cup is on the table.', exKo: '그 컵은 탁자 위에 있어요.' },
        { en: 'bed', ko: '침대', pos: 'noun', ex: 'My bed is big.', exKo: '제 침대는 커요.' },
        { en: 'sofa', ko: '소파', pos: 'noun', ex: 'The sofa is brown.', exKo: '그 소파는 갈색이에요.' },
        { en: 'kitchen', ko: '부엌', pos: 'noun', ex: 'My mother is in the kitchen.', exKo: '우리 엄마는 부엌에 계세요.' },
        { en: 'house', ko: '집', pos: 'noun', ex: 'Our house is new.', exKo: '우리 집은 새집이에요.' },
        { en: 'where', ko: '어디에', pos: 'adverb', ex: 'Where is my pen?', exKo: '제 펜이 어디 있어요?' },
        { en: 'here', ko: '여기에', pos: 'adverb', ex: 'My book is here.', exKo: '제 책은 여기 있어요.' },
        { en: 'put', ko: '놓다', pos: 'verb', ex: 'Put the pen on the desk.', exKo: '펜을 책상 위에 놓으세요.' },
        { en: 'find', ko: '찾다', pos: 'verb', ex: 'I find my key.', exKo: '저는 제 열쇠를 찾아요.' },
        { en: 'look', ko: '보다', pos: 'verb', ex: 'Look at the board.', exKo: '칠판을 보세요.' },
      ],
      text: {
        kind: 'dialogue',
        title: 'Where is my key?',
        body:
          'A: Where is my key?\nB: Is it in your bag?\nA: No. My bag is under the desk. It is not there.\nB: Look on the table.\nA: Yes! It is next to the cup. Thank you!\nB: You are welcome.',
        bodyKo:
          'A: 내 열쇠 어디 있지?\nB: 가방 안에 있어?\nA: 아니. 내 가방은 책상 아래에 있는데, 거기 없어.\nB: 탁자 위를 봐.\nA: 있다! 컵 옆에 있어. 고마워!\nB: 천만에.',
      },
      canDo: [
        { skill: 'listening', statement: '위치를 설명하는 말을 듣고 물건을 찾을 수 있다.' },
        { skill: 'listening', statement: '전치사를 듣고 알맞은 위치의 그림을 고를 수 있다.' },
        { skill: 'reading', statement: '위치를 나타낸 문장을 읽고 그림과 연결할 수 있다.' },
        { skill: 'reading', statement: '방을 설명한 글을 읽고 각 물건이 어디 있는지 파악할 수 있다.' },
        { skill: 'speaking', statement: '물건의 위치를 묻고 답할 수 있다.' },
        { skill: 'speaking', statement: '자기 방에 무엇이 어디 있는지 세 가지 이상 말할 수 있다.' },
        { skill: 'writing', statement: '전치사를 써서 위치를 나타내는 문장을 쓸 수 있다.' },
        { skill: 'writing', statement: '그림을 보고 위치를 설명하는 문장 세 개를 쓸 수 있다.' },
      ],
    },

    {
      order: 9,
      title: 'Food I Like',
      titleKo: '좋아하는 음식',
      theme: '음식',
      grammar: [
        {
          title: '일반동사 현재형 긍정 (I like ~)',
          canDo: '좋아하는 것을 말할 수 있다.',
          explanation:
            'be동사가 아닌 동사를 **일반동사**라고 합니다. 주어 뒤에 그대로 씁니다.\n\n' +
            '- I **like** apples.\n- I **eat** rice.\n- I **drink** milk.',
        },
        {
          title: '일반동사 부정 (I don’t like ~)',
          canDo: '싫어하는 것을 말할 수 있다.',
          explanation:
            '동사 앞에 **do not**(줄여서 **don’t**)을 넣습니다.\n\n' +
            '- I **don’t** like meat. 나는 고기를 안 좋아한다.\n\n' +
            '동사는 그대로 두는 것이 중요합니다. (don’t like**s** ✗)',
        },
      ],
      vocabulary: [
        { en: 'rice', ko: '밥, 쌀', pos: 'noun', ex: 'I eat rice.', exKo: '저는 밥을 먹어요.' },
        { en: 'bread', ko: '빵', pos: 'noun', ex: 'I like bread.', exKo: '저는 빵을 좋아해요.' },
        { en: 'milk', ko: '우유', pos: 'noun', ex: 'I drink milk.', exKo: '저는 우유를 마셔요.' },
        { en: 'water', ko: '물', pos: 'noun', ex: 'I drink water.', exKo: '저는 물을 마셔요.' },
        { en: 'juice', ko: '주스', pos: 'noun', ex: 'I want juice.', exKo: '저는 주스를 원해요.' },
        { en: 'apple', ko: '사과', pos: 'noun', ex: 'The apple is red.', exKo: '그 사과는 빨개요.' },
        { en: 'banana', ko: '바나나', pos: 'noun', ex: 'I eat a banana.', exKo: '저는 바나나를 먹어요.' },
        { en: 'egg', ko: '달걀', pos: 'noun', ex: 'I like eggs.', exKo: '저는 달걀을 좋아해요.' },
        { en: 'meat', ko: '고기', pos: 'noun', ex: 'I don’t like meat.', exKo: '저는 고기를 안 좋아해요.' },
        { en: 'fish', ko: '생선', pos: 'noun', ex: 'Fish is on the table.', exKo: '생선이 탁자 위에 있어요.' },
        { en: 'soup', ko: '국, 수프', pos: 'noun', ex: 'I eat soup.', exKo: '저는 국을 먹어요.' },
        { en: 'cake', ko: '케이크', pos: 'noun', ex: 'I like cake.', exKo: '저는 케이크를 좋아해요.' },
        { en: 'food', ko: '음식', pos: 'noun', ex: 'Food is on the table.', exKo: '음식이 탁자 위에 있어요.' },
        { en: 'eat', ko: '먹다', pos: 'verb', ex: 'I eat an apple.', exKo: '저는 사과를 먹어요.' },
        { en: 'drink', ko: '마시다', pos: 'verb', ex: 'I drink juice.', exKo: '저는 주스를 마셔요.' },
        { en: 'like', ko: '좋아하다', pos: 'verb', ex: 'I like apples.', exKo: '저는 사과를 좋아해요.' },
        { en: 'want', ko: '원하다', pos: 'verb', ex: 'I want some bread.', exKo: '저는 빵을 좀 원해요.' },
        { en: 'hungry', ko: '배고픈', pos: 'adjective', ex: 'I am hungry.', exKo: '저는 배고파요.' },
      ],
      text: {
        kind: 'dialogue',
        title: 'I am hungry',
        body:
          'A: I am hungry.\nB: Do you want some bread?\nA: Yes, please. I like bread.\nB: Here is bread and milk.\nA: Thank you! I don’t like milk. I want water.\nB: OK. Here is water.',
        bodyKo:
          'A: 나 배고파.\nB: 빵 좀 먹을래?\nA: 응, 부탁해. 나 빵 좋아해.\nB: 여기 빵이랑 우유 있어.\nA: 고마워! 나는 우유는 안 좋아해. 물이 좋아.\nB: 알았어. 여기 물 있어.',
      },
      canDo: [
        { skill: 'listening', statement: '음식 이름을 듣고 그림에서 고를 수 있다.' },
        { skill: 'listening', statement: '좋아함과 싫어함을 나타내는 말을 듣고 구별할 수 있다.' },
        { skill: 'reading', statement: '음식 이름을 읽고 종류별로 분류할 수 있다.' },
        { skill: 'reading', statement: '좋아하는 음식을 소개한 글에서 원하는 정보를 찾을 수 있다.' },
        { skill: 'speaking', statement: '좋아하는 음식과 싫어하는 음식을 말할 수 있다.' },
        { skill: 'speaking', statement: '짝에게 좋아하는 음식을 묻고 답할 수 있다.' },
        { skill: 'writing', statement: 'I like / I don’t like 문장을 쓸 수 있다.' },
        { skill: 'writing', statement: '좋아하는 음식 세 가지를 문장으로 쓸 수 있다.' },
      ],
    },

    {
      order: 10,
      title: 'Animals',
      titleKo: '동물',
      theme: '동물',
      grammar: [
        {
          title: '일반동사 의문문 (Do you like ~?)',
          canDo: '상대의 취향을 물을 수 있다.',
          explanation:
            '문장 앞에 **Do** 를 놓으면 질문이 됩니다.\n\n' +
            '- You like dogs. → **Do** you like dogs?\n\n' +
            '동사는 원래 모양 그대로 둡니다.',
        },
        {
          title: 'Yes, I do. / No, I don’t.',
          canDo: '짧은 대답으로 응답할 수 있다.',
          explanation:
            'Do 로 물으면 **do** 로 답합니다.\n\n' +
            '- Do you like cats? — **Yes, I do.** / **No, I don’t.**',
        },
      ],
      vocabulary: [
        { en: 'dog', ko: '개', pos: 'noun', ex: 'My dog is big.', exKo: '우리 개는 커요.' },
        { en: 'cat', ko: '고양이', pos: 'noun', ex: 'The cat is white.', exKo: '그 고양이는 하얀색이에요.' },
        { en: 'bird', ko: '새', pos: 'noun', ex: 'The bird is small.', exKo: '그 새는 작아요.' },
        { en: 'rabbit', ko: '토끼', pos: 'noun', ex: 'The rabbit is small.', exKo: '그 토끼는 작아요.' },
        { en: 'horse', ko: '말', pos: 'noun', ex: 'The horse is brown.', exKo: '그 말은 갈색이에요.' },
        { en: 'cow', ko: '소', pos: 'noun', ex: 'The cow is big.', exKo: '그 소는 커요.' },
        { en: 'pig', ko: '돼지', pos: 'noun', ex: 'The pig is pink.', exKo: '그 돼지는 분홍색이에요.' },
        { en: 'lion', ko: '사자', pos: 'noun', ex: 'I like lions.', exKo: '저는 사자를 좋아해요.' },
        { en: 'tiger', ko: '호랑이', pos: 'noun', ex: 'I like tigers.', exKo: '저는 호랑이를 좋아해요.' },
        { en: 'elephant', ko: '코끼리', pos: 'noun', ex: 'The elephant is big.', exKo: '그 코끼리는 커요.' },
        { en: 'monkey', ko: '원숭이', pos: 'noun', ex: 'Monkeys jump.', exKo: '원숭이들은 뛰어요.' },
        { en: 'animal', ko: '동물', pos: 'noun', ex: 'I like animals.', exKo: '저는 동물을 좋아해요.' },
        { en: 'pet', ko: '반려동물', pos: 'noun', ex: 'My pet is a cat.', exKo: '제 반려동물은 고양이예요.' },
        { en: 'tail', ko: '꼬리', pos: 'noun', ex: 'The tail is long.', exKo: '그 꼬리는 길어요.' },
        { en: 'run', ko: '달리다', pos: 'verb', ex: 'Horses run.', exKo: '말들은 달려요.' },
        { en: 'jump', ko: '뛰다', pos: 'verb', ex: 'Rabbits jump.', exKo: '토끼들은 뛰어요.' },
        { en: 'fly', ko: '날다', pos: 'verb', ex: 'Birds fly.', exKo: '새들은 날아요.' },
        { en: 'cute', ko: '귀여운', pos: 'adjective', ex: 'The rabbit is cute.', exKo: '그 토끼는 귀여워요.' },
      ],
      text: {
        kind: 'dialogue',
        title: 'Do you like animals?',
        body:
          'A: Do you like animals?\nB: Yes, I do. I like rabbits. They are cute.\nA: Do you like dogs?\nB: No, I don’t. Do you?\nA: Yes! My pet is a dog. He is big and brown.\nB: Is he cute?\nA: Yes! He runs and jumps.',
        bodyKo:
          'A: 동물 좋아해?\nB: 응, 좋아해. 나는 토끼를 좋아해. 귀엽거든.\nA: 개는 좋아해?\nB: 아니, 안 좋아해. 너는?\nA: 응! 우리 반려동물이 개야. 크고 갈색이야.\nB: 귀여워?\nA: 응! 달리고 뛰어.',
      },
      canDo: [
        { skill: 'listening', statement: '동물 이름을 듣고 그림에서 고를 수 있다.' },
        { skill: 'listening', statement: 'Do you like ~? 질문과 대답을 듣고 좋아하는지 알 수 있다.' },
        { skill: 'reading', statement: '동물을 묘사한 짧은 글을 읽고 어떤 동물인지 맞힐 수 있다.' },
        { skill: 'reading', statement: '질문과 대답을 읽고 알맞게 짝지을 수 있다.' },
        { skill: 'speaking', statement: 'Do you like ~? 로 묻고 Yes/No 로 답할 수 있다.' },
        { skill: 'speaking', statement: '좋아하는 동물을 색과 크기를 넣어 소개할 수 있다.' },
        { skill: 'writing', statement: 'Do you like ~? 형태의 의문문을 쓸 수 있다.' },
        { skill: 'writing', statement: '좋아하는 동물을 소개하는 문장 세 개를 쓸 수 있다.' },
      ],
    },

    {
      order: 11,
      title: 'My Day',
      titleKo: '하루 일과',
      theme: '일상',
      grammar: [
        {
          title: '현재시제 일과 표현',
          canDo: '반복되는 일상을 말할 수 있다.',
          explanation:
            '매일 하는 일은 현재형으로 씁니다.\n\n' +
            '- I **get up** at seven.\n- I **go** to school.\n- I **sleep** at ten.',
        },
        {
          title: '시각 말하기 (at seven / o’clock)',
          canDo: '몇 시에 하는지 말할 수 있다.',
          explanation:
            '- It is seven **o’clock**. 일곱 시예요.\n' +
            '- What time is it? 몇 시예요?',
        },
        {
          title: '시간 전치사 at',
          canDo: '시각을 문장에 넣을 수 있다.',
          explanation:
            '정확한 시각 앞에는 **at** 을 씁니다.\n\n' +
            '- I eat lunch **at** one.\n- I go home **at** five.',
        },
      ],
      vocabulary: [
        { en: 'get up', ko: '일어나다', pos: 'verb', type: 'phrasal_verb', ex: 'I get up at seven.', exKo: '저는 일곱 시에 일어나요.' },
        { en: 'wash', ko: '씻다', pos: 'verb', ex: 'I wash my cup.', exKo: '저는 제 컵을 씻어요.' },
        { en: 'go', ko: '가다', pos: 'verb', ex: 'I go to school.', exKo: '저는 학교에 가요.' },
        { en: 'come', ko: '오다', pos: 'verb', ex: 'Come here, please.', exKo: '이리 오세요.' },
        { en: 'study', ko: '공부하다', pos: 'verb', ex: 'I study at home.', exKo: '저는 집에서 공부해요.' },
        { en: 'play', ko: '놀다', pos: 'verb', ex: 'I play in my room.', exKo: '저는 제 방에서 놀아요.' },
        { en: 'sleep', ko: '자다', pos: 'verb', ex: 'I sleep at ten.', exKo: '저는 열 시에 자요.' },
        { en: 'morning', ko: '아침', pos: 'noun', ex: 'I study in the morning.', exKo: '저는 아침에 공부해요.' },
        { en: 'afternoon', ko: '오후', pos: 'noun', ex: 'I play in the afternoon.', exKo: '저는 오후에 놀아요.' },
        { en: 'evening', ko: '저녁', pos: 'noun', ex: 'I eat dinner in the evening.', exKo: '저는 저녁에 저녁밥을 먹어요.' },
        { en: 'night', ko: '밤', pos: 'noun', ex: 'Good night!', exKo: '잘 자요!' },
        { en: 'day', ko: '날, 하루', pos: 'noun', ex: 'It is a long day.', exKo: '긴 하루예요.' },
        { en: 'time', ko: '시간', pos: 'noun', ex: 'What time is it?', exKo: '몇 시예요?' },
        { en: 'home', ko: '집', pos: 'noun', ex: 'I go home at five.', exKo: '저는 다섯 시에 집에 가요.' },
        { en: 'breakfast', ko: '아침 식사', pos: 'noun', ex: 'I eat breakfast at seven.', exKo: '저는 일곱 시에 아침을 먹어요.' },
        { en: 'lunch', ko: '점심 식사', pos: 'noun', ex: 'Lunch is at one.', exKo: '점심은 한 시예요.' },
        { en: 'dinner', ko: '저녁 식사', pos: 'noun', ex: 'I eat dinner at seven.', exKo: '저는 일곱 시에 저녁을 먹어요.' },
        { en: 'early', ko: '이른, 일찍', pos: 'adjective', ex: 'I get up early.', exKo: '저는 일찍 일어나요.' },
        { en: 'late', ko: '늦은, 늦게', pos: 'adjective', ex: 'I sleep late.', exKo: '저는 늦게 자요.' },
      ],
      text: {
        kind: 'reading',
        title: 'My Day',
        body:
          'I get up at seven. I wash and eat breakfast.\nI go to school at eight. My school is big.\nLunch is at one. I eat rice and soup.\nIn the afternoon, I study at home. I go home at five.\nI eat dinner at seven. I sleep at ten.\nIt is a good day!',
        bodyKo:
          '저는 일곱 시에 일어나요. 씻고 아침을 먹어요.\n여덟 시에 학교에 가요. 우리 학교는 커요.\n점심은 한 시예요. 저는 밥과 국을 먹어요.\n오후에는 집에서 공부해요. 다섯 시에 집에 가요.\n일곱 시에 저녁을 먹어요. 열 시에 자요.\n좋은 하루예요!',
      },
      canDo: [
        { skill: 'listening', statement: '시각을 듣고 시계 그림과 연결할 수 있다.' },
        { skill: 'listening', statement: '하루 일과를 듣고 일어난 순서대로 정리할 수 있다.' },
        { skill: 'reading', statement: '일과표를 읽고 시간과 활동을 연결할 수 있다.' },
        { skill: 'reading', statement: '하루를 설명한 글을 읽고 순서를 파악할 수 있다.' },
        { skill: 'speaking', statement: '자기 하루 일과를 시간과 함께 세 가지 이상 말할 수 있다.' },
        { skill: 'speaking', statement: '몇 시에 무엇을 하는지 묻고 답할 수 있다.' },
        { skill: 'writing', statement: 'I get up at seven. 같은 시각 표현 문장을 쓸 수 있다.' },
        { skill: 'writing', statement: '자기 하루를 네 문장으로 순서대로 쓸 수 있다.' },
      ],
    },

    {
      order: 12,
      title: 'Can You?',
      titleKo: '할 수 있는 것',
      theme: '능력',
      grammar: [
        {
          title: 'can / can’t',
          canDo: '할 수 있는 일과 없는 일을 말할 수 있다.',
          explanation:
            '**can** 뒤에는 동사의 원래 모양이 옵니다.\n\n' +
            '- I **can** swim. 나는 수영할 수 있다.\n' +
            '- I **can’t** cook. 나는 요리하지 못한다.\n\n' +
            '주어가 he·she 여도 can 은 모양이 바뀌지 않습니다.',
        },
        {
          title: 'Can you ~? 의문문',
          canDo: '상대가 할 수 있는지 물을 수 있다.',
          explanation:
            '**Can** 을 앞으로 보내면 질문이 됩니다.\n\n' +
            '- **Can** you ride a bike? — Yes, I can. / No, I can’t.',
        },
      ],
      vocabulary: [
        { en: 'can', ko: '~할 수 있다', pos: 'verb', ex: 'I can swim.', exKo: '저는 수영할 수 있어요.' },
        { en: 'swim', ko: '수영하다', pos: 'verb', ex: 'I can swim well.', exKo: '저는 수영을 잘해요.' },
        { en: 'ride', ko: '타다', pos: 'verb', ex: 'I can ride a bike.', exKo: '저는 자전거를 탈 수 있어요.' },
        { en: 'sing', ko: '노래하다', pos: 'verb', ex: 'She can sing a song.', exKo: '그 애는 노래를 부를 수 있어요.' },
        { en: 'dance', ko: '춤추다', pos: 'verb', ex: 'We can dance together.', exKo: '우리는 함께 춤출 수 있어요.' },
        { en: 'draw', ko: '그리다', pos: 'verb', ex: 'I can draw a cat.', exKo: '저는 고양이를 그릴 수 있어요.' },
        { en: 'cook', ko: '요리하다', pos: 'verb', ex: 'My mother can cook.', exKo: '우리 엄마는 요리할 수 있어요.' },
        { en: 'read', ko: '읽다', pos: 'verb', ex: 'I can read English.', exKo: '저는 영어를 읽을 수 있어요.' },
        { en: 'write', ko: '쓰다', pos: 'verb', ex: 'I can write my name.', exKo: '저는 제 이름을 쓸 수 있어요.' },
        { en: 'speak', ko: '말하다', pos: 'verb', ex: 'I can speak Korean.', exKo: '저는 한국어를 말할 수 있어요.' },
        { en: 'help', ko: '돕다', pos: 'verb', ex: 'Can you help me?', exKo: '저 좀 도와줄래요?' },
        { en: 'try', ko: '해 보다', pos: 'verb', ex: 'Try again!', exKo: '다시 해 봐요!' },
        { en: 'well', ko: '잘', pos: 'adverb', ex: 'He can sing well.', exKo: '그는 노래를 잘해요.' },
        { en: 'again', ko: '다시', pos: 'adverb', ex: 'Read it again, please.', exKo: '다시 읽어 주세요.' },
        { en: 'together', ko: '함께', pos: 'adverb', ex: 'We study together.', exKo: '우리는 함께 공부해요.' },
        { en: 'English', ko: '영어', pos: 'noun', ex: 'I like English.', exKo: '저는 영어를 좋아해요.' },
        { en: 'Korean', ko: '한국어', pos: 'noun', ex: 'I speak Korean.', exKo: '저는 한국어를 해요.' },
        { en: 'bike', ko: '자전거', pos: 'noun', ex: 'My bike is red.', exKo: '제 자전거는 빨간색이에요.' },
        { en: 'song', ko: '노래', pos: 'noun', ex: 'This song is nice.', exKo: '이 노래는 좋아요.' },
        { en: 'game', ko: '놀이, 게임', pos: 'noun', ex: 'We play a game.', exKo: '우리는 게임을 해요.' },
      ],
      text: {
        kind: 'dialogue',
        title: 'Can you swim?',
        body:
          'A: Can you swim?\nB: Yes, I can. I swim well.\nA: Can you ride a bike?\nB: No, I can’t. Can you?\nA: Yes, I can. My bike is red.\nB: Can you help me? I want to try.\nA: Sure! We can go together.',
        bodyKo:
          'A: 수영할 수 있어?\nB: 응, 할 수 있어. 나는 수영을 잘해.\nA: 자전거는 탈 수 있어?\nB: 아니, 못 타. 너는?\nA: 응, 탈 수 있어. 내 자전거는 빨간색이야.\nB: 나 좀 도와줄래? 해 보고 싶어.\nA: 물론이지! 같이 갈 수 있어.',
      },
      canDo: [
        { skill: 'listening', statement: 'can 과 can’t 를 듣고 구별할 수 있다.' },
        { skill: 'listening', statement: '누가 무엇을 할 수 있는지 듣고 표에 표시할 수 있다.' },
        { skill: 'reading', statement: 'can 문장을 읽고 가능한지 아닌지 판단할 수 있다.' },
        { skill: 'reading', statement: '인물 소개 글을 읽고 그 사람이 할 수 있는 일을 찾을 수 있다.' },
        { skill: 'speaking', statement: '자기가 할 수 있는 것과 할 수 없는 것을 말할 수 있다.' },
        { skill: 'speaking', statement: 'Can you ~? 로 묻고 답할 수 있다.' },
        { skill: 'writing', statement: 'can 과 can’t 문장을 구별해 쓸 수 있다.' },
        { skill: 'writing', statement: '자기가 할 수 있는 일 세 가지를 문장으로 쓸 수 있다.' },
      ],
    },

    {
      order: 13,
      title: 'My Friends',
      titleKo: '내 친구',
      theme: '관계',
      grammar: [
        {
          title: '3인칭 단수 현재형 (He likes / She has)',
          canDo: '제3자의 행동과 취향을 말할 수 있다.',
          explanation:
            '주어가 he·she·이름 하나일 때 동사 뒤에 **-s** 를 붙입니다.\n\n' +
            '- I like cats. → He **likes** cats.\n' +
            '- I have a bike. → She **has** a bike. (have → **has**)\n\n' +
            'A1.1 에서 가장 자주 틀리는 부분입니다. 주어를 먼저 보는 습관을 들입니다.',
        },
        {
          title: '인물 묘사 형용사',
          canDo: '사람의 성격을 말할 수 있다.',
          explanation:
            '- He is **funny**. 그는 재미있다.\n' +
            '- She is **quiet**. 그녀는 조용하다.\n' +
            '- They are **kind**. 그들은 친절하다.',
        },
      ],
      vocabulary: [
        { en: 'friend', ko: '친구', pos: 'noun', ex: 'She is my friend.', exKo: '그 애는 제 친구예요.' },
        { en: 'classmate', ko: '반 친구', pos: 'noun', ex: 'He is my classmate.', exKo: '그 애는 제 반 친구예요.' },
        { en: 'boy', ko: '소년', pos: 'noun', ex: 'The boy is tall.', exKo: '그 남자아이는 키가 커요.' },
        { en: 'girl', ko: '소녀', pos: 'noun', ex: 'The girl can sing.', exKo: '그 여자아이는 노래할 수 있어요.' },
        { en: 'party', ko: '파티', pos: 'noun', ex: 'I go to a party.', exKo: '저는 파티에 가요.' },
        { en: 'gift', ko: '선물', pos: 'noun', ex: 'I have a gift.', exKo: '저는 선물이 있어요.' },
        { en: 'funny', ko: '재미있는', pos: 'adjective', ex: 'My friend is funny.', exKo: '제 친구는 재미있어요.' },
        { en: 'smart', ko: '똑똑한', pos: 'adjective', ex: 'She is smart.', exKo: '그 애는 똑똑해요.' },
        { en: 'quiet', ko: '조용한', pos: 'adjective', ex: 'He is quiet.', exKo: '그 애는 조용해요.' },
        { en: 'best', ko: '가장 좋은', pos: 'adjective', ex: 'She is my best friend.', exKo: '그 애는 제 가장 친한 친구예요.' },
        { en: 'happy', ko: '행복한', pos: 'adjective', ex: 'I am happy.', exKo: '저는 행복해요.' },
        { en: 'sad', ko: '슬픈', pos: 'adjective', ex: 'He is sad.', exKo: '그 애는 슬퍼요.' },
        { en: 'same', ko: '같은', pos: 'adjective', ex: 'We are in the same class.', exKo: '우리는 같은 반이에요.' },
        { en: 'different', ko: '다른', pos: 'adjective', ex: 'Our bags are different.', exKo: '우리 가방은 서로 달라요.' },
        { en: 'favorite', ko: '가장 좋아하는', pos: 'adjective', ex: 'Blue is my favorite color.', exKo: '파란색은 제가 가장 좋아하는 색이에요.' },
        { en: 'know', ko: '알다', pos: 'verb', ex: 'I know her name.', exKo: '저는 그 애 이름을 알아요.' },
        { en: 'talk', ko: '이야기하다', pos: 'verb', ex: 'We talk in the morning.', exKo: '우리는 아침에 이야기해요.' },
        { en: 'laugh', ko: '웃다', pos: 'verb', ex: 'We laugh together.', exKo: '우리는 함께 웃어요.' },
        { en: 'share', ko: '나누다', pos: 'verb', ex: 'I share my food.', exKo: '저는 제 음식을 나눠요.' },
        { en: 'always', ko: '항상', pos: 'adverb', ex: 'She is always kind.', exKo: '그 애는 항상 친절해요.' },
        { en: 'sometimes', ko: '가끔', pos: 'adverb', ex: 'I sometimes play games.', exKo: '저는 가끔 게임을 해요.' },
      ],
      text: {
        kind: 'reading',
        title: 'My Best Friend',
        body:
          'This is Jiho. He is my best friend. He is ten years old.\nWe are in the same class. He is next to me.\nJiho likes animals. He has a cat. It is white and cute.\nHe can draw well. He is quiet, but he is funny, too.\nWe talk and laugh together. I am happy.',
        bodyKo:
          '이 애는 지호예요. 제 가장 친한 친구예요. 열 살이에요.\n우리는 같은 반이에요. 지호는 제 옆에 있어요.\n지호는 동물을 좋아해요. 고양이를 키워요. 하얗고 귀여워요.\n그림을 잘 그려요. 조용하지만 재미있기도 해요.\n우리는 함께 이야기하고 웃어요. 저는 행복해요.',
      },
      canDo: [
        { skill: 'listening', statement: '친구를 소개하는 말을 듣고 그 친구의 특징을 파악할 수 있다.' },
        { skill: 'listening', statement: 'He 와 She 를 듣고 누구를 가리키는지 알 수 있다.' },
        { skill: 'reading', statement: '친구 소개 글을 읽고 인물의 특징을 정리할 수 있다.' },
        { skill: 'reading', statement: '3인칭 단수 문장을 읽고 누구에 대한 이야기인지 찾을 수 있다.' },
        { skill: 'speaking', statement: '친구를 이름·나이·좋아하는 것과 함께 소개할 수 있다.' },
        { skill: 'speaking', statement: 'He likes ~ / She has ~ 형태로 말할 수 있다.' },
        { skill: 'writing', statement: '3인칭 단수에 -s 를 붙여 문장을 쓸 수 있다.' },
        { skill: 'writing', statement: '친구를 소개하는 문장 네 개를 쓸 수 있다.' },
      ],
    },

    {
      order: 14,
      title: 'About Me',
      titleKo: '나를 소개해요',
      theme: '통합·발표',
      isReview: true,
      grammar: [
        {
          title: '1–13단원 통합',
          canDo: '배운 것을 모두 이어 자기소개를 완성할 수 있다.',
          explanation:
            '발표는 이 순서로 짜면 자연스럽습니다.\n\n' +
            '1. 인사 — Hello! My name is ~\n' +
            '2. 나이 — I am ~ years old.\n' +
            '3. 가족 — This is my family. My ~ is ~\n' +
            '4. 좋아하는 것 — I like ~ / I don’t like ~\n' +
            '5. 할 수 있는 것 — I can ~\n' +
            '6. 하루 — I get up at ~ / I go to school.\n' +
            '7. 마무리 — Thank you!\n\n' +
            '문장을 다 외우려 하지 말고, 이 순서만 기억하면 됩니다.',
        },
      ],
      vocabulary: [],
      text: {
        kind: 'reading',
        title: 'About Me — 발표 예시',
        body:
          'Hello! My name is Mina. I am ten years old.\nThis is my family. My mother is kind and my father is tall.\nI have one brother. He is six.\nI like apples and cake. I don’t like milk.\nI can swim and I can draw. I can’t cook.\nI get up at seven and I go to school at eight.\nMy favorite color is blue. Thank you!',
        bodyKo:
          '안녕하세요! 제 이름은 미나예요. 저는 열 살이에요.\n이쪽은 우리 가족이에요. 우리 엄마는 친절하고 아빠는 키가 커요.\n저는 남동생이 한 명 있어요. 여섯 살이에요.\n저는 사과와 케이크를 좋아해요. 우유는 안 좋아해요.\n저는 수영할 수 있고 그림도 그릴 수 있어요. 요리는 못해요.\n저는 일곱 시에 일어나고 여덟 시에 학교에 가요.\n제가 가장 좋아하는 색은 파란색이에요. 감사합니다!',
      },
      canDo: [
        { skill: 'listening', statement: '또래의 자기소개 발표를 듣고 핵심 정보를 파악할 수 있다.' },
        { skill: 'listening', statement: '발표를 듣고 그 사람에게 물어볼 질문 한 가지를 만들 수 있다.' },
        { skill: 'reading', statement: '자기소개 글을 읽고 인물 정보를 표로 정리할 수 있다.' },
        { skill: 'reading', statement: '여러 사람의 소개 글을 읽고 공통점을 찾을 수 있다.' },
        { skill: 'speaking', statement: '자기소개를 이어진 3–4문장으로 할 수 있다.' },
        { skill: 'speaking', statement: '발표 후 간단한 질문에 답할 수 있다.' },
        { skill: 'writing', statement: '자기소개 글을 다섯 문장 이상으로 쓸 수 있다.' },
        { skill: 'writing', statement: '대문자·마침표·띄어쓰기를 지켜 글을 쓸 수 있다.' },
      ],
    },
  ],
}

/** 지금까지 원안이 작성된 레벨 */
export const SEED_LEVELS = [A1_1]

export function seedFor(levelCode: string) {
  return SEED_LEVELS.find((l) => l.levelCode === levelCode)
}
