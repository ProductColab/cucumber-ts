# Sneaky

A TypeScript project using Cucumber for behavior-driven development (BDD).

## Testing Setup

This project uses Cucumber.js with TypeScript for behavior-driven development. The setup includes:

- Cucumber.js for BDD testing
- TypeScript support
- HTML report generation
- Pretty formatter for console output
- GitHub Pages integration for test reports

### Dependencies

The following key dependencies are used for testing:

```json
{
  "devDependencies": {
    "@cucumber/cucumber": "^11.2.0",
    "@cucumber/pretty-formatter": "^1.0.1",
    "bun": "^1.2.5",
    "typescript": "~5.7.2"
  }
}
```

### Configuration

The project uses two main configuration files:

1. `cucumber.json` - Configures Cucumber test execution:

   - Uses pretty formatter for console output
   - Generates HTML reports
   - Looks for feature files in `src/**/*.feature`
   - Imports step definitions from `support/**/*.ts` and `src/**/*.steps.ts`

2. `tsconfig.json` - TypeScript configuration:
   - Includes feature files and step definitions
   - Uses modern ES2020 features
   - Enables strict type checking

## Running Tests

### Prerequisites

1. Install dependencies:

   ```bash
   npm install
   # or
   bun install
   ```

2. Make sure you have Bun installed (the project uses Bun as the test runner)

### Commands

Run the tests:

```bash
bunx --bun cucumber-js -p default
```

View the HTML report locally:

```bash
bun test/cucumber-report.html
```

### Test Structure

- Feature files are located in `src/**/*.feature`
- Step definitions are in `src/**/*.steps.ts`
- Support files (hooks, world, etc.) are in `support/**/*.ts`

## Writing Tests

### Feature Files

Feature files are written in Gherkin syntax and should be placed in the `src` directory with the `.feature` extension. Example:

```gherkin
Feature: Example Feature
  As a user
  I want to do something
  So that I can achieve a goal

  Scenario: Example scenario
    Given some precondition
    When I perform an action
    Then I should see a result
```

### Step Definitions

Step definitions should be written in TypeScript and placed in files with the `.steps.ts` extension. They should be in the same directory as their corresponding feature files.

## Test Reports

The project generates two types of reports:

1. Console output using the pretty formatter
2. HTML report in `cucumber-report.html`

### Local Reports

To view the HTML report after running tests locally:

```bash
bun test/cucumber-report.html
```

### GitHub Pages Integration

The test report is automatically deployed to GitHub Pages on every push to the main branch. To set this up:

1. Go to your repository's Settings
2. Navigate to "Pages" in the sidebar
3. Under "Source", select "GitHub Actions"
4. The test report will be automatically deployed to `https://<username>.github.io/<repository-name>/cucumber-report.html`

The deployment is handled by the GitHub Actions workflow in `.github/workflows/test-report.yml`, which:

- Runs on every push to main and pull requests
- Sets up Bun
- Runs the tests
- Uploads the report as a GitHub Pages artifact
- Deploys the artifact to GitHub Pages (only on main branch)
- Uses the official GitHub Pages deployment actions for secure and reliable deployment

The workflow includes:

- Proper permissions configuration for GitHub Pages deployment
- Concurrency settings to prevent deployment conflicts
- Environment configuration for deployment status tracking
- Separate jobs for testing and deployment
