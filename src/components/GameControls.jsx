import './GameControls.css';

function GameControls({ onNext, onRestart, showNext, showRestart }) {
    const handleKeyDown = (e, callback) => {
        // Support Enter and Space keys
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            callback();
        }
    };

    return (
        <nav className="game-controls" role="navigation" aria-label="Game controls">
            {showNext && (
                <button
                    className="control-button next-button"
                    onClick={onNext}
                    onKeyDown={(e) => handleKeyDown(e, onNext)}
                    aria-label="Proceed to next question"
                >
                    Next Question
                </button>
            )}
            {showRestart && (
                <button
                    className="control-button restart-button"
                    onClick={onRestart}
                    onKeyDown={(e) => handleKeyDown(e, onRestart)}
                    aria-label="Restart the game from the beginning"
                >
                    Restart Game
                </button>
            )}
        </nav>
    );
}

export default GameControls;
