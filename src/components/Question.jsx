import AnswerOption from './AnswerOption';
import './Question.css';

function Question({
    question,
    answers,
    correctAnswer,
    selectedAnswer,
    onAnswerSelect
}) {
    const labels = ['A', 'B', 'C', 'D'];
    const showFeedback = selectedAnswer !== null;

    return (
        <div className="question-container">
            <h2 className="question-text">{question}</h2>
            <div className="answers-grid">
                {answers.map((answer, index) => (
                    <AnswerOption
                        key={index}
                        text={answer}
                        index={index}
                        label={labels[index]}
                        isSelected={selectedAnswer === index}
                        isCorrect={correctAnswer === index}
                        showFeedback={showFeedback}
                        onSelect={onAnswerSelect}
                    />
                ))}
            </div>
        </div>
    );
}

export default Question;
