/**
 * Lint-staged configuration for Second Opinion Platform
 * Runs quality checks on staged files before commit
 */

module.exports = {
  // TypeScript and JavaScript files
  '*.{ts,tsx,js,jsx}': [
    'eslint --fix',
    'prettier --write',
    'git add',
  ],
  
  // JSON files
  '*.json': [
    'prettier --write',
    'git add',
  ],
  
  // Markdown files
  '*.md': [
    'prettier --write',
    'git add',
  ],
  
  // YAML files
  '*.{yml,yaml}': [
    'prettier --write',
    'git add',
  ],
  
  // TypeScript files - run type checking
  '*.{ts,tsx}': [
    () => 'tsc --noEmit',
  ],
  
  // Test files - run related tests
  '*.{test,spec}.{ts,tsx,js,jsx}': [
    'jest --bail --findRelatedTests',
  ],
};