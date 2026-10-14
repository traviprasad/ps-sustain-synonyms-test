# ps-sustain-synonyms-test

# English Synonyms Test

A simple, responsive English vocabulary and synonyms test application for students preparing for English vocabulary assessments and 11+ exams.

The application loads questions from a CSV file, randomly selects 10 questions for each test, calculates the final score, and displays a detailed review of every answer.

## Features

- Loads questions from `questions.csv`
- Supports uploading a different CSV file
- Randomly selects 10 questions for every test attempt
- Randomizes answer options
- Allows users to select one answer per question
- Validates that every question has an answer
- Calculates the final score
- Displays the percentage score
- Shows a detailed review after submission
- Displays:
  - The selected answer
  - The correct answer
  - The meaning of the word
  - An explanation
  - Related synonyms
  - An example sentence
- Responsive layout for desktop, tablet, and mobile devices
- No backend required
- No build tools required
- No external JavaScript libraries required

## Project Structure

```text
ps-sustain-synonyms-test/
├── index.html
├── styles.css
├── script.js
├── questions.csv
└── README.md
```

## File Descriptions

### `index.html`

Contains the application structure, including:

- Application header
- CSV file upload control
- Start test button
- Quiz container
- Submit and reset buttons
- Results section
- Detailed review section

### `styles.css`

Contains the visual styling for:

- Page layout
- Buttons
- Question cards
- Answer options
- Score display
- Correct and incorrect review cards
- Responsive mobile layout

### `script.js`

Contains the application logic, including:

- Loading `questions.csv`
- Reading uploaded CSV files
- Parsing CSV data
- Validating question data
- Random question selection
- Answer option randomization
- Quiz rendering
- Score calculation
- Results rendering
- Detailed answer review

### `questions.csv`

Contains the vocabulary questions and supporting information.

### `README.md`

Contains project documentation and setup instructions.

## Requirements

The application requires:

- A modern web browser:
  - Google Chrome
  - Microsoft Edge
  - Mozilla Firefox
  - Safari
- Python 3 or Node.js for running a local development server

No database, backend service, package installation, or compilation is required.

## CSV Format

The application expects the following CSV columns:

```text
Question Word
Options
Correct Answer
Meaning
Explanation
Synonyms
Example Sentence
```

Example header:

```csv
Question Word,Options,Correct Answer,Meaning,Explanation,Synonyms,Example Sentence
```

## CSV Column Details

### `Question Word`

The vocabulary word being tested.

Example:

```text
Abundant
```

### `Options`

The possible answer choices.

The preferred separator is the pipe character:

```text
Scarce|Plentiful|Meagre|Rare
```

Semicolons and commas are also supported:

```text
Scarce;Plentiful;Meagre;Rare
```

```text
Scarce,Plentiful,Meagre,Rare
```

The pipe character is recommended because it is less likely to conflict with commas inside text.

### `Correct Answer`

The exact correct option.

Example:

```text
Plentiful
```

The comparison ignores capitalization and extra spaces.

### `Meaning`

A definition or explanation of the question word.

Example:

```text
Existing or available in large quantities.
```

### `Explanation`

An explanation of why the correct answer is the appropriate synonym.

Example:

```text
Abundant means there is a large quantity; plentiful is the closest synonym.
```

### `Synonyms`

Related words for the question word.

Example:

```text
Plentiful; Ample; Bountiful
```

### `Example Sentence`

An example showing the vocabulary word in context.

Example:

```text
The harvest was abundant this year.
```

## Complete CSV Example

```csv
Question Word,Options,Correct Answer,Meaning,Explanation,Synonyms,Example Sentence
Abundant,"Scarce|Plentiful|Meagre|Rare",Plentiful,"Existing or available in large quantities.","Abundant means existing in a large quantity; plentiful is the closest synonym.","Plentiful; Ample; Bountiful","The harvest was abundant this year."
Diligent,"Lazy|Sloppy|Hardworking|Indifferent",Hardworking,"Showing steady and careful effort.","Diligent describes someone who works carefully and persistently.","Hardworking; Industrious; Assiduous","She was a diligent student."
Frigid,"Cold|Warm|Hot|Mild",Cold,"Very cold.","Frigid means extremely cold; cold is the closest answer.","Cold; Icy; Bitter","The frigid water shocked the swimmers."
Conceal,"Reveal|Hide|Show|Display",Hide,"To keep something out of sight.","Conceal means to hide something from view or knowledge.","Hide; Cover; Veil","He tried to conceal the surprise."
Eager,"Reluctant|Unwilling|Keen|Hesitant",Keen,"Having a strong desire or interest.","Eager and keen both describe enthusiasm or strong interest.","Keen; Enthusiastic; Excited","The children were eager to begin."
Fragile,"Strong|Robust|Delicate|Tough",Delicate,"Easily broken or damaged.","Fragile means delicate and easily broken.","Delicate; Brittle; Breakable","Please handle the fragile glass carefully."
Generous,"Stingy|Miserly|Charitable|Selfish",Charitable,"Willing to give freely.","Generous and charitable both describe giving freely to others.","Charitable; Kind; Giving","The generous donor supported the school."
Humble,"Arrogant|Modest|Boastful|Proud",Modest,"Not proud or arrogant.","Humble and modest are synonyms.","Modest; Unassuming; Meek","Despite his success, he remained humble."
Jovial,"Sad|Gloomy|Cheerful|Morose",Cheerful,"Friendly and cheerful.","Jovial describes someone who is cheerful and good-humoured.","Cheerful; Merry; Jolly","He had a jovial personality."
Lethargic,"Energetic|Active|Sluggish|Vigorous",Sluggish,"Slow and lacking energy.","Lethargic means sluggish or lacking energy.","Sluggish; Listless; Inert","She felt lethargic after the long journey."
```

The CSV must contain at least 10 valid questions because each test contains 10 questions.

## Running the Application Locally

### Option 1: Run with Python

Open a terminal in the project directory.

#### Windows

```bash
py -m http.server 8000
```

or:

```bash
python -m http.server 8000
```

#### macOS or Linux

```bash
python3 -m http.server 8000
```

Open the application at:

```text
http://localhost:8000
```

### Option 2: Run with Node.js

If Node.js is installed, run:

```bash
npx serve .
```

Open the URL displayed in the terminal, usually:

```text
http://localhost:3000
```

### Option 3: Visual Studio Code Live Server

1. Open the project folder in Visual Studio Code.
2. Install the `Live Server` extension.
3. Right-click `index.html`.
4. Select `Open with Live Server`.

## Important: Do Not Open Directly with `file://`

Do not double-click `index.html` to open it directly.

This may produce a URL similar to:

```text
file:///C:/project/index.html
```

The browser may block loading `questions.csv` from this type of URL.

Use a local server instead:

```text
http://localhost:8000
```

## How to Use the Application

1. Start the local web server.
2. Open the application in a browser.
3. Wait for the message:

   ```text
   Loaded questions from questions.csv.
   ```

4. Click **Start New Test**.
5. Answer all 10 questions.
6. Click **Submit Test**.
7. Review the score.
8. Read the detailed explanation for every question.
9. Click **Try Another Test** to receive a new random set of questions.

## Test Randomization

Each test performs two randomization steps:

1. It randomly selects 10 questions from the complete question list.
2. It randomly rearranges the answer options for each selected question.

Starting a new test can therefore produce:

- A different set of questions
- A different order of questions
- A different order of answer options

## Scoring

The score is calculated as:

```text
Correct answers / Total questions
```

For example:

```text
8 / 10
```

The percentage is also displayed:

```text
80%
```

An answer is marked correct when the selected answer matches the CSV correct answer, ignoring:

- Capitalization differences
- Extra spaces

For example, these are treated as equivalent:

```text
Plentiful
plentiful
 Plentiful
```

## Manual CSV Upload

The application supports loading a different CSV file.

1. Click **Load another CSV**.
2. Select a `.csv` file.
3. Wait for the question count message.
4. Click **Start New Test**.

The uploaded CSV must use the required columns and contain at least 10 valid questions.

## Validation Rules

A CSV row is considered valid only when it contains:

- A question word
- At least two answer options
- A correct answer matching one of the options

Rows without these values are ignored.

If fewer than 10 valid questions are found, the test cannot start.

## Troubleshooting

### The Start New Test button does nothing

Check the status message below the button.

If it says that the CSV could not be loaded:

1. Confirm that `questions.csv` is in the same folder as `index.html`.
2. Confirm that the file is named exactly:

   ```text
   questions.csv
   ```

3. Run the application through a local server.
4. Refresh the page.
5. Confirm that the CSV contains at least 10 valid questions.

### The button is disabled

The button is disabled when the application has fewer than 10 valid questions.

Check that:

- The CSV header names are correct.
- Every row has a question word.
- Every row has an options value.
- Every row has a correct answer.
- The correct answer exists in the options list.

### The page is blank

Open the browser Developer Tools:

- Chrome or Edge: `F12` or `Ctrl + Shift + J`
- Firefox: `F12`, then select **Console**

Look for JavaScript errors.

Confirm that `index.html` includes:

```html
<link rel="stylesheet" href="styles.css" />
<script src="script.js"></script>
```

The script tag should normally be placed just before the closing `body` tag:

```html
<script src="script.js"></script>
</body>
</html>
```

### The CSV loads but questions are missing

Check the CSV formatting.

Use the pipe separator for answer options:

```csv
"Option A|Option B|Option C|Option D"
```

Make sure the correct answer exactly matches one of the options.

For example:

```csv
Options,Correct Answer
"Cold|Warm|Hot|Mild",Cold
```

### CSV fields contain commas

Enclose the entire field in double quotes.

Correct:

```csv
"Existing in large quantities, more than enough","Plentiful"
```

### The application works locally but not after deployment

Check that:

- `questions.csv` was committed to the repository.
- The filename uses lowercase letters.
- The file is in the same directory as `index.html`.
- The deployed URL uses HTTPS.
- The deployment has completed successfully.
- The browser has been refreshed without using a cached version.

## Browser Compatibility

The application uses standard browser APIs:

- `fetch`
- `FileReader`
- `FormData`
- `Promise`
- DOM manipulation APIs

It should work in current versions of:

- Chrome
- Edge
- Firefox
- Safari

## Deployment to GitHub Pages

### Repository preparation

Make sure the repository contains:

```text
index.html
styles.css
script.js
questions.csv
README.md
```

Commit the files:

```bash
git add index.html styles.css script.js questions.csv README.md
git commit -m "Add English Synonyms Test application"
git push origin main
```

### Enable GitHub Pages

1. Open the GitHub repository.
2. Select **Settings**.
3. Select **Pages**.
4. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**.
6. Wait for GitHub Pages to publish the site.

The website URL will normally be:

```text
https://YOUR-GITHUB-USERNAME.github.io/REPOSITORY-NAME/
```

For this repository, the expected URL is:

```text
https://traviprasad.github.io/ps-sustain-synonyms-test/
```

## Deployment to Netlify

1. Sign in to Netlify.
2. Select **Add new site**.
3. Choose **Import an existing project**.
4. Select the GitHub repository.
5. Configure:
   - Build command: leave empty
   - Publish directory: `.`
6. Deploy the site.

## Deployment to Vercel

1. Sign in to Vercel.
2. Select **Add New Project**.
3. Import the GitHub repository.
4. Use the default project settings.
5. Deploy.

Because this is a static application, no build command is required.

## End-to-End Test Checklist

### Initial loading

- [ ] `index.html` opens successfully.
- [ ] `styles.css` loads correctly.
- [ ] `script.js` loads without console errors.
- [ ] `questions.csv` loads successfully.
- [ ] The loaded question count is displayed.

### Test creation

- [ ] The Start New Test button is enabled.
- [ ] Exactly 10 questions appear.
- [ ] Every question has answer options.
- [ ] Each question requires an answer.
- [ ] Answer options are randomized.

### Submission

- [ ] The browser prevents submission when unanswered questions remain.
- [ ] The test submits after all questions are answered.
- [ ] The score is calculated correctly.
- [ ] The percentage is displayed.

### Review

- [ ] Every question appears in the review.
- [ ] The selected answer is shown.
- [ ] The correct answer is shown.
- [ ] The meaning is shown.
- [ ] The explanation is shown.
- [ ] Synonyms are shown.
- [ ] The example sentence is shown.
- [ ] Correct answers have positive styling.
- [ ] Incorrect answers have negative styling.

### Responsive design

- [ ] The application works on desktop.
- [ ] The application works on tablet.
- [ ] The application works on mobile.
- [ ] Buttons remain usable on small screens.
- [ ] Text does not overflow horizontally.

## Recommended Git Workflow

Create a feature branch:

```bash
git checkout -b feature/synonyms-test
```

Check the project files:

```bash
git status
```

Add the files:

```bash
git add index.html styles.css script.js questions.csv README.md
```

Commit the changes:

```bash
git commit -m "Add English Synonyms Test application"
```

Push the branch:

```bash
git push -u origin feature/synonyms-test
```

Then open a pull request on GitHub.

## Future Improvements

Possible future enhancements include:

- Timer for each test
- Difficulty levels
- Category filtering
- Progress indicators
- Local score history
- Student name entry
- Printable results
- Accessibility improvements
- Teacher question management
- Question search
- Exporting results
- Backend storage
- User accounts
- Leaderboards
- Installable Progressive Web App support

## License

Add the appropriate license for your project before publishing or distributing the application.

Example:

```text
MIT License
```
```