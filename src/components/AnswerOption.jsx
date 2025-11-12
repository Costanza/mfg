import './AnswerOption.css';

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

    return (
        <button
            className={getClassName()}
            onClick={handleClick}
            disabled={showFeedback}
            aria-label={`Answer ${label}: ${text}`}
            aria-pressed={isSelected}
        >
            <span className="answer-label">{label}</span>
            <span className="answer-text">{text}</span>
        </button>
    );
}

export default AnswerOption;
