// 공연료 청구서 출력
const invoice = require('./data/invoices.json')
const play = require('./data/plays.json')
const createStatementData = require('./createStatementData.js')

console.log(statement(invoice, play))
console.log(htmlStatement(invoice, play))

function renderPlainText(data) {
  let result = `청구내역 (고객명: ${data.customer})\n`

  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    }석)\n`
  }

  result += `총액: ${usd(data.totalAmount)}\n`
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`
  return result

  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100)
  }
}


function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays))
}


function remderHtml(data) {
  const contents = data.performances.map(perf => {
    return `
    <tr>
      <td>${perf.play.name}</td>
      <td>${perf.audience}석</td>
      <td>${usd(perf.amount)}</td>
    </tr>
    `
  }).join('')

  let result = `
    <h1>청구내역 (고객명: ${data.customer})</h1>
    <table>
      <tr>
        <th>연극</th>
        <th>좌석수</th>
        <th>금액</th>
      </tr>
      ${contents}
    </table>
    <p>총액: ${usd(data.totalAmount)}</p>
    <p>적립 포인트: ${data.totalVolumeCredits}점</p>
  `
  return result

}

function usd(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber / 100)
}


function htmlStatement(invoice, plays) {
  return remderHtml(createStatementData(invoice, plays))
}

module.exports = statement
