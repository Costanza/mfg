import './AnswerOption-FIXED.css';

function AnswerOption({
    text,
    index,
    label,
    isSelected,
    isCorrect,
    showFeedback,
    onSelect
}) {
    const getClassName = () => {
        const classes = ['answer-option'];

        if (showFeedback) {
            if (isCorrect) {
                classes.push('correct');
            } else if (isSelected) {
                classes.push('incorrect');
            }
        } else if (isSelected) {
            classes.push('selected');
        }

        return classes.join(' ');
    };

    const handleClick = () => {
        if (!showFeedback) {
            onSelect(index);
        }
    };

    const handleKeyDown = (e) => {
        // Support Enter and Space keys for selection
        if ((e.key === 'Enter' || e.key === ' ') && !showFeedback) {
            e.preventDefault();
            onSelect(index);
        }
    };

    const getAriaLabel = () => {
        let ariaLabel = `Answer ${label}: ${text}`;
        if (showFeedback) {
            if (isCorrect) {
                ariaLabel += ' - Correct answer';
            } else if (isSelected) {
                ariaLabel += ' - Incorrect answer';
            }
        } else if (isSelected) {
            ariaLabel += ' - Selected';
        }
        return ariaLabel;
    };

    return (
        <button
            className={getClassName()}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            disabled={showFeedback}
            aria-label={getAriaLabel()}
            aria-pressed={isSelected}
            aria-describedby={showFeedback && isCorrect ? 'correct-answer' : undefined}
        >
            <span className="answer-label" aria-hidden="true">{label}</span>
            <span className="answer-text">{text}</span>
        </button>
    );
}

export default AnswerOption;
