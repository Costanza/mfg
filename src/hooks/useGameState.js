import { useState, useEffect } from 'react';
import { selectGameQuestions, TOTAL_QUESTIONS } from '../utils/difficultyLevels';

// Fallback sample questions in case JSON loading fails
const FALLBACK_QUESTIONS = [
    {
        id: "fallback1",
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2
    },
    {
        id: "fallback2",
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        id: "fallback3",
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3
    },
    {
        id: "fallback4",
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: 1
    },
    {
        id: "fallback5",
        question: "What is the smallest prime number?",
        answers: ["0", "1", "2", "3"],
        correctAnswer: 2
    }
];

export function useGameState() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [gameComplete, setGameComplete] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usingFallback, setUsingFallback] = useState(false);

    // Load questions from JSON file on mount
    useEffect(() => {
        const loadQuestions = async () => {
            try {
                setLoading(true);
                setError(null);
                setUsingFallback(false);
                const response = await fetch('/data/questions.json');

                if (!response.ok) {
                    throw new Error('Failed to load questions');
                }

                const data = await response.json();

                if (!data.questions || data.questions.length === 0) {
                    throw new Error('No questions available');
                }

                // Select 15 questions with increasing difficulty
                const gameQuestions = selectGameQuestions(data.questions);
                setQuestions(gameQuestions);
                setLoading(false);
            } catch (err) {
                console.warn('Failed to load questions from JSON:', err.message);
                console.log('Using fallback sample questions');
                setError(err.message);
                setUsingFallback(true);
                setQuestions(FALLBACK_QUESTIONS);
                setLoading(false);
            }
        };

        loadQuestions();
    }, []);

    // Get current question
    const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

    // Handle answer selection
    const selectAnswer = (answerIndex) => {
        if (selectedAnswer !== null) {
            return; // Prevent changing answer after selection
        }

        setSelectedAnswer(answerIndex);

        // Update score based on correctness
        if (answerIndex === currentQuestion.correctAnswer) {
            setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
        } else {
            setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
        }
    };

    // Advance to next question
    const nextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;

        if (nextIndex >= TOTAL_QUESTIONS) {
            setGameComplete(true);
        } else {
            setCurrentQuestionIndex(nextIndex);
            setSelectedAnswer(null);
        }
    };

    // Restart the game
    const restartGame = () => {
        // Load questions from JSON again to get a fresh set
        setLoading(true);
        fetch('/data/questions.json')
            .then(response => response.json())
            .then(data => {
                // Select new 15 questions with increasing difficulty
                const gameQuestions = selectGameQuestions(data.questions);
                setQuestions(gameQuestions);
                setCurrentQuestionIndex(0);
                setSelectedAnswer(null);
                setScore({ correct: 0, incorrect: 0 });
                setGameComplete(false);
                setLoading(false);
            })
            .catch(err => {
                console.warn('Failed to reload questions:', err.message);
                // If reload fails, just shuffle existing questions
                const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5).slice(0, TOTAL_QUESTIONS);
                setQuestions(shuffledQuestions);
                setCurrentQuestionIndex(0);
                setSelectedAnswer(null);
                setScore({ correct: 0, incorrect: 0 });
                setGameComplete(false);
                setLoading(false);
            });
    };

    // Retry loading questions from JSON
    const retryLoad = () => {
        setLoading(true);
        setError(null);
        setUsingFallback(false);

        fetch('/data/questions.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load questions');
                }
                return response.json();
            })
            .then(data => {
                if (!data.questions || data.questions.length === 0) {
                    throw new Error('No questions available');
                }
                // Select 15 questions with increasing difficulty
                const gameQuestions = selectGameQuestions(data.questions);
                setQuestions(gameQuestions);
                setLoading(false);
                // Reset game state when successfully loading new questions
                setCurrentQuestionIndex(0);
                setSelectedAnswer(null);
                setScore({ correct: 0, incorrect: 0 });
                setGameComplete(false);
            })
            .catch(err => {
                console.warn('Retry failed:', err.message);
                console.log('Continuing with fallback sample questions');
                setError(err.message);
                setUsingFallback(true);
                setQuestions(FALLBACK_QUESTIONS);
                setLoading(false);
            });
    };

    return {
        currentQuestion,
        selectedAnswer,
        score,
        currentQuestionIndex,
        totalQuestions: TOTAL_QUESTIONS,
        gameComplete,
        loading,
        error,
        usingFallback,
        selectAnswer,
        nextQuestion,
        restartGame,
        retryLoad
    };
}
