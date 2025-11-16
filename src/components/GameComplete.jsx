import './GameComplete.css';

function GameComplete({ correct, incorrect, total }) {
    const percentage = Math.round((correct / total) * 100);

    return (
        <section
            className="game-complete"
            role="status"
            aria-live="polite"
            aria-label="Quiz results"
        >
            <div className="completion-card">
                <h2 className="completion-title">Quiz Complete!</h2>
                <p className="completion-message">
                    You've answered all {total} questions
                </p>

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
                    <span className="percentage-label">Score</span>
                </div>
            </div>
        </section>
    );
}

export default GameComplete;
