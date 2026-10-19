# Accessibility Scanner with Honest Reporting

Automated static WCAG 2.2 AA accessibility parser and honest reporting engine rejecting fabricated compliance scores and hallucinated checks.

[![CI](https://github.com/FelipeMadson/accessibility-scanner-honest-reporter/actions/workflows/ci.yml/badge.svg)](https://github.com/FelipeMadson/accessibility-scanner-honest-reporter/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

*Read this in [Português](README.pt-BR.md).*

---

## Principles of Honest Auditing

- **No Synthetic 100% Scores**: Strictly flags partial checks and manual review obligations instead of claiming full certification.
- **Deterministic AST & Pattern Evaluation**: Verifies image alt texts, input label associations, landmark hierarchy, button labels, and minimum color contrast ratios.
- **Actionable Remediation Snippets**: Identifies the exact violation line and offers copy-paste accessible code drop-ins.

---

## Usage Example

```typescript
import { A11yScanner } from './src/index.ts';

const scanner = new A11yScanner();
const report = scanner.scanHtml(`
  <html>
    <body>
      <img src="banner.jpg" />
      <button></button>
    </body>
  </html>
`);

console.log(`Violations: ${report.violations.length}`);
```

## License

MIT © [Felipe Madson](https://github.com/FelipeMadson)
