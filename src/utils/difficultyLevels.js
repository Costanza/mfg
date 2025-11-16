// Difficulty level configuration for the millionaire game
// 15 questions with increasing difficulty

export const DIFFICULTY_LEVELS = {
    EASY: 'easy',       // Questions 1-5: $100 - $1,000
    MEDIUM: 'medium',   // Questions 6-10: $2,000 - $32,000
    HARD: 'hard'        // Questions 11-15: $64,000 - $1,000,000
};

export const PRIZE_LADDER = [
    { question: 1, prize: '$100', difficulty: DIFFICULTY_LEVELS.EASY },
    { question: 2, prize: '$200', difficulty: DIFFICULTY_LEVELS.EASY },
    { question: 3, prize: '$300', difficulty: DIFFICULTY_LEVELS.EASY },
    { question: 4, prize: '$500', difficulty: DIFFICULTY_LEVELS.EASY },
    { question: 5, prize: '$1,000', difficulty: DIFFICULTY_LEVELS.EASY },
    { question: 6, prize: '$2,000', difficulty: DIFFICULTY_LEVELS.MEDIUM },
    { question: 7, prize: '$4,000', difficulty: DIFFICULTY_LEVELS.MEDIUM },
    { question: 8, prize: '$8,000', difficulty: DIFFICULTY_LEVELS.MEDIUM },
    { question: 9, prize: '$16,000', difficulty: DIFFICULTY_LEVELS.MEDIUM },
    { question: 10, prize: '$32,000', difficulty: DIFFICULTY_LEVELS.MEDIUM },
    { question: 11, prize: '$64,000', difficulty: DIFFICULTY_LEVELS.HARD },
    { question: 12, prize: '$125,000', difficulty: DIFFICULTY_LEVELS.HARD },
    { question: 13, prize: '$250,000', difficulty: DIFFICULTY_LEVELS.HARD },
    { question: 14, prize: '$500,000', difficulty: DIFFICULTY_LEVELS.HARD },
    { question: 15, prize: '$1,000,000', difficulty: DIFFICULTY_LEVELS.HARD }
];

export const TOTAL_QUESTIONS = 15;

// Categorize questions by difficulty based on their ID ranges
// This is a heuristic - you can adjust these ranges based on actual question difficulty
export function assignDifficultyToQuestions(questions) {
    return questions.map(question => {
        const qNum = parseInt(question.id.replace('q', ''));

        // Easy questions: Original questions, basic geography, basic science
        if (qNum <= 40 || (qNum >= 66 && qNum <= 75) || (qNum >= 156 && qNum <= 165)) {
            return { ...question, difficulty: DIFFICULTY_LEVELS.EASY };
        }

        // Hard questions: Etymology, specific authors, colors theory, Australian specific
        if (qNum >= 236 || (qNum >= 91 && qNum <= 110) || (qNum >= 196 && qNum <= 215)) {
            return { ...question, difficulty: DIFFICULTY_LEVELS.HARD };
        }

        // Medium questions: Everything else
        return { ...question, difficulty: DIFFICULTY_LEVELS.MEDIUM };
    });
}

// Select questions for a game with proper difficulty progression
export function selectGameQuestions(allQuestions) {
    const questionsWithDifficulty = assignDifficultyToQuestions(allQuestions);

    // Separate questions by difficulty
    const easyQuestions = questionsWithDifficulty.filter(q => q.difficulty === DIFFICULTY_LEVELS.EASY);
    const mediumQuestions = questionsWithDifficulty.filter(q => q.difficulty === DIFFICULTY_LEVELS.MEDIUM);
    const hardQuestions = questionsWithDifficulty.filter(q => q.difficulty === DIFFICULTY_LEVELS.HARD);

    // Shuffle each difficulty pool
    const shuffledEasy = [...easyQuestions].sort(() => Math.random() - 0.5);
    const shuffledMedium = [...mediumQuestions].sort(() => Math.random() - 0.5);
    const shuffledHard = [...hardQuestions].sort(() => Math.random() - 0.5);

    // Select questions according to the prize ladder
    const gameQuestions = [];

    // Questions 1-5: Easy
    gameQuestions.push(...shuffledEasy.slice(0, 5));

    // Questions 6-10: Medium
    gameQuestions.push(...shuffledMedium.slice(0, 5));

    // Questions 11-15: Hard
    gameQuestions.push(...shuffledHard.slice(0, 5));

    return gameQuestions;
}
