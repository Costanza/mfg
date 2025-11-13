import { useGameState } from './hooks/useGameState';
import ScoreBoard from './components/ScoreBoard';
import Question from './components/Question';
import GameControls from './components/GameControls';
import GameComplete from './components/GameComplete';
import './App.css';

function App() {
  const {
    currentQuestion,
    selectedAnswer,
    score,
    currentQuestionIndex,
    totalQuestions,
    gameComplete,
    loading,
    error,
    selectAnswer,
    nextQuestion,
    restartGame
  } = useGameState();

  // Handle loading state
  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <h1>Millionaire Flashcard Game</h1>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <h1>Millionaire Flashcard Game</h1>
          <p className="error-message">Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  // Render game complete screen
  if (gameComplete) {
    return (
      <div className="app">
        <h1>Millionaire Flashcard Game</h1>
        <GameComplete
          correct={score.correct}
          incorrect={score.incorrect}
          total={totalQuestions}
        />
        <GameControls
          onRestart={restartGame}
          showRestart={true}
          showNext={false}
        />
      </div>
    );
  }

  // Render main game interface
  return (
    <div className="app">
      <h1>Millionaire Flashcard Game</h1>
      <ScoreBoard
        correct={score.correct}
        incorrect={score.incorrect}
        currentQuestion={currentQuestionIndex + 1}
        total={totalQuestions}
      />
      {currentQuestion && (
        <Question
          question={currentQuestion.question}
          answers={currentQuestion.answers}
          correctAnswer={currentQuestion.correctAnswer}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={selectAnswer}
        />
      )}
      <GameControls
        onNext={nextQuestion}
        showNext={selectedAnswer !== null}
        showRestart={false}
      />
    </div>
  );
}

export default App;
