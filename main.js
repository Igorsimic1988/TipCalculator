const billAmountInput = document.getElementById('bill-amount');
const numberOfPeopleInput = document.getElementById('number');
const tipButtons = document.querySelectorAll('input[name="tip"]');
const customTipInput = document.querySelector('.custom-tip');

const tipAmountDisplay = document.querySelector('.tipResult');
const totalAmountDisplay = document.querySelector('.totalResult');

const resetButton = document.querySelector('.reset-button');

const numberError = document.getElementById('number-error');

function sanitizeInput(value) {
  return value.replace(/[^0-9.]/g, '');
}

function calculateTip() {
  const billAmountInputValue = sanitizeInput(billAmountInput.value.trim());

  if (billAmountInputValue === '') {
    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
    billAmountInput.classList.add('error');
    return;
  }

  const billAmount = parseFloat(billAmountInputValue);

  if (isNaN(billAmount) || billAmount <= 0) {
    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
    billAmountInput.classList.add('error');
    return;
  } else {
    billAmountInput.classList.remove('error');
  }

  const numberOfPeopleInputValue = sanitizeInput(numberOfPeopleInput.value.trim());

  if (numberOfPeopleInputValue === '') {
    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
    numberOfPeopleInput.classList.add('error');
    return;
  }

  const numberOfPeople = parseInt(numberOfPeopleInputValue, 10);

  if (isNaN(numberOfPeople) || numberOfPeople <= 0) {
    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
    numberOfPeopleInput.classList.add('error');
    numberError.textContent = 'Must be at least 1';
    numberError.classList.add('visible');
    return;
  } else {
    numberOfPeopleInput.classList.remove('error');
    numberError.textContent = '';
    numberError.classList.remove('visible');
  }

  let tipPercentage;

  const selectedTipButton = document.querySelector('input[name="tip"]:checked');

  if (selectedTipButton) {
    tipPercentage = parseFloat(selectedTipButton.value);
    customTipInput.classList.remove('active');
  } else if (customTipInput.value) {
    const customTipValue = sanitizeInput(customTipInput.value.trim());
    tipPercentage = parseFloat(customTipValue);

    if (isNaN(tipPercentage) || tipPercentage < 0) {
      tipAmountDisplay.textContent = '$0.00';
      totalAmountDisplay.textContent = '$0.00';
      return;
    }

    customTipInput.classList.add('active');
  } else {
    tipPercentage = 0;
    customTipInput.classList.remove('active');
  }

  const tipAmountPerPerson = (billAmount * (tipPercentage / 100)) / numberOfPeople;
  const totalAmountPerPerson = (billAmount / numberOfPeople) + tipAmountPerPerson;

  tipAmountDisplay.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
  totalAmountDisplay.textContent = `$${totalAmountPerPerson.toFixed(2)}`;
}

billAmountInput.addEventListener('input', () => {
  billAmountInput.value = sanitizeInput(billAmountInput.value);
  calculateTip();
});

numberOfPeopleInput.addEventListener('input', () => {
  numberOfPeopleInput.value = sanitizeInput(numberOfPeopleInput.value);
  calculateTip();
});

customTipInput.addEventListener('input', () => {
  customTipInput.value = sanitizeInput(customTipInput.value);
  tipButtons.forEach((btn) => (btn.checked = false));
  calculateTip();
});

customTipInput.addEventListener('focus', () => {
  tipButtons.forEach((btn) => (btn.checked = false));
  calculateTip();
});

tipButtons.forEach((btn) => {
  btn.addEventListener('change', () => {
    calculateTip();
  });
});

resetButton.addEventListener('click', resetCalculator);

function resetCalculator() {
  billAmountInput.value = '';
  numberOfPeopleInput.value = '1';
  customTipInput.value = '';
  tipButtons.forEach((btn) => (btn.checked = false));
  document.getElementById('tip-20').checked = true;
  customTipInput.classList.remove('active');
  tipAmountDisplay.textContent = '$0.00';
  totalAmountDisplay.textContent = '$0.00';
  numberOfPeopleInput.classList.remove('error');
  billAmountInput.classList.remove('error');
  numberError.textContent = '';
  numberError.classList.remove('visible');
}

calculateTip();
