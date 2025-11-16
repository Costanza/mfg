# Accessibility Testing Guide

## Overview
This guide provides step-by-step instructions for manually testing the accessibility features of the Millionaire Flashcard Game.

## Prerequisites
- Development server running (`npm run dev`)
- Screen reader software installed (see recommendations below)
- Browser with accessibility developer tools

## Screen Reader Software

### macOS
- **VoiceOver** (built-in)
  - Enable: System Preferences > Accessibility > VoiceOver
  - Toggle: Cmd + F5
  - Basic commands:
    - VO + Right Arrow: Next item
    - VO + Left Arrow: Previous item
    - VO + Space: Activate item
    - Control: Stop speaking

### Windows
- **NVDA** (free, open-source)
  - Download: https://www.nvaccess.org/download/
  - Toggle: Ctrl + Alt + N
  - Basic commands:
    - Down Arrow: Next item
    - Up Arrow: Previous item
    - Enter/Space: Activate item
    - Insert + S: Stop speaking

- **JAWS** (commercial)
  - Download: https://www.freedomscientific.com/products/software/jaws/
  - Similar commands to NVDA

### Linux
- **Orca** (built-in with GNOME)
  - Enable: Settings > Universal Access > Screen Reader
  - Toggle: Super + Alt + S

## Testing Checklist

### 1. Keyboard Navigation Test

#### Test Steps:
1. **Start the application**
   - Open browser and navigate to `http://localhost:5173`
   - Do NOT use the mouse for the entire test

2. **Tab through all elements**
   - [ ] Press Tab repeatedly to navigate through all interactive elements
   - [ ] Verify focus indicators are clearly visible on each element
   - [ ] Confirm tab order is logical: Score → Answer A → Answer B → Answer C → Answer D → Next button

3. **Test answer selection**
   - [ ] Tab to an answer option
   - [ ] Press Enter to select it
   - [ ] Verify the answer is selected and feedback is shown
   - [ ] Try pressing Space on another answer (should not work after selection)

4. **Test navigation controls**
   - [ ] Tab to "Next Question" button
   - [ ] Press Enter to advance
   - [ ] Verify new question loads
   - [ ] Repeat for multiple questions

5. **Test game completion**
   - [ ] Complete all questions using only keyboard
   - [ ] Tab to "Restart Game" button
   - [ ] Press Enter to restart
   - [ ] Verify game resets to first question

#### Expected Results:
- ✅ All interactive elements are reachable via Tab key
- ✅ Focus indicators are visible with blue outline and glow
- ✅ Enter and Space keys work for all buttons
- ✅ Tab order is logical and predictable
- ✅ No keyboard traps (can always tab forward/backward)

---

### 2. Screen Reader Test

#### Test Steps:

1. **Enable screen reader**
   - Start VoiceOver (macOS), NVDA (Windows), or Orca (Linux)
   - Navigate to the application

2. **Test page structure**
   - [ ] Verify page title is announced: "Millionaire Flashcard Game"
   - [ ] Navigate by headings (H key in NVDA/JAWS)
   - [ ] Confirm heading hierarchy is logical

3. **Test score board**
   - [ ] Navigate to score board area
   - [ ] Verify it's announced as "Game progress and score"
   - [ ] Confirm current question number is read: "Question 1 of 15"
   - [ ] Verify score counts are announced: "0 correct answers, 0 incorrect answers"

4. **Test question and answers**
   - [ ] Navigate to question text
   - [ ] Verify question is read clearly
   - [ ] Navigate to answer options
   - [ ] Confirm each answer is announced with letter label: "Answer A: [text]"
   - [ ] Verify answer options are grouped as "Answer options"

5. **Test answer selection feedback**
   - [ ] Select an answer (correct or incorrect)
   - [ ] Listen for immediate feedback announcement
   - [ ] For correct: Should announce "Correct answer!"
   - [ ] For incorrect: Should announce "Incorrect. The correct answer is [letter]: [text]"
   - [ ] Verify selected state is announced: "Answer A: [text] - Selected"

6. **Test score updates**
   - [ ] After selecting an answer, listen for score update
   - [ ] Verify score is announced automatically (aria-live region)
   - [ ] Confirm both correct and incorrect counts are updated

7. **Test navigation controls**
   - [ ] Navigate to "Next Question" button
   - [ ] Verify it's announced with clear label: "Proceed to next question"
   - [ ] Activate button and verify new question loads
   - [ ] Confirm question progress updates: "Question 2 of 15"

8. **Test game completion**
   - [ ] Complete all questions
   - [ ] Verify completion announcement: "Quiz results"
   - [ ] Confirm final statistics are read clearly
   - [ ] Verify percentage score is announced: "[number] percent score"
   - [ ] Navigate to "Restart Game" button
   - [ ] Confirm button label: "Restart the game from the beginning"

#### Expected Results:
- ✅ All content is accessible to screen reader
- ✅ Interactive elements have descriptive labels
- ✅ Answer feedback is announced immediately
- ✅ Score updates are announced automatically
- ✅ Game state changes are communicated clearly
- ✅ No unlabeled or confusing elements

---

### 3. Focus Management Test

#### Test Steps:
1. **Test focus visibility**
   - [ ] Click with mouse on various elements
   - [ ] Verify focus outline does NOT appear on mouse click
   - [ ] Use Tab key to navigate
   - [ ] Verify focus outline DOES appear with keyboard navigation

2. **Test focus order**
   - [ ] Start at top of page
   - [ ] Tab through entire page
   - [ ] Verify focus moves in logical order:
     1. Retry button (if fallback notice shown)
     2. Answer option A
     3. Answer option B
     4. Answer option C
     5. Answer option D
     6. Next Question button (when visible)
     7. Restart Game button (when visible)

3. **Test focus after interactions**
   - [ ] Select an answer
   - [ ] Verify focus remains on selected answer
   - [ ] Press Tab to move to Next button
   - [ ] Click Next button
   - [ ] Verify focus moves to first answer of new question

#### Expected Results:
- ✅ Focus indicators only show for keyboard navigation
- ✅ Focus order is logical and predictable
- ✅ Focus is managed properly after interactions
- ✅ No focus loss or unexpected focus jumps

---

### 4. Color Contrast Test

#### Test Steps:
1. **Use browser developer tools**
   - Open DevTools (F12)
   - Go to Lighthouse tab
   - Run accessibility audit
   - Check for contrast issues

2. **Manual verification**
   - [ ] Check answer options in default state (gray on dark/light)
   - [ ] Check selected state (blue on dark/light)
   - [ ] Check correct answer state (green on dark/light)
   - [ ] Check incorrect answer state (red on dark/light)
   - [ ] Check button text (white on blue)
   - [ ] Check body text (white on dark / dark on light)

3. **Test in both color schemes**
   - [ ] Test in dark mode (default)
   - [ ] Switch to light mode (System Preferences)
   - [ ] Verify all colors still have sufficient contrast

#### Expected Results:
- ✅ All text has minimum 4.5:1 contrast ratio (WCAG AA)
- ✅ Large text has minimum 3:1 contrast ratio
- ✅ Interactive elements are distinguishable
- ✅ Color is not the only means of conveying information

---

### 5. Automated Testing

#### Using axe DevTools:
1. Install axe DevTools browser extension
2. Open the application
3. Open DevTools and go to axe DevTools tab
4. Click "Scan ALL of my page"
5. Review any issues found
6. Verify no critical or serious issues

#### Using Lighthouse:
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select "Accessibility" category
4. Click "Analyze page load"
5. Review score and recommendations
6. Target: 95+ score

#### Expected Results:
- ✅ axe DevTools: 0 critical or serious issues
- ✅ Lighthouse: 95+ accessibility score
- ✅ No ARIA misuse detected
- ✅ All images have alt text (if applicable)

---

## Common Issues to Watch For

### Keyboard Navigation
- ❌ Elements not reachable via Tab
- ❌ Keyboard traps (can't tab out)
- ❌ Illogical tab order
- ❌ Missing focus indicators
- ❌ Enter/Space not working on buttons

### Screen Reader
- ❌ Unlabeled buttons or inputs
- ❌ Missing or incorrect ARIA attributes
- ❌ Content not announced
- ❌ Confusing or redundant announcements
- ❌ Missing live region updates

### Focus Management
- ❌ Focus lost after interaction
- ❌ Focus on wrong element
- ❌ Focus visible on mouse click
- ❌ Focus not visible on keyboard navigation

### Color Contrast
- ❌ Text too light on light background
- ❌ Text too dark on dark background
- ❌ Insufficient contrast in interactive states
- ❌ Color-only information

---

## Reporting Issues

If you find any accessibility issues during testing:

1. **Document the issue**
   - What: Describe the problem
   - Where: Which component/page
   - How: Steps to reproduce
   - Expected: What should happen
   - Actual: What actually happens

2. **Categorize severity**
   - Critical: Blocks all users of assistive technology
   - Serious: Blocks some users or major functionality
   - Moderate: Causes difficulty but has workaround
   - Minor: Cosmetic or minor inconvenience

3. **Create a fix**
   - Update the relevant component
   - Test the fix
   - Verify no regression

---

## Success Criteria

The application passes accessibility testing if:

✅ All interactive elements are keyboard accessible
✅ Focus indicators are clearly visible
✅ Screen reader announces all content correctly
✅ Answer feedback is announced immediately
✅ Score updates are announced automatically
✅ Tab order is logical and predictable
✅ Color contrast meets WCAG AA standards (4.5:1)
✅ No critical or serious issues in automated tests
✅ Lighthouse accessibility score is 95+

---

## Additional Resources

- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [axe DevTools Documentation](https://www.deque.com/axe/devtools/)
