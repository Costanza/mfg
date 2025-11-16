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
    usingFallback,
    selectAnswer,
    nextQuestion,
    restartGame,
    retryLoad
  } = useGameState();

  // Handle loading state
  if (loading) {
    return (
      <div className="app" role="main">
        <div className="loading-container" role="status" aria-live="polite">
          <h1>Millionaire Flashcard Game</h1>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  // Render game complete screen
  if (gameComplete) {
    return (
      <div className="app" role="main">
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
    <div className="app" role="main">
      <h1>Millionaire Flashcard Game</h1>
      {usingFallback && (
        <div className="fallback-notice" role="alert">
          <p>⚠️ Using sample questions. <button onClick={retryLoad} className="retry-link" aria-label="Retry loading questions from file">Try loading questions again</button></p>
        </div>
      )}
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
    </div>
  );
}

export default App;
