import './GameComplete.css';
import { PRIZE_LADDER } from '../utils/difficultyLevels';

function GameComplete({ correct, incorrect, total }) {
    const percentage = Math.round((correct / total) * 100);

    // Calculate prize won based on correct answers
    const prizeWon = correct > 0 ? PRIZE_LADDER[correct - 1].prize : '$0';
    const isPerfect = correct === total;

    return (
        <section
            className="game-complete"
            role="status"
            aria-live="polite"
            aria-label="Quiz results"
        >
            <div className="completion-card">
                <h2 className="completion-title">
                    {isPerfect ? '🎉 Perfect Score! 🎉' : 'Quiz Complete!'}
                </h2>
                <p className="completion-message">
                    You've answered all {total} questions
                </p>

                <div className="prize-won">
                    <span className="prize-label">You Won</span>
                    <span className="prize-amount">{prizeWon}</span>
                </div>

                <div className="final-stats" role="group" aria-label="Final score breakdown">
                    <div className="final-stat correct-final">
                        <span className="final-stat-value" aria-label={`${correct} correct answers`}>{correct}</span>
                        <span className="final-stat-label">Correct</span>
                    </div>
                    <div className="final-stat incorrect-final">
                        <span className="final-stat-value" aria-label={`${incorrect} incorrect answers`}>{incorrect}</span>
                        <span className="final-stat-label">Incorrect</span>
                    </div>
                </div>

                <div className="percentage-display" role="group" aria-label="Overall score">
                    <span className="percentage-value" aria-label={`${percentage} percent score`}>{percentage}%</span>
                    <span className="percentage-label">Accuracy</span>
                </div>
            </div>
        </section>
    );
}

export default GameComplete;
