const base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const fromCurr = document.querySelector(".From select");
const toCurr = document.querySelector(".To select");
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
    updateExchangeRate();
});

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }

        if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });

}

const updateFlag = (element) => {
    let currCode = element.value;
    let counCode = countryList[currCode];
    let counFlag = `https://flagsapi.com/${counCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = counFlag;
};

const updateExchangeRate = async () => {
    let input = document.querySelector(".amount input");
    let inputVal = input.value;

    if(inputVal == 0 || inputVal<0) {
        inputVal = 1;
        input.value = "1";
    }

const URL = `${base_URL}/${fromCurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();
const rate = data[`${fromCurr.value.toLowerCase()}`][`${toCurr.value.toLowerCase()}`];
let finalAmt = `${inputVal * rate}`;
msg.innerText=`${inputVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});





