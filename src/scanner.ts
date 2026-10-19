import type { A11yViolation, AuditReport } from './types.ts';

export class A11yScanner {
  scanHtml(html: string): AuditReport {
    const violations: A11yViolation[] = [];
    let passedChecks = 0;

    // 1. Verificação de tags <img> sem alt
    const imgRegex = /<img\b(?![^>]*\balt=)[^>]*>/gi;
    let match: RegExpExecArray | null;
    while ((match = imgRegex.exec(html)) !== null) {
      violations.push({
        ruleId: 'image-alt-missing',
        wcagCriteria: '1.1.1 Non-text Content',
        severity: 'CRITICAL',
        message: 'Elemento <img> ausente do atributo alt obrigatório.',
        elementHtml: match[0].slice(0, 100)
      });
    }
    if (!/<img/i.test(html) || violations.every(v => v.ruleId !== 'image-alt-missing')) {
      passedChecks++;
    }

    // 2. Verificação de botões vazios sem texto acessível
    const btnRegex = /<button\b[^>]*>(?:\s*|<!--.*?-->)<\/button>/gi;
    while ((match = btnRegex.exec(html)) !== null) {
      // Se tiver aria-label, é acessível
      if (!/aria-label=/i.test(match[0])) {
        violations.push({
          ruleId: 'button-empty-label',
          wcagCriteria: '4.1.2 Name, Role, Value',
          severity: 'CRITICAL',
          message: 'Elemento <button> não possui texto visível ou aria-label.',
          elementHtml: match[0]
        });
      }
    }

    // 3. Verificação de inputs sem id/label ou aria-label
    const inputRegex = /<input\b(?![^>]*\btype=["'](?:hidden|submit|button|reset)["'])[^>]*>/gi;
    while ((match = inputRegex.exec(html)) !== null) {
      const tag = match[0];
      const hasId = /id=["']([^"']+)["']/i.test(tag);
      const hasAria = /aria-label(?:ledby)?=/i.test(tag);
      if (!hasId && !hasAria) {
        violations.push({
          ruleId: 'input-unlabelled',
          wcagCriteria: '1.3.1 Info and Relationships',
          severity: 'SERIOUS',
          message: 'Elemento <input> não possui id associado a label nem aria-label.',
          elementHtml: tag.slice(0, 100)
        });
      }
    }

    return {
      scannedAt: new Date().toISOString(),
      violations,
      manualReviewsRequired: [
        'Verificação manual de ordem lógica de tabulação (Tab Index)',
        'Auditoria auditiva por leitor de tela (NVDA / VoiceOver)'
      ],
      passedChecks
    };
  }
}
