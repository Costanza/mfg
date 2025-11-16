// Difficulty level configuration for the millionaire game
// 15 questions with increasing difficulty

export const DIFFICULTY_LEVELS = {
    EASY: 'easy',           // Questions 1-5: $100 - $1,000
    MEDIUM: 'medium',       // Questions 6-7: $2,000 - $4,000
    HARD: 'hard',           // Questions 8-10: $8,000 - $32,000
    BRUTAL: 'brutal'        // Questions 11-15: $64,000 - $1,000,000 (Jeopardy level)
};

export const PRIZE_LADDER = [
    { question: 1, prize: '$100', difficulty: DIFFICULTY_LEVELS.EASY },
    { question: 2, prize: '$200', difficulty: DIFFICULTY_LEVELS.EASY },
    { question: 3, prize: '$300', difficulty: DIFFICULTY_LEVELS.EASY },
    { question: 4, prize: '$500', difficulty: DIFFICULTY_LEVELS.EASY },
    { question: 5, prize: '$1,000', difficulty: DIFFICULTY_LEVELS.EASY },
    { question: 6, prize: '$2,000', difficulty: DIFFICULTY_LEVELS.MEDIUM },
    { question: 7, prize: '$4,000', difficulty: DIFFICULTY_LEVELS.MEDIUM },
    { question: 8, prize: '$8,000', difficulty: DIFFICULTY_LEVELS.HARD },
    { question: 9, prize: '$16,000', difficulty: DIFFICULTY_LEVELS.HARD },
    { question: 10, prize: '$32,000', difficulty: DIFFICULTY_LEVELS.HARD },
    { question: 11, prize: '$64,000', difficulty: DIFFICULTY_LEVELS.BRUTAL },
    { question: 12, prize: '$125,000', difficulty: DIFFICULTY_LEVELS.BRUTAL },
    { question: 13, prize: '$250,000', difficulty: DIFFICULTY_LEVELS.BRUTAL },
    { question: 14, prize: '$500,000', difficulty: DIFFICULTY_LEVELS.BRUTAL },
    { question: 15, prize: '$1,000,000', difficulty: DIFFICULTY_LEVELS.BRUTAL }
];

export const TOTAL_QUESTIONS = 15;

// Categorize questions by difficulty based on their ID ranges
// This is a heuristic - you can adjust these ranges based on actual question difficulty
export function assignDifficultyToQuestions(questions) {
    return questions.map(question => {
        const qNum = parseInt(question.id.replace('q', ''));

        // Easy questions: Original basic questions (q1-q40)
        if (qNum <= 40 || (qNum >= 156 && qNum <= 175)) {
            return { ...question, difficulty: DIFFICULTY_LEVELS.EASY };
        }

        // Medium questions: Basic geography, history, science (q41-q90, q136-q155)
        if ((qNum >= 41 && qNum <= 90) || (qNum >= 136 && qNum <= 155)) {
            return { ...question, difficulty: DIFFICULTY_LEVELS.MEDIUM };
        }

        // Hard questions: Arts, entertainment, sports, basic Australian (q91-q135, q176-q235, q296-q315)
        if ((qNum >= 91 && qNum <= 135) || (qNum >= 176 && qNum <= 235) || (qNum >= 296 && qNum <= 315)) {
            return { ...question, difficulty: DIFFICULTY_LEVELS.HARD };
        }

        // BRUTAL questions: Etymology, obscure authors, colors, advanced Australian, all new categories (q236-q295, q316+)
        // These are Jeopardy-level difficulty - extremely obscure
        return { ...question, difficulty: DIFFICULTY_LEVELS.BRUTAL };
    });
}

// Select questions for a game with proper difficulty progression
export function selectGameQuestions(allQuestions) {
    const questionsWithDifficulty = assignDifficultyToQuestions(allQuestions);

    // Separate questions by difficulty
    const easyQuestions = questionsWithDifficulty.filter(q => q.difficulty === DIFFICULTY_LEVELS.EASY);
    const mediumQuestions = questionsWithDifficulty.filter(q => q.difficulty === DIFFICULTY_LEVELS.MEDIUM);
    const hardQuestions = questionsWithDifficulty.filter(q => q.difficulty === DIFFICULTY_LEVELS.HARD);
    const brutalQuestions = questionsWithDifficulty.filter(q => q.difficulty === DIFFICULTY_LEVELS.BRUTAL);

    // Shuffle each difficulty pool
    const shuffledEasy = [...easyQuestions].sort(() => Math.random() - 0.5);
    const shuffledMedium = [...mediumQuestions].sort(() => Math.random() - 0.5);
    const shuffledHard = [...hardQuestions].sort(() => Math.random() - 0.5);
    const shuffledBrutal = [...brutalQuestions].sort(() => Math.random() - 0.5);

    // Select questions according to the prize ladder
    const gameQuestions = [];

    // Questions 1-5: Easy (warm-up)
    gameQuestions.push(...shuffledEasy.slice(0, 5));

    // Questions 6-7: Medium (getting harder)
    gameQuestions.push(...shuffledMedium.slice(0, 2));

    // Questions 8-10: Hard (challenging)
    gameQuestions.push(...shuffledHard.slice(0, 3));

    // Questions 11-15: BRUTAL (Jeopardy-level, nearly impossible)
    gameQuestions.push(...shuffledBrutal.slice(0, 5));

    return gameQuestions;
}
