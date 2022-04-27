// 함수 인라인 하기

// #1
function getRating(driver) {
  return (driver.numberOfLateDeliveries > 5) ? 2 : 1;
}

// #2
function reportLines(aCustomer) {
  const lines = []
  lines.push(["name", aCustomer.name]);
  lines.push(["location", aCustomer.location]);
  return lines
}