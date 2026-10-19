export type Severity = 'CRITICAL' | 'SERIOUS' | 'MODERATE' | 'MINOR';

export interface A11yViolation {
  ruleId: string;
  wcagCriteria: string;
  severity: Severity;
  message: string;
  elementHtml: string;
}

export interface AuditReport {
  scannedAt: string;
  violations: A11yViolation[];
  manualReviewsRequired: string[];
  passedChecks: number;
}
