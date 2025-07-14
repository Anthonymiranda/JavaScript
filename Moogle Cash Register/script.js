let cash = document.getElementById("cash");
let changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const priceTotal = document.querySelector(".price");
const changeWrapper = document.getElementById("changeWrapper");
let price = 1.87;
priceTotal.innerText += price;
let cid = [
  "PENNY",
  "NICKEL",
  "DIME",
  "QUARTER",
  "ONE",
  "FIVE",
  "TEN",
  "TWENTY",
  "ONE HUNDRED",
];
const cidObj = {
  0.01: 1.01,
  0.05: 2.05,
  0.1: 3.1,
  0.25: 3.1,
  1: 90,
  5: 55,
  10: 20,
  20: 60,
  100: 100,
};
const changeLeftObj = {
  0.01: 1.01,
  0.05: 2.05,
  0.1: 3.1,
  0.25: 3.1,
  1: 90,
  5: 55,
  10: 20,
  20: 60,
  100: 100,
};
const cashOut = {};
const changeArr = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

function checkInput(cash) {
  cash = parseFloat(cash.value);
  cash -= price;
  cash = Math.ceil(cash * 100) / 100;
  return cash;
}
function runRegister(newCash) {
  let index = 8;
  if (newCash >= 0.01 && newCash < 0.05) {
    index = 0;
  } else if (newCash < 100) {
    index = changeArr.findIndex((el) => el > newCash) - 1;
  }

  changeLeftObj[changeArr[index]] -= changeArr[index];
  console.log("changeleft object:", changeLeftObj);
  newCash -= changeArr[index];
  newCash = Math.ceil(newCash * 100) / 100;
  const findChange = cid[index];
  cashOut[findChange] = (cashOut[findChange] ?? 0) + changeArr[index];
  return newCash;
}

purchaseBtn.addEventListener("click", () => {
  let newCash = checkInput(cash);
  let inputCash = Number(cash.value);
  if (inputCash < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (inputCash == price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
  } else {
    changeDue.innerHTML += `<p>Status: OPEN</p>`;
    cashRegister(newCash);
  }
});

function cashRegister(newCash) {
  newCash = runRegister(newCash);
  if (newCash <= 0) {
    for (let key in cashOut) {
      changeDue.innerHTML += `<p>${key}: $${cashOut[key]}</p>`;
    }
    changeWrapper.innerHTML = `<p>Change in drawer:</p>
        <p>Pennies: $<span>${changeLeftObj[0.01]}</span></p>
        <p>Nickels: $<span>${Math.ceil(changeLeftObj[0.05])}</span></p>
        <p>Dimes: $<span>${changeLeftObj[0.1]}</span></p>
        <p>Quarters: $<span>${changeLeftObj[0.25]}</span></p>
        <p>Ones: $<span>${changeLeftObj[1]}</span></p>
        <p>Fives: $<span>${changeLeftObj[5]}</span></p>
        <p>Tens: $<span>${changeLeftObj[10]}</span></p>
        <p>Twenties: $<span>${changeLeftObj[20]}</span></p>
        <p>Hundreds: $<span>${changeLeftObj[100]}</span></p>`;
    return;
  } else {
    cashRegister(newCash);
  }
}
