import './GameControls.css';

function GameControls({ onNext, onRestart, showNext, showRestart }) {
    return (
        <div className="game-controls">
            {showNext && (
                <button
                    className="control-button next-button"
                    onClick={onNext}
                    aria-label="Next question"
                >
                    Next Question
                </button>
            )}
            {showRestart && (
                <button
                    className="control-button restart-button"
                    onClick={onRestart}
                    aria-label="Restart game"
                >
                    Restart Game
                </button>
            )}
        </div>
    );
}

export default GameControls;
