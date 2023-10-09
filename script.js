const sidebarSectionInfo = document.querySelector('.sidebar-section-info');
const descriptionSection = document.querySelector('.description');
const middleSection = document.querySelector('.middle-section');
const backStepSection = document.querySelector('#back-step-btn');
const nextStepButton = document.querySelector('#next-step-btn');
const inputContainer = document.querySelector('.input-container');
const plansContainer = document.querySelector('.plans-container');
const addOnsContainer = document.querySelector('.add-ons-container');
const finishingUpContainer = document.querySelector('.finishing-up-container');
const thankyouContainer = document.querySelector('.thankyou-container');
const sidebarNumberSections = document.querySelectorAll('.sidebar-number');
const summaryServiceSection = document.querySelector(
  '.summary-service-section'
);
const totalPriceSection = document.querySelector('.total-price-section');

let page = 1;
let selectService = {
  name: '',
  email: '',
  phone: '',
  plan: {
    name: 'Arcade',
    price: 9,
    planType: 'Monthly',
  },
  addOns: [],
};

// for header section ---------->
function createHeaderSection(headingText, description) {
  descriptionSection.innerHTML = '';
  const h1 = document.createElement('h1');
  h1.innerText = headingText;

  const p = document.createElement('p');
  p.innerText = description;

  descriptionSection.appendChild(h1);
  descriptionSection.appendChild(p);
}

// for removing activeness of sidebar number ------>
function removeActiveOnSidebarNumber() {
  sidebarNumberSections.forEach((sidebarNumber) => {
    sidebarNumber.classList.remove('sidebar-number-active');
  });
}

// for  input container ---------- >
function createPersonalInfoSection() {
  removeActiveOnSidebarNumber();
  let heading = 'Personal info';
  let description =
    'Please provide your name, email address, and phone number.';
  createHeaderSection(heading, description);

  sidebarNumberSections[0].classList.add('sidebar-number-active');
  inputContainer.classList.remove('hide-container');
  plansContainer.classList.add('hide-container');
  finishingUpContainer.classList.add('hide-container');
  backStepSection.classList.add('hide-button');
}

// for plans container -------- >
function createPlanPageSection() {
  removeActiveOnSidebarNumber();
  let heading = ' Select your plan';
  let description = 'You have the option of monthly or yearly billing.';
  createHeaderSection(heading, description);

  nextStepButton.innerText = 'Next Step';

  sidebarNumberSections[1].classList.add('sidebar-number-active');
  inputContainer.classList.add('hide-container');
  addOnsContainer.classList.add('hide-container');
  finishingUpContainer.classList.add('hide-container');

  plansContainer.classList.remove('hide-container');
  backStepSection.classList.remove('hide-button');
}

// for add-ons container ------------>
function creatAddOnsPageSection() {
  removeActiveOnSidebarNumber();
  let heading = 'Pick add-ons';
  let description = 'Add-ons help enhance your gaming experience.';
  createHeaderSection(heading, description);

  nextStepButton.innerText = 'Next Step';

  sidebarNumberSections[2].classList.add('sidebar-number-active');
  inputContainer.classList.add('hide-container');
  plansContainer.classList.add('hide-container');
  finishingUpContainer.classList.add('hide-container');

  addOnsContainer.classList.remove('hide-container');
  backStepSection.classList.remove('hide-button');
}

//  finishing up container ----------->
function createFinishingUpPageSection() {
  removeActiveOnSidebarNumber();
  let heading = 'Finishing up';
  let description = 'Double-check everything looks OK before confirming.';
  createHeaderSection(heading, description);

  nextStepButton.innerText = 'Confirm';

  sidebarNumberSections[3].classList.add('sidebar-number-active');
  addOnsContainer.classList.add('hide-container');
  finishingUpContainer.classList.remove('hide-container');
  backStepSection.classList.remove('hide-button');
}

// thankyou container -------------->
function createThankyouPageSection() {
  removeActiveOnSidebarNumber();
  sidebarNumberSections[3].classList.add('sidebar-number-active');
  descriptionSection.classList.add('hide-container');
  finishingUpContainer.classList.add('hide-container');

  thankyouContainer.classList.remove('hide-container');
  document.querySelector('.buttons').style.visibility = 'hidden';
  nextStepButton.classList.add('hide-button');
  backStepSection.classList.add('hide-button');
}

// for input validation ---------------->
function getInputValueWithValidation() {
  // console.log('validate input: ', page);
  const inputs = inputContainer.querySelectorAll('input');

  const name = inputs[0].value.trim();
  const email = inputs[1].value.trim();
  const phone = inputs[2].value.trim();

  const emptyMessage = 'This field is required !';

  if (!name) {
    showError(0, emptyMessage);
    return;
  }
  if (!email) {
    showError(1, emptyMessage);
    return;
  }
  if (!validateEmail(email)) {
    showError(1, 'Invalid Email ! ');
    return;
  }
  if (!phone) {
    showError(2, emptyMessage);
    return;
  }
  if (!validatePhoneNumber(phone)) {
    showError(2, 'Invalid Phone Number !');
    return;
  }
  selectService.name = name;
  selectService.email = email;
  selectService.phone = phone;
  return true;
}

//
function showError(index, errorMessage) {
  const inputs = inputContainer.querySelectorAll('input');
  const errorMessageSections =
    inputContainer.querySelectorAll('.Error-message');

  errorMessageSections[index].innerText = errorMessage;
  inputs[index].classList.add('input-error');

  setTimeout(() => {
    errorMessageSections[index].innerText = '';
    inputs[index].classList.remove('input-error');
  }, 4000);
}

// for validating email ------------------>
function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

//for validating phone number --------------->>

function validatePhoneNumber(phone) {
  let validPhoneformat =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  return phone.match(validPhoneformat);
}

// for next step page ------------>
function nextStepPage() {
  // console.log('next page: ', page);
  if (page === 1) {
    if (getInputValueWithValidation()) {
      page++;
      nextStepPage();
    }
  } else if (page === 2) {
    createPlanPageSection();
    page++;
  } else if (page === 3) {
    creatAddOnsPageSection();
    page++;
  } else if (page === 4) {
    createFinishingUpPageSection();
    calculateTotalPrice();
    page++;
  } else if (page === 5) {
    createThankyouPageSection();
  }
}

// for back step page ------------>
function backStepPage() {
  // console.log('back: ', page);

  if (page === 3) {
    page = 1;
    createPersonalInfoSection();
  } else if (page === 4) {
    page = 3;
    createPlanPageSection();
  } else if (page === 5) {
    page = 4;
    creatAddOnsPageSection();
  }
}

// for plans container page ------------>
function selectPlans(e) {
  const selectedClass = e.target.className;

  // for toggle button --------
  if (selectedClass === 'switch' || selectedClass === 'toggle') {
    const switchPlan = document.querySelector('.switch');
    const monthlyYearlySpan = plansContainer.querySelectorAll(
      '.monthly-yearly-section span'
    );

    const isYearlyPlanSelected = switchPlan
      .getAttribute('class')
      .includes('yearly-switch');
    const additionalFreeMonths = document.querySelectorAll('.additional-free');
    const monthlyPrices = document.querySelectorAll(
      '.plan-info p:nth-child(2)'
    );

    //toggle monthly plan if yearly plan is selected ---------->

    if (isYearlyPlanSelected) {
      switchPlan.classList.remove('yearly-switch');

      monthlyYearlySpan[1].style.color = 'var(--Cool-gray)';
      monthlyYearlySpan[0].style.color = 'var(--Marine-blue)';

      additionalFreeMonths.forEach((elem) => {
        elem.style.visibility = 'hidden';
      });
      monthlyPrices.forEach((elm) => {
        const yearlyPrice = elm.getAttribute('data-price');
        const monthlyPrice = Number(yearlyPrice) / 10;
        elm.setAttribute('data-price', `${monthlyPrice}`);
        elm.innerText = `$${monthlyPrice}/mo`;
      });
      selectService.plan.planType = 'Monthly';
      changeAddonsPrice(false);
    }
    //toggle yearly plan if monthly plan is selected ---------->
    else if (isYearlyPlanSelected === false) {
      switchPlan.classList.add('yearly-switch');

      monthlyYearlySpan[0].style.color = 'var(--Cool-gray)';
      monthlyYearlySpan[1].style.color = 'var(--Marine-blue)';

      additionalFreeMonths.forEach((elm) => {
        elm.style.visibility = 'visible';
      });
      monthlyPrices.forEach((elm) => {
        const monthlyPrice = elm.getAttribute('data-price');
        const yearlyPrice = Number(monthlyPrice) * 10;
        elm.setAttribute('data-price', `${yearlyPrice}`);
        elm.innerText = `$${yearlyPrice}/yr`;
      });

      selectService.plan.planType = 'Yearly';
      changeAddonsPrice(true);
    }
    const price = plansContainer
      .querySelector('.plan-selection')
      .querySelector('[data-price]')
      .getAttribute('data-price');
    selectService.plan.price = price;
    return;
  }

  // for select plan -----------
  const planSection = e.target.closest('.plan-section');
  const planSections = document.querySelectorAll('.plan-section');

  // for removing each selection on plan-section ----
  planSections.forEach((plan) => {
    plan.classList.remove('plan-selection');
  });

  planSection.classList.add('plan-selection');

  const price = planSection
    .querySelector('[data-price]')
    .getAttribute('data-price');
  const planName = planSection.querySelector('h3').innerText;

  console.log(price, planName);
  selectService.plan.name = planName;
  selectService.plan.price = price;
}

// for changing addons price on basis of yearly or montly plan ------->
function changeAddonsPrice(isYearly) {
  const servicePrices = addOnsContainer.querySelectorAll('[data-price]');

  if (isYearly) {
    servicePrices.forEach((servicePrice) => {
      const price = Number(servicePrice.getAttribute('data-price')) * 10;
      servicePrice.setAttribute('data-price', `${price}`);
      servicePrice.innerText = `+$${price}/yr`;
    });
  } else if (isYearly === false) {
    servicePrices.forEach((servicePrice) => {
      const price = Number(servicePrice.getAttribute('data-price')) / 10;
      servicePrice.setAttribute('data-price', `${price}`);
      servicePrice.innerText = `+$${price}/mo`;
    });
  }

  // updating addons services prices in selectService object based on plan selection ---
  selectAddOnsServices();
}

// for addons container page -------------->>
function selectAddOnsServices(e) {
  const serviceSection = e?.target?.closest('.service-section');
  serviceSection?.classList?.toggle('service-selection');

  addOnsContainer
    .querySelectorAll('.service-section')
    .forEach((serviceSection) => {
      serviceSection.querySelector('input').checked = false;
    });

  const serviceSelectionSections =
    addOnsContainer.querySelectorAll('.service-selection');

  selectService.addOns = [];
  serviceSelectionSections.forEach((section) => {
    section.querySelector('input').checked = true;
    const price = section
      .querySelector('[data-price]')
      .getAttribute('data-price');
    const planName = section.querySelector('.service-info h3').innerText;
    selectService.addOns.push({ name: planName, price: price });
  });
}

//for finishing up container page ------------>

function changePlan(e) {
  if (e.target.id === 'change-plan') {
    createPlanPageSection();
    page = 3;
  }
}

//for  calculating price--------------->>>>>

function calculateTotalPrice() {
  //for showing plantype with price --------

  const planType = selectService.plan.planType;
  const planName = selectService.plan.name;
  const price = `$${selectService.plan.price}/${
    planType === 'Yearly' ? 'yr' : 'mo'
  }`;

  finishingUpContainer.querySelector(
    '.monthly-yearly-summary-section h3'
  ).innerText = `${planName}(${planType})`;
  finishingUpContainer.querySelector(
    '.monthly-yearly-summary-section span'
  ).innerText = price;

  // for showing services with prices ---------

  let totalPrice = 0;
  summaryServiceSection.innerHTML = '';

  selectService.addOns.forEach((service) => {
    const summarySection = document.createElement('section');
    summarySection.classList.add('summary-section');

    const serviceName = document.createElement('p');
    serviceName.innerText = service.name;
    const servicePrice = document.createElement('span');
    const price = `$${service.price}/${planType === 'Yearly' ? 'yr' : 'mo'}`;
    servicePrice.innerText = price;

    summarySection.appendChild(serviceName);
    summarySection.appendChild(servicePrice);

    summaryServiceSection.appendChild(summarySection);

    totalPrice += Number(service.price) || 0;
  });

  totalPrice = totalPrice + Number(selectService.plan.price);

  totalPriceSection.querySelector('p').innerText = `Total (per ${
    planType === 'Yearly' ? 'year' : 'month'
  })`;
  totalPriceSection.querySelector('span').innerText = `$${totalPrice}/${
    planType === 'Yearly' ? 'yr' : 'mo'
  }`;
}

document.addEventListener('DOMContentLoaded', createPersonalInfoSection);

nextStepButton.addEventListener('click', nextStepPage);
backStepSection.addEventListener('click', backStepPage);

plansContainer.addEventListener('click', (e) => selectPlans(e));

addOnsContainer.addEventListener('click', (e) => selectAddOnsServices(e));

finishingUpContainer.addEventListener('click', (e) => changePlan(e));
