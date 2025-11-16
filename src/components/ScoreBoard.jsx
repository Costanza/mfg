import './ScoreBoard.css';

function ScoreBoard({ correct, incorrect, currentQuestion, total }) {
    return (
        <aside
            className="scoreboard"
            role="complementary"
            aria-label="Game progress and score"
        >
            <div className="scoreboard-progress">
                <span className="progress-text" aria-live="polite">
                    Question {currentQuestion} of {total}
                </span>
            </div>
            <div className="scoreboard-stats" role="status" aria-live="polite" aria-atomic="true">
                <div className="stat correct-stat">
                    <span className="stat-label">Correct</span>
                    <span className="stat-value" aria-label={`${correct} correct answers`}>{correct}</span>
                </div>
                <div className="stat incorrect-stat">
                    <span className="stat-label">Incorrect</span>
                    <span className="stat-value" aria-label={`${incorrect} incorrect answers`}>{incorrect}</span>
                </div>
            </div>
        </aside>
    );
}

export default ScoreBoard;
