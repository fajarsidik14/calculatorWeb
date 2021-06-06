//object calculator beserta property yang menggambarkan data dan kondisi dari kalkulatornya.
const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

//fungsi update/memperbarui
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}
//fungsi clear/menghapus
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

//fungsi memasukan data/input
function inputDigit(digit) {
    if (calculator.waitingForSecondNumber && calculator.firstNumber === calculator.displayNumber) {
        calculator.displayNumber = digit;

    } else {
        if (calculator.displayNumber === '0') {
            calculator.displayNumber = digit;
        } else {
            calculator.displayNumber += digit;
        }
    }
}


//fungsi inverse number
function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

//fungsi untuk menetapkan sebuah operator + atau - untuk kalkulator
function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

    } else {
        alert('Operator sudah ditetapkan')

    }

}

//fungsi ini untuk melakukan kalkulasi terhadap nilai-nilai yang terdapat pada object.
function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }

    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);

    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)

    }
    calculator.displayNumber = result;

}

//variabel buttons event click ,untuk mendapatkan nilai seluruh elemen button kita gunakan "querySelectorAll("#button")
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function (event) {
        //mendaptkan objek elemen yang diklik
        const target = event.target;

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }
        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }
        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }
        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            updateDisplay();
            return;
        }

        inputDigit(target.innerText);
        updateDisplay()

    });
}