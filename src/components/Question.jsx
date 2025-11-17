import AnswerOption from './AnswerOption';
import './Question-FIXED.css';

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
        <section className="question-container" aria-labelledby="current-question">
            <h2 id="current-question" className="question-text">{question}</h2>
            <div
                className="answers-grid"
                role="group"
                aria-label="Answer options"
            >
                {answers.map((answer, index) => (
                    <div key={index} className="answer-cell">
                        <AnswerOption
                            text={answer}
                            index={index}
                            label={labels[index]}
                            isSelected={selectedAnswer === index}
                            isCorrect={correctAnswer === index}
                            showFeedback={showFeedback}
                            onSelect={onAnswerSelect}
                        />
                    </div>
                ))}
            </div>
            {showFeedback && (
                <div className="sr-only" role="status" aria-live="assertive">
                    {selectedAnswer === correctAnswer
                        ? 'Correct answer!'
                        : `Incorrect. The correct answer is ${labels[correctAnswer]}: ${answers[correctAnswer]}`
                    }
                </div>
            )}
        </section>
    );
}

export default Question;
