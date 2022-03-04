
class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance
    this.play = aPlay
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0)
    // let result = 0
    // result += Math.max(this.performance.audience - 30, 0)
    // if ('comedy' === this.play.type)
    //   result += Math.floor(this.performance.audience / 5)

    // return result
  }

  get amount() {
    throw new Error('서브클래스에서 처리하도록 설계되었습니다.')
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30)
    }
    return result;
  }
}
class ComedyCalculator extends PerformanceCalculator {
  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }

  get amount() {
    let result = 30000
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20)
    }
    result += 300 * this.performance.audience
    return result
  }
}

function createPerformanceCalculator(aPerformance, aPlay) {
  switch(aPlay.type) {
    case 'tragedy': return new TragedyCalculator(aPerformance, aPlay)
    case 'comedy': return new ComedyCalculator(aPerformance, aPlay)
    default: throw new Error(`알 수 없느 장르: ${aPlay.type}`)
  }
  // return new PerformanceCalculator(aPerformance, aPlay)
}

function createStatementData(invoice, plays) {
  const statementData = {}
  statementData.customer = invoice.customer
  statementData.performances = invoice.performances.map(enrichPerfomence)
  statementData.totalAmount = totalAmount(statementData)
  statementData.totalVolumeCredits = totalVolumeCredits(statementData)
  return statementData


  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0)
  }

  function enrichPerfomence(aPerformance) {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance))
    const result = Object.assign({}, aPerformance) // 얕은 복사
    result.play = calculator.play
    result.amount = calculator.amount
    result.volumeCredits = calculator.volumeCredits
    return result
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }
}
module.exports = createStatementData