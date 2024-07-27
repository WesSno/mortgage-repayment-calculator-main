const mortgageAmount = document.getElementById("mortgage-amount");
const mortgageTerm = document.getElementById("mortgage-term");
const interestRate = document.getElementById("interest-rate");
const calculateButton = document.getElementById("repayment-button");
const displayResults = document.querySelector(".results-empty");
const displayedResults = document.querySelector(".results-filled");
const monthlyRepaymentValue = document.querySelector(".monthly-value");
const totalRepaymentValue = document.querySelector(".full-repayments");
const errorMessage = document.getElementsByClassName("error-message");
const radioButtons = document.querySelectorAll("input[name='mortgage-type']");
const inputFields = document.querySelectorAll("input");
const rootStyles = getComputedStyle(document.documentElement);
const red = rootStyles.getPropertyValue("--red").trim();
const lime = rootStyles.getPropertyValue("--lime").trim();
const black = rootStyles.getPropertyValue("--slate-900").trim();

const numberOfPaymentsPerYear = 12;

function monthlyInterest(r) {
  let i;

  return (i = r / 100 / numberOfPaymentsPerYear);
}

function totalNumberOfPayments(loanTerm) {
  let n = loanTerm * numberOfPaymentsPerYear;
  return n;
}

function monthlyPayment(principal, annualRate, loanTerm) {
  let interest = monthlyInterest(annualRate);
  let totalPayments = totalNumberOfPayments(loanTerm);
  let interestRaisedToPayments = (1 + interest) ** totalPayments;
  let interestRaisedToPaymentsMinusOne = (1 + interest) ** totalPayments - 1;

  let repayment =
    principal *
    ((interest * interestRaisedToPayments) / interestRaisedToPaymentsMinusOne);

  return repayment;
}

function totalRepayment(principal, annualRate, loanTerm) {
  let monthlyRepayment = monthlyPayment(principal, annualRate, loanTerm);
  let allNumberOfPayments = totalNumberOfPayments(loanTerm);

  let totalRepaymentOverTerm = monthlyRepayment * allNumberOfPayments;

  return totalRepaymentOverTerm;
}

function monthlyInterestPayment(principal, annualRate) {
  let monthlyInterestRate = monthlyInterest(annualRate);
  let interestMonthlyPayment = principal * monthlyInterestRate;

  return interestMonthlyPayment;
}

function interestPaidOverTerm(principal, annualRate, interestTerm) {
  let monthlyInterestPays = monthlyInterestPayment(principal, annualRate);
  let overTermPayment =
    monthlyInterestPays * interestTerm * numberOfPaymentsPerYear;

  return overTermPayment;
}

function totalRepaymentAtEndOfInterestPeriod(
  principal,
  annualRate,
  interestTerm
) {
  let overTermPays = interestPaidOverTerm(principal, annualRate, interestTerm);
  let totalRepayment = principal + overTermPays;

  return totalRepayment;
}

function validation() {
  let isValid = true;

  if (mortgageAmount.value === "") {
    document.querySelector(".input-prefix").classList.add("error-bg");
    errorMessage[0].classList.add("display-error");
    mortgageAmount.classList.add("error-border");
    isValid = false;
  } else {
    document.querySelector(".input-prefix").classList.remove("error-bg");
    errorMessage[0].classList.remove("display-error");
    mortgageAmount.classList.remove("error-border");
  }

  if (mortgageTerm.value === "") {
    document.querySelector(".input-suffix").classList.add("error-bg");
    errorMessage[1].classList.add("display-error");
    mortgageTerm.classList.add("error-border");
    isValid = false;
  } else {
    document.querySelector(".input-suffix").classList.remove("error-bg");
    errorMessage[1].classList.remove("display-error");
    mortgageTerm.classList.remove("error-border");
  }

  if (interestRate.value === "") {
    document.querySelector(".two").classList.add("error-bg");
    errorMessage[2].classList.add("display-error");
    interestRate.classList.add("error-border");
    isValid = false;
  } else {
    document.querySelector(".two").classList.remove("error-bg");
    errorMessage[2].classList.remove("display-error");
    interestRate.classList.remove("error-border");
  }

  let isRadioSelected = false;

  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      isRadioSelected = true;
    }
  });

  if (!isRadioSelected) {
    document.querySelector(".mortgage-type .error-message").style.display =
      "block";
    isValid = false;
  } else {
    document.querySelector(".mortgage-type .error-message").style.display =
      "none";
  }

  return isValid;
}

function emptyFields() {
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", () => {
      document.querySelector(".mortgage-type .error-message").style.display =
        "none";
    });
  });

  inputFields.forEach((inputField) => {
    inputField.addEventListener("focus", () => {
      inputField.style.borderColor = lime;
    });

    inputField.addEventListener("blur", () => {
      if (inputField.value === "") {
        if (inputField.id === "mortgage-amount") {
          document.querySelector(".input-prefix").classList.add("error-bg");
          errorMessage[0].classList.add("display-error");
          mortgageAmount.classList.add("error-border");
        } else if (inputField.id === "mortgage-term") {
          document.querySelector(".input-suffix").classList.add("error-bg");
          errorMessage[1].classList.add("display-error");
          mortgageTerm.classList.add("error-border");
        } else if (inputField.id === "interest-rate") {
          document.querySelector(".two").classList.add("error-bg");
          errorMessage[2].classList.add("display-error");
          interestRate.classList.add("error-border");
        }
        inputField.style.borderColor = red;
      } else {
        if (inputField.id === "mortgage-amount") {
          document.querySelector(".input-prefix").classList.remove("error-bg");
          errorMessage[0].classList.remove("display-error");
          mortgageAmount.classList.remove("error-border");
        } else if (inputField.id === "mortgage-term") {
          document.querySelector(".input-suffix").classList.remove("error-bg");
          errorMessage[1].classList.remove("display-error");
          mortgageTerm.classList.remove("error-border");
        } else if (inputField.id === "interest-rate") {
          document.querySelector(".two").classList.remove("error-bg");
          errorMessage[2].classList.remove("display-error");
          interestRate.classList.remove("error-border");
        }
        inputField.style.borderColor = black;
      }
    });
  });
}

function formatResult(number) {
  return number.toLocaleString("en-US");
}

document.querySelector(".clear-form").addEventListener("click", () => {
  displayResults.style.display = "block";
  /**************** MORTGAGE AMOUNT ******************/
  displayedResults.classList.remove("display");
  document.querySelector(".input-prefix").classList.remove("error-bg");
  errorMessage[0].classList.remove("display-error");
  mortgageAmount.classList.remove("error-border");

  /****************** MORTGAGE TERM *************/
  document.querySelector(".input-suffix").classList.remove("error-bg");
  errorMessage[1].classList.remove("display-error");
  mortgageTerm.classList.remove("error-border");

  /***************** INTEREST RATE ***************/
  document.querySelector(".two").classList.remove("error-bg");
  errorMessage[2].classList.remove("display-error");
  interestRate.classList.remove("error-border");

  /******************* RESET BORDERS **************/
  const inputFields = document.querySelectorAll("input[type='number']");
  inputFields.forEach((inputField) => {
    inputField.classList.remove("error-border");
    inputField.style.borderColor = black;
    inputFields.forEach((inputField) => () => {
      inputField.addEventListener("blur", () => {
        inputField.style.borderColor = lime;
      });
    });
  });

  document.querySelector(".mortgage-type .error-message").style.display =
    "none";
  document.getElementById("form").reset();
});

calculateButton.addEventListener("click", (e) => {
  e.preventDefault();
  emptyFields();
  if (validation()) {
    let mortgageAmountValue = Math.abs(mortgageAmount.value);
    let mortgageTermValue = Math.abs(mortgageTerm.value);
    let interestRateValue = Math.abs(interestRate.value);

    if (document.getElementById("repayment").checked) {
      monthlyRepaymentValue.innerHTML = `£${formatResult(
        monthlyPayment(
          mortgageAmountValue,
          interestRateValue,
          mortgageTermValue
        )
      )}`;
      totalRepaymentValue.innerHTML = `£${formatResult(
        totalRepayment(
          mortgageAmountValue,
          interestRateValue,
          mortgageTermValue
        )
      )}`;
      displayResults.style.display = "none";
      displayedResults.classList.add("display");
    } else if (document.getElementById("interest-only").checked) {
      monthlyRepaymentValue.innerHTML = `£${formatResult(
        monthlyInterestPayment(mortgageAmountValue, mortgageTermValue)
      )}`;
      totalRepaymentValue.innerHTML = `£${formatResult(
        interestPaidOverTerm(
          mortgageAmountValue,
          mortgageTermValue,
          interestRateValue
        )
      )}`;
      displayResults.style.display = "none";
      displayedResults.classList.add("display");
    }
    displayedResults.scrollIntoView({ behavior: "smooth" });
  }
});
