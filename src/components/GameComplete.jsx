import './GameComplete.css';

function GameComplete({ correct, incorrect, total }) {
    const percentage = Math.round((correct / total) * 100);

    return (
        <div className="game-complete">
            <div className="completion-card">
                <h1 className="completion-title">Quiz Complete!</h1>
                <p className="completion-message">
                    You've answered all {total} questions
                </p>

                <div className="final-stats">
                    <div className="final-stat correct-final">
                        <span className="final-stat-value">{correct}</span>
                        <span className="final-stat-label">Correct</span>
                    </div>
                    <div className="final-stat incorrect-final">
                        <span className="final-stat-value">{incorrect}</span>
                        <span className="final-stat-label">Incorrect</span>
                    </div>
                </div>

                <div className="percentage-display">
                    <span className="percentage-value">{percentage}%</span>
                    <span className="percentage-label">Score</span>
                </div>
            </div>
        </div>
    );
}

export default GameComplete;
