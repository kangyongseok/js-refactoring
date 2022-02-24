import statement from './index.js';
import invoice from './data/invoices.json'
import plays from './data/plays.json'

describe('Chapter01', () => {
  it('statement', () => {
    const result = statement(invoice, plays)
    expect(result).toBe(`청구내역 (고객명: BigCo)
 Hamlet: $650.00 (55석)
 As You Like It: $580.00 (35석)
 Othello: $500.00 (40석)
총액: $1,730.00
적립 포인트: 47점
`)
  })
})