# Millionaire Flashcard Game

A static React-based flashcard game inspired by the quiz show Millionaire Hotseat. Test your knowledge with multiple-choice trivia questions and track your performance.

## Project Structure

```
millionaire-flashcard-game/
├── public/
│   └── data/              # Question bank JSON files
├── src/
│   ├── components/        # React components
│   ├── hooks/            # Custom React hooks
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build

Build for production:

```bash
npm run build
```

### Lint

Run ESLint:

```bash
npm run lint
```

## Technology Stack

- **React 19**: UI framework
- **Vite**: Build tool and development server
- **ESLint**: Code linting

## Features (In Development)

- Multiple-choice trivia questions
- Immediate feedback on answers
- Score tracking
- Question progression
- Game completion summary
- Fully static (no backend required)
