# Design Document: Expanded Question Bank

## Overview

This design document outlines the approach for creating a comprehensive trivia question bank containing 200+ questions across 10 standard trivia categories. The expanded question bank will maintain full compatibility with the existing Millionaire Flashcard Game while providing extensive content variety for extended gameplay.

## Architecture

### Data Structure

The expanded question bank will maintain the existing JSON structure to ensure zero-code-change integration:

```json
{
  "questions": [
    {
      "id": "string",
      "question": "string",
      "answers": ["string", "string", "string", "string"],
      "correctAnswer": 0-3
    }
  ]
}
```

### Category Distribution

The question bank will be organized across 10 categories with approximately 20-25 questions per category to achieve a minimum of 200 total questions:

1. **Geography** (25 questions)
   - Countries, capitals, landmarks, physical geography
   
2. **History** (25 questions)
   - World history, wars, historical figures, dates, civilizations
   
3. **Science** (25 questions)
   - Physics, chemistry, biology, astronomy, general science
   
4. **Arts & Literature** (20 questions)
   - Famous works, authors, artists, art movements, literary terms
   
5. **Entertainment** (25 questions)
   - Movies, TV shows, music, celebrities, awards
   
6. **Sports** (20 questions)
   - Major sports, athletes, championships, records, rules
   
7. **General Knowledge** (20 questions)
   - Mixed topics, common knowledge, culture, society
   
8. **Nature & Animals** (20 questions)
   - Wildlife, ecosystems, animal behavior, plants
   
9. **Technology** (20 questions)
   - Computing, inventions, internet, innovations
   
10. **Food & Drink** (20 questions)
    - Cuisine, ingredients, cooking, beverages, culinary history

### Difficulty Distribution

Questions within each category will span three difficulty levels:

- **Easy (40%)**: Common knowledge, widely known facts
- **Medium (40%)**: Requires general education or interest in the topic
- **Hard (20%)**: Specific knowledge, less commonly known facts

## Components and Interfaces

### Question Creation Guidelines

#### Question Format Standards

1. **Question Text**:
   - Clear and unambiguous
   - Grammatically correct
   - Concise (typically 10-20 words)
   - Avoid double negatives
   - Use proper punctuation

2. **Answer Options**:
   - Four distinct options per question
   - One clearly correct answer
   - Three plausible distractors
   - Similar length and format across all options
   - Avoid "all of the above" or "none of the above"
   - Randomize correct answer position across questions

3. **Answer Quality**:
   - Distractors should be plausible but incorrect
   - Avoid obvious wrong answers
   - Use similar categories (e.g., all years, all countries)
   - Maintain consistent formatting

#### Example Question Structure

**Good Example:**
```json
{
  "id": "q16",
  "question": "Which river is the longest in the world?",
  "answers": [
    "Amazon River",
    "Nile River",
    "Yangtze River",
    "Mississippi River"
  ],
  "correctAnswer": 1
}
```

**Poor Example (to avoid):**
```json
{
  "id": "q16",
  "question": "What's the longest river?",
  "answers": [
    "Nile",
    "A mountain",
    "Blue",
    "None of these"
  ],
  "correctAnswer": 0
}
```

### ID Naming Convention

Questions will use sequential IDs following the existing pattern:
- Current: q1 through q15
- Expanded: q16 through q220+ (or higher)
- Format: "q" + sequential number

### File Organization

All questions will be stored in a single JSON file:
- **Location**: `public/data/questions.json`
- **Format**: Valid JSON with proper indentation (2 spaces)
- **Size**: Approximately 50-80KB for 200+ questions
- **Loading**: Loaded once on application mount

## Data Models

### Complete Question Bank Structure

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "What is the capital of Australia?",
      "answers": ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      "correctAnswer": 2
    },
    {
      "id": "q2",
      "question": "Which planet is known as the Red Planet?",
      "answers": ["Venus", "Mars", "Jupiter", "Saturn"],
      "correctAnswer": 1
    }
    // ... 198+ more questions
  ]
}
```

### Category Metadata (Optional Enhancement)

While not required for the current implementation, questions could optionally include category metadata for future filtering:

```json
{
  "id": "q16",
  "category": "Geography",
  "difficulty": "medium",
  "question": "Which river is the longest in the world?",
  "answers": ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
  "correctAnswer": 1
}
```

## Question Content Strategy

### Geography Questions (25)
- World capitals and countries
- Famous landmarks and monuments
- Mountain ranges, rivers, oceans
- Continents and regions
- Flags and national symbols

### History Questions (25)
- Major wars and conflicts
- Historical figures and leaders
- Important dates and events
- Ancient civilizations
- Inventions and discoveries

### Science Questions (25)
- Elements and periodic table
- Laws of physics
- Human anatomy
- Space and astronomy
- Scientific discoveries

### Arts & Literature Questions (20)
- Classic novels and authors
- Famous paintings and artists
- Literary movements
- Poetry and playwrights
- Art history

### Entertainment Questions (25)
- Classic and modern films
- TV shows and series
- Music artists and bands
- Awards (Oscars, Grammys, etc.)
- Pop culture

### Sports Questions (20)
- Olympic sports
- Major championships
- Famous athletes
- Sports rules and terminology
- World records

### General Knowledge Questions (20)
- World currencies
- Languages
- Mythology
- Holidays and traditions
- Common facts

### Nature & Animals Questions (20)
- Animal species and habitats
- Endangered species
- Plant life
- Ecosystems
- Animal behavior

### Technology Questions (20)
- Computer history
- Internet and web
- Famous inventors
- Tech companies
- Modern innovations

### Food & Drink Questions (20)
- International cuisine
- Cooking techniques
- Famous dishes
- Beverages and cocktails
- Food origins

## Error Handling

### Data Validation

The expanded question bank will be validated for:

1. **JSON Validity**: Proper syntax and structure
2. **Required Fields**: All questions have id, question, answers array, correctAnswer
3. **Answer Count**: Exactly 4 answers per question
4. **Correct Answer Index**: Value between 0-3
5. **Unique IDs**: No duplicate question IDs
6. **Non-empty Strings**: All text fields contain content

### Quality Assurance

Before deployment, the question bank will be reviewed for:

- Factual accuracy
- Grammar and spelling
- Answer plausibility
- Difficulty balance
- Category distribution

## Testing Strategy

### Manual Testing

1. **Content Review**: Verify factual accuracy of all questions
2. **Format Check**: Ensure consistent formatting across all entries
3. **Gameplay Test**: Play through questions to verify user experience
4. **JSON Validation**: Use JSON validator to check file structure

### Automated Testing

1. **Schema Validation**: Verify JSON structure matches expected format
2. **Field Validation**: Check all required fields are present
3. **Index Validation**: Ensure correctAnswer indices are valid
4. **Duplicate Detection**: Check for duplicate question IDs

### Integration Testing

1. **Application Load**: Verify the app loads with expanded question bank
2. **Question Display**: Confirm all questions render correctly
3. **Answer Selection**: Test answer selection and feedback
4. **Score Tracking**: Verify scoring works with larger question set

## Performance Considerations

### File Size
- 200 questions ≈ 50-80KB JSON file
- Minimal impact on load time
- Single fetch on application mount
- Cached in browser memory

### Memory Usage
- All questions loaded into memory at once
- Negligible impact with 200-300 questions
- No pagination or lazy loading required

### Load Time
- JSON parsing is fast for this size
- No noticeable delay for users
- Vite optimization handles bundling efficiently

## Compatibility

### Backward Compatibility

The expanded question bank maintains 100% compatibility with the existing Flashcard System:

- Same JSON structure
- Same field names and types
- Same file location
- No code changes required

### Future Extensibility

The design allows for future enhancements:

- Adding category metadata
- Implementing difficulty levels
- Adding question tags
- Supporting multiple question banks
- Implementing question filtering

## Implementation Approach

### Question Creation Process

1. **Research**: Gather factual information for each category
2. **Drafting**: Write questions following format guidelines
3. **Answer Creation**: Develop one correct answer and three plausible distractors
4. **Review**: Verify accuracy and quality
5. **Formatting**: Structure as JSON objects
6. **Validation**: Check JSON syntax and structure
7. **Testing**: Load into application and test

### Quality Control Checklist

For each question:
- [ ] Factually accurate
- [ ] Clear and unambiguous
- [ ] Proper grammar and punctuation
- [ ] Four distinct answer options
- [ ] Plausible distractors
- [ ] Correct answer index is accurate
- [ ] Unique question ID
- [ ] Fits within category

## Accessibility

The expanded question bank will maintain accessibility by:

- Using clear, readable language
- Avoiding overly complex terminology
- Providing context in questions when needed
- Ensuring questions are culturally inclusive
- Avoiding questions that require visual interpretation
