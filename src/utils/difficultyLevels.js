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
// This distributes questions evenly across difficulty levels
export function assignDifficultyToQuestions(questions) {
    // Shuffle questions first to ensure random distribution
    const shuffled = [...questions].sort(() => Math.random() - 0.5);

    // Calculate how many questions per difficulty level
    const totalQuestions = shuffled.length;
    const easyCount = Math.floor(totalQuestions * 0.35);      // 35% easy
    const mediumCount = Math.floor(totalQuestions * 0.25);    // 25% medium
    const hardCount = Math.floor(totalQuestions * 0.25);      // 25% hard
    // Remaining questions are brutal (approximately 15%)

    return shuffled.map((question, index) => {
        let difficulty;

        if (index < easyCount) {
            difficulty = DIFFICULTY_LEVELS.EASY;
        } else if (index < easyCount + mediumCount) {
            difficulty = DIFFICULTY_LEVELS.MEDIUM;
        } else if (index < easyCount + mediumCount + hardCount) {
            difficulty = DIFFICULTY_LEVELS.HARD;
        } else {
            difficulty = DIFFICULTY_LEVELS.BRUTAL;
        }

        return { ...question, difficulty };
    });
}

// Fisher-Yates shuffle for better randomization
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Select questions for a game with proper difficulty progression
export function selectGameQuestions(allQuestions) {
    const questionsWithDifficulty = assignDifficultyToQuestions(allQuestions);

    // Separate questions by difficulty
    const easyQuestions = questionsWithDifficulty.filter(q => q.difficulty === DIFFICULTY_LEVELS.EASY);
    const mediumQuestions = questionsWithDifficulty.filter(q => q.difficulty === DIFFICULTY_LEVELS.MEDIUM);
    const hardQuestions = questionsWithDifficulty.filter(q => q.difficulty === DIFFICULTY_LEVELS.HARD);
    const brutalQuestions = questionsWithDifficulty.filter(q => q.difficulty === DIFFICULTY_LEVELS.BRUTAL);

    // Use Fisher-Yates shuffle for better randomization
    const shuffledEasy = shuffleArray(easyQuestions);
    const shuffledMedium = shuffleArray(mediumQuestions);
    const shuffledHard = shuffleArray(hardQuestions);
    const shuffledBrutal = shuffleArray(brutalQuestions);

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
