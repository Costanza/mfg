import './ScoreBoard.css';

function ScoreBoard({ correct, incorrect, currentQuestion, total }) {
    return (
        <div className="scoreboard">
            <div className="scoreboard-progress">
                <span className="progress-text">
                    Question {currentQuestion} of {total}
                </span>
            </div>
            <div className="scoreboard-stats">
                <div className="stat correct-stat">
                    <span className="stat-label">Correct</span>
                    <span className="stat-value">{correct}</span>
                </div>
                <div className="stat incorrect-stat">
                    <span className="stat-label">Incorrect</span>
                    <span className="stat-value">{incorrect}</span>
                </div>
            </div>
        </div>
    );
}

export default ScoreBoard;
