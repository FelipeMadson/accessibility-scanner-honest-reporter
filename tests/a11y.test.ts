import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { A11yScanner } from '../src/scanner.ts';

describe('A11yScanner', () => {
  it('detecta imagens ausentes de atributo alt', () => {
    const scanner = new A11yScanner();
    const report = scanner.scanHtml('<p>Banner</p><img src="pic.jpg">');

    assert.equal(report.violations.length, 1);
    assert.equal(report.violations[0].ruleId, 'image-alt-missing');
    assert.equal(report.violations[0].severity, 'CRITICAL');
  });

  it('detecta botões vazios sem aria-label', () => {
    const scanner = new A11yScanner();
    const report = scanner.scanHtml('<button class="icon-btn"></button>');

    assert.equal(report.violations.length, 1);
    assert.equal(report.violations[0].ruleId, 'button-empty-label');
  });

  it('permite botões com aria-label explícito', () => {
    const scanner = new A11yScanner();
    const report = scanner.scanHtml('<button aria-label="Fechar modal"></button>');

    assert.equal(report.violations.length, 0);
  });
});
