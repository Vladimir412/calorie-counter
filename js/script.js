const form = document.querySelector('.form')
const inputsParsams = form.querySelector('.inputs-group')
const age = inputsParsams.querySelector('#age')
const height = inputsParsams.querySelector('#height')
const weight = inputsParsams.querySelector('#weight')
const genderSwitcher = form.querySelector('.switcher')
const male = genderSwitcher.querySelector('#gender-male')
const female = genderSwitcher.querySelector('#gender-female')
const physicalActivity = document.querySelector('.radios-group')
const minimalActive = physicalActivity.querySelector('#activity-minimal')
const lowActive = physicalActivity.querySelector('#activity-low')
const middleActive = physicalActivity.querySelector('#activity-medium')
const hightActive = physicalActivity.querySelector('#activity-high')
const maxmalActive = physicalActivity.querySelector('#activity-maximal')
const buttonSubmit = form.querySelector('.form__submit-button')
const buttonReset = form.querySelector('.form__reset-button')
let normWeight = document.querySelector('#calories-norm')
let upWeight = document.querySelector('#calories-maximal')
let downWeight = document.querySelector('#calories-minimal')
const resultCalories = document.querySelector('.counter__result')
let stateGender = male.value
let stateActive = { tipe: minimalActive.value, coefficient: 1.2 };
let stateResult = false



function getAgeValue(e) {
    age.textContent = e.target.value;
}

function getHeightValue(e) {
    height.textContent = e.target.value;
}

function getWeightValue(e) {
    weight.textContent = e.target.value;
}

function checkPhysicalActivity(e) {
    if (e.target.value === 'min') {
        stateActive = { tipe: minimalActive.value, coefficient: 1.2 };
    }
    if (e.target.value === 'low') {
        stateActive = { type: lowActive.value, coefficient: 1.375 };
    }
    if (e.target.value === 'medium') {
        stateActive = { type: middleActive.value, coefficient: 1.55 };
    }
    if (e.target.value === 'high') {
        stateActive = { type: hightActive.value, coefficient: 1.725 };
    }
    if (e.target.value === 'max') {
        stateActive = { type: maxmalActive.value, coefficient: 1.9 };
    }
}

function inputClear() {
    const ageNum = Number(age.value)
    const heightNum = Number(height.value)
    const weightNum = Number(weight.value)

    if (ageNum > 0 || heightNum > 0 || weightNum > 0) {
        buttonReset.disabled = false;
        activeButtonSubmit();
    } else {
        buttonReset.disabled = true;
    }
}

function activeButtonSubmit() {

    if (age.value > 0 && height.value > 0 && weight.value > 0) {
        buttonSubmit.disabled = false;
    } else {
        buttonSubmit.disabled = true;
    }
}

function checkedGender(e) {
    if (e.target.value === 'male') {
        stateGender = male.value;
    }
    if (e.target.value === 'female') {
    stateGender = female.value;
    }
}

function formReset() {
    if (resultCalories.classList.contains('counter__result--hidden')) {
        age.value = '';
    height.value = '';
    weight.value = '';
    minimalActive.checked = true;
    male.checked = true;
    buttonSubmit.disabled = true
    buttonReset.disabled = true
    }
    if (stateResult === false) {
    age.value = '';
    height.value = '';
    weight.value = '';
    minimalActive.checked = true;
    male.checked = true;
    buttonSubmit.disabled = true
    }
    if (stateResult === true) {
        resultCalories.classList.add('counter__result--hidden')
        stateResult = false
        buttonReset.disabled = true
    }
}

function disabledButtonReset() {
    formReset();
}

function formSubmit(e) {
    e.preventDefault();
    resultCalories.classList.remove('counter__result--hidden');

    const forFemale = (10 * weight.value) + (6.25 * height.value) - (5 * age.value) - 161;
    const forMale = (10 * weight.value) + (6.25 * height.value) - (5 * age.value) + 5;
    if (stateGender === 'male') {
        normWeight.textContent = Math.round(forMale * stateActive.coefficient)
        upWeight.textContent = Math.round(forMale * stateActive.coefficient + ((forMale * stateActive.coefficient) * 0.15))
        downWeight.textContent = Math.round(forMale * stateActive.coefficient - ((forMale * stateActive.coefficient) * 0.15))
        formReset()
        stateResult = true
    }
    if (stateGender === 'female') {
        normWeight.textContent = Math.round(forFemale * stateActive.coefficient)
        upWeight.textContent = Math.round(forFemale * stateActive.coefficient + ((forFemale * stateActive.coefficient) * 0.15))
        downWeight.textContent = Math.round(forFemale * stateActive.coefficient - ((forFemale * stateActive.coefficient) * 0.15))
        formReset()
        stateResult = true
    }
}

form.addEventListener('submit', formSubmit)
form.addEventListener('reset', disabledButtonReset)
inputsParsams.addEventListener('input', inputClear)
//выбираем активность
physicalActivity.addEventListener('change', checkPhysicalActivity)
//выбераем гендер
genderSwitcher.addEventListener('change', checkedGender)
//получаем данные с инпутов
age.addEventListener('input', getAgeValue)
height.addEventListener('input', getHeightValue)
weight.addEventListener('input', getWeightValue)

