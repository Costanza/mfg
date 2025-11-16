// Validation script for questions.json
import fs from 'fs';

console.log('=== Question Bank Validation ===\n');

try {
    // Read and parse JSON
    const data = fs.readFileSync('./public/data/questions.json', 'utf8');
    const questionBank = JSON.parse(data);

    console.log('✓ JSON is valid and parseable\n');

    // Check structure
    if (!questionBank.questions || !Array.isArray(questionBank.questions)) {
        throw new Error('Invalid structure: missing "questions" array');
    }

    console.log(`✓ Found ${questionBank.questions.length} questions\n`);

    // Validate each question
    const errors = [];
    const warnings = [];
    const questionIds = new Set();
    const categories = {};

    questionBank.questions.forEach((q, index) => {
        // Check required fields
        if (!q.id) errors.push(`Question ${index + 1}: Missing id`);
        if (!q.question) errors.push(`Question ${index + 1}: Missing question text`);
        if (!q.answers || !Array.isArray(q.answers)) {
            errors.push(`Question ${index + 1}: Missing or invalid answers array`);
        } else if (q.answers.length !== 4) {
            errors.push(`Question ${index + 1}: Must have exactly 4 answers (has ${q.answers.length})`);
        }
        if (typeof q.correctAnswer !== 'number') {
            errors.push(`Question ${index + 1}: Missing or invalid correctAnswer`);
        } else if (q.correctAnswer < 0 || q.correctAnswer > 3) {
            errors.push(`Question ${index + 1}: correctAnswer must be between 0-3 (is ${q.correctAnswer})`);
        }

        // Check for duplicate IDs
        if (q.id) {
            if (questionIds.has(q.id)) {
                errors.push(`Question ${index + 1}: Duplicate ID "${q.id}"`);
            }
            questionIds.add(q.id);
        }

        // Check for empty strings
        if (q.question && q.question.trim() === '') {
            warnings.push(`Question ${index + 1}: Empty question text`);
        }
        if (q.answers) {
            q.answers.forEach((answer, i) => {
                if (typeof answer !== 'string' || answer.trim() === '') {
                    warnings.push(`Question ${index + 1}: Empty or invalid answer at index ${i}`);
                }
            });
        }

        // Track categories (if present)
        if (q.category) {
            categories[q.category] = (categories[q.category] || 0) + 1;
        }
    });

    // Report results
    if (errors.length > 0) {
        console.log('❌ ERRORS FOUND:\n');
        errors.forEach(err => console.log(`  - ${err}`));
        console.log('');
    } else {
        console.log('✓ All questions have valid structure\n');
    }

    if (warnings.length > 0) {
        console.log('⚠️  WARNINGS:\n');
        warnings.forEach(warn => console.log(`  - ${warn}`));
        console.log('');
    }

    // Summary statistics
    console.log('=== Summary Statistics ===\n');
    console.log(`Total Questions: ${questionBank.questions.length}`);
    console.log(`Unique IDs: ${questionIds.size}`);
    console.log(`ID Range: ${Array.from(questionIds).sort((a, b) => {
        const numA = parseInt(a.replace('q', ''));
        const numB = parseInt(b.replace('q', ''));
        return numA - numB;
    })[0]} to ${Array.from(questionIds).sort((a, b) => {
        const numA = parseInt(a.replace('q', ''));
        const numB = parseInt(b.replace('q', ''));
        return numA - numB;
    }).pop()}`);

    if (Object.keys(categories).length > 0) {
        console.log('\nCategory Distribution:');
        Object.entries(categories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
            console.log(`  - ${cat}: ${count} questions`);
        });
    }

    console.log('\n=== Validation Complete ===\n');

    if (errors.length === 0) {
        console.log('✓ Question bank is valid and ready to use!');
        process.exit(0);
    } else {
        console.log('❌ Please fix the errors above before using the question bank.');
        process.exit(1);
    }

} catch (error) {
    console.error('❌ FATAL ERROR:', error.message);
    process.exit(1);
}
