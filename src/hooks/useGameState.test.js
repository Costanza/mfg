import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useGameState } from './useGameState';

// Mock fetch
global.fetch = vi.fn();

const mockQuestions = {
    questions: [
        {
            id: 'q1',
            question: 'Test question 1?',
            answers: ['A', 'B', 'C', 'D'],
            correctAnswer: 2
        },
        {
            id: 'q2',
            question: 'Test question 2?',
            answers: ['A', 'B', 'C', 'D'],
            correctAnswer: 1
        },
        {
            id: 'q3',
            question: 'Test question 3?',
            answers: ['A', 'B', 'C', 'D'],
            correctAnswer: 0
        }
    ]
};

describe('useGameState', () => {
    beforeEach(() => {
        fetch.mockClear();
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockQuestions
        });
    });

    it('loads questions on mount', async () => {
        const { result } = renderHook(() => useGameState());

        expect(result.current.loading).toBe(true);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.totalQuestions).toBe(3);
        expect(result.current.currentQuestion).toEqual(mockQuestions.questions[0]);
    });

    it('calculates score correctly for correct answer', async () => {
        const { result } = renderHook(() => useGameState());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        act(() => {
            result.current.selectAnswer(2); // Correct answer
        });

        expect(result.current.score.correct).toBe(1);
        expect(result.current.score.incorrect).toBe(0);
        expect(result.current.selectedAnswer).toBe(2);
    });

    it('calculates score correctly for incorrect answer', async () => {
        const { result } = renderHook(() => useGameState());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        act(() => {
            result.current.selectAnswer(0); // Incorrect answer
        });

        expect(result.current.score.correct).toBe(0);
        expect(result.current.score.incorrect).toBe(1);
        expect(result.current.selectedAnswer).toBe(0);
    });

    it('progresses through questions correctly', async () => {
        const { result } = renderHook(() => useGameState());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.currentQuestionIndex).toBe(0);
        expect(result.current.currentQuestion.id).toBe('q1');

        act(() => {
            result.current.selectAnswer(2);
        });

        act(() => {
            result.current.nextQuestion();
        });

        expect(result.current.currentQuestionIndex).toBe(1);
        expect(result.current.currentQuestion.id).toBe('q2');
        expect(result.current.selectedAnswer).toBe(null);
    });

    it('detects game completion', async () => {
        const { result } = renderHook(() => useGameState());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.gameComplete).toBe(false);

        // Answer all questions
        act(() => {
            result.current.selectAnswer(2);
        });
        act(() => {
            result.current.nextQuestion();
        });

        act(() => {
            result.current.selectAnswer(1);
        });
        act(() => {
            result.current.nextQuestion();
        });

        act(() => {
            result.current.selectAnswer(0);
        });
        act(() => {
            result.current.nextQuestion();
        });

        expect(result.current.gameComplete).toBe(true);
    });

    it('restarts game correctly', async () => {
        const { result } = renderHook(() => useGameState());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        // Play through some questions
        act(() => {
            result.current.selectAnswer(2);
        });
        act(() => {
            result.current.nextQuestion();
        });
        act(() => {
            result.current.selectAnswer(0);
        });

        expect(result.current.currentQuestionIndex).toBe(1);
        expect(result.current.score.correct).toBe(1);
        expect(result.current.score.incorrect).toBe(1);

        // Restart
        act(() => {
            result.current.restartGame();
        });

        expect(result.current.currentQuestionIndex).toBe(0);
        expect(result.current.selectedAnswer).toBe(null);
        expect(result.current.score.correct).toBe(0);
        expect(result.current.score.incorrect).toBe(0);
        expect(result.current.gameComplete).toBe(false);
    });

    it('prevents changing answer after selection', async () => {
        const { result } = renderHook(() => useGameState());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        act(() => {
            result.current.selectAnswer(2); // Correct answer
        });

        expect(result.current.selectedAnswer).toBe(2);
        expect(result.current.score.correct).toBe(1);

        // Try to change answer
        act(() => {
            result.current.selectAnswer(0); // Different answer
        });

        // Should remain unchanged
        expect(result.current.selectedAnswer).toBe(2);
        expect(result.current.score.correct).toBe(1);
        expect(result.current.score.incorrect).toBe(0);
    });
});
