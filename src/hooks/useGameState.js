import { useState, useEffect } from 'react';

export function useGameState() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [gameComplete, setGameComplete] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load questions from JSON file on mount
    useEffect(() => {
        const loadQuestions = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch('/data/questions.json');

                if (!response.ok) {
                    throw new Error('Failed to load questions');
                }

                const data = await response.json();

                if (!data.questions || data.questions.length === 0) {
                    throw new Error('No questions available');
                }

                setQuestions(data.questions);
                setLoading(false);
            } catch (err) {
                setError(err.message);
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

        if (nextIndex >= questions.length) {
            setGameComplete(true);
        } else {
            setCurrentQuestionIndex(nextIndex);
            setSelectedAnswer(null);
        }
    };

    // Restart the game
    const restartGame = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore({ correct: 0, incorrect: 0 });
        setGameComplete(false);
    };

    return {
        currentQuestion,
        selectedAnswer,
        score,
        currentQuestionIndex,
        totalQuestions: questions.length,
        gameComplete,
        loading,
        error,
        selectAnswer,
        nextQuestion,
        restartGame
    };
}
