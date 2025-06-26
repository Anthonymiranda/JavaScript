const input = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultEl = document.getElementById("results-div");
const regex =
  /^(?:1\s?)?(?:(\d{10})|(?:\(\d{3}\)\s?\d{3}-\d{4})|(?:\d{3}\s\d{3}\s\d{4})|(?:\d{3}-\d{3}-\d{4}))$/;

checkBtn.addEventListener("click", function () {
  event.preventDefault();
  if (input.value.length === 0 || input.value === undefined) {
    alert("Please provide a phone number");
  } else {
    testRegex();
    input.value = "";
  }
});
clearBtn.addEventListener("click", function () {
  event.preventDefault();
  resultEl.innerHTML = "";
  input.value = "";
});
function testRegex(arg) {
  arg = input.value;
  //   console.log(test.test(arg));
  regex.test(arg) ? validNumber() : invalidNumber();
}

function validNumber() {
  const newParaEl = document.createElement("p");
  newParaEl.textContent = `Valid US Number: ${input.value} \n`;
  resultEl.appendChild(newParaEl);
}
function invalidNumber() {
  const newParaEl = document.createElement("p");
  newParaEl.textContent = `Invalid US Number: ${input.value} \n`;
  resultEl.appendChild(newParaEl);
}
