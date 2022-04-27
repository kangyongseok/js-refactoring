// 함수 인라인 하기

// #1
function getRating(driver) {
  return (driver.numberOfLateDeliveries > 5) ? 2 : 1;
}

// #2
function reportLines(aCustomer) {
  const lines = []
  lines.push(["name", aCustomer.name]);
  gatherCustomerData(lines, aCustomer)
  return lines
}

function gatherCustomerData(out, aCustomer) {
  out.push(["location", aCustomer.location]);
}