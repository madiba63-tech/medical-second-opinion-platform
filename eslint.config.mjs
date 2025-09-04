import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Healthcare Industry Standards
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      
      // Security Standards for Medical Data
      "no-eval": "error",
      "no-implied-eval": "error", 
      "no-new-func": "error",
      "no-script-url": "error",
      "no-alert": "error",
      
      // Code Quality Standards
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      "template-curly-spacing": ["error", "never"],
      
      // Error Handling Standards
      "no-throw-literal": "error",
      "prefer-promise-reject-errors": "error",
      
      // API Standards
      "consistent-return": "error",
      "default-case": "error",
      "default-case-last": "error",
      
      // Documentation Standards
      "valid-jsdoc": ["warn", {
        "requireReturn": false,
        "requireReturnDescription": false,
        "requireParamDescription": true
      }],
      
      // TypeScript Specific Standards
      "@typescript-eslint/explicit-function-return-type": ["warn", {
        "allowExpressions": true,
        "allowTypedFunctionExpressions": true
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      
      // Healthcare Data Protection
      "no-restricted-globals": ["error", "localStorage", "sessionStorage"],
      "no-restricted-properties": [
        "error",
        {
          "object": "document",
          "property": "cookie",
          "message": "Use secure cookie management utilities instead"
        }
      ],
      
      // Performance Standards
      "no-await-in-loop": "warn",
      "no-sync": "warn",
      
      // Code Formatting (handled by Prettier, but enforce style consistency)
      "indent": "off", // Handled by Prettier
      "quotes": ["error", "single", { "avoidEscape": true }],
      "semi": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "max-len": ["warn", { 
        "code": 120, 
        "ignoreUrls": true, 
        "ignoreStrings": true, 
        "ignoreTemplateLiterals": true 
      }],
      
      // Import/Export Standards
      "import/order": ["error", {
        "groups": [
          "builtin",
          "external", 
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always",
        "alphabetize": { "order": "asc", "caseInsensitive": true }
      }],
      "import/no-default-export": "off", // Allow for Next.js pages
      "import/prefer-default-export": "off",
      
      // React/Next.js Specific Standards
      "react/prop-types": "off", // Using TypeScript
      "react/react-in-jsx-scope": "off", // Next.js auto-imports
      "react-hooks/exhaustive-deps": "warn",
      "react/jsx-curly-brace-presence": ["error", { "props": "never", "children": "never" }],
      "react/self-closing-comp": ["error", { "component": true, "html": true }],
      
      // Healthcare Specific Naming Conventions
      "camelcase": ["error", { 
        "properties": "never",
        "ignoreDestructuring": true,
        "allow": ["patient_id", "case_id", "medical_record_id", "professional_id"]
      }]
    }
  },
  {
    // Specific rules for API routes
    files: ["src/app/api/**/*.ts", "src/pages/api/**/*.ts"],
    rules: {
      "no-console": "off", // Allow console in API routes for logging
      "@typescript-eslint/explicit-function-return-type": "error" // Require explicit return types for APIs
    }
  },
  {
    // Specific rules for microservices
    files: ["microservices/**/*.js", "microservices/**/*.ts"],
    rules: {
      "no-console": "off", // Allow console in microservices for logging
      "prefer-const": "error",
      "no-var": "error"
    }
  },
  {
    // Configuration files
    files: ["*.config.js", "*.config.ts", "*.config.mjs"],
    rules: {
      "import/no-default-export": "off"
    }
  }
];

export default eslintConfig;
