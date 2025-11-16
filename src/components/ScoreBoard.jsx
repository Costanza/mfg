import './ScoreBoard.css';
import { PRIZE_LADDER } from '../utils/difficultyLevels';

function ScoreBoard({ correct, incorrect, currentQuestion, total }) {
    const currentPrize = PRIZE_LADDER[currentQuestion - 1];

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
                <span className="prize-text" aria-live="polite">
                    Playing for: <strong>{currentPrize?.prize || '$0'}</strong>
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
            <div className="prize-ladder">
                <h3>Prize Ladder</h3>
                <ul className="ladder-list">
                    {PRIZE_LADDER.slice().reverse().map((level) => (
                        <li
                            key={level.question}
                            className={`ladder-item ${level.question === currentQuestion ? 'current' : ''} ${level.question < currentQuestion ? 'completed' : ''}`}
                        >
                            <span className="ladder-question">{level.question}</span>
                            <span className="ladder-prize">{level.prize}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default ScoreBoard;
