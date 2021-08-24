class Calculator{
    constructor(previousNumberElement, currentNumberElement){
        this.previousNumberElement = previousNumberElement
        this.currentNumberElement = currentNumberElement
        this.clear()
    }

   clear(){
    this.currentNumber = ''
    this.previousNumber = ''
    this.operation = undefined
   }

   delete(){
       this.currentNumber = this.currentNumber.toString().slice(0, -1)

   }

   appendNumber(number){
    if(number === '.' && this.currentNumber.includes('.')) return
    this.currentNumber = this.currentNumber.toString() + number.toString()
   }

   chooseOperation(operation){
    if(this.currentNumber === '') return
    if(this.previousNumber !== ''){
        this.compute()
    }
    this.operation = operation
    this.previousNumber = this.currentNumber
    this.currentNumber = ''
   }

   compute(){
       let computaion
       const prev = parseFloat(this.previousNumber)
       const current = parseFloat(this.currentNumber)
       if(isNaN(prev) || isNaN(current)) return
       switch (this.operation){
           case '+':
               computaion = prev + current
               break
            case '/':
               computaion = prev / current
               break   
            case '-':
                computaion = prev - current
                break
            case '*':
                computaion = prev * current
                break
            default:
                return
       }
       this.currentNumber = computaion
       this.operation = undefined
       this.previousNumber = ''
   }


   getDisplayNumber(number){
       const stringNumber = number.toString();
       const intigerDigits = parseFloat(stringNumber.split('.')[0]);
       const decimalDigits = stringNumber.split('.')[1];
       let intigerDisplay
       if (isNaN(intigerDigits)) {
           intigerDisplay = ''
       }
       else{
           intigerDisplay = intigerDigits.toLocaleString('en', { maximumFractionDigits: 0})
       }
       if (decimalDigits != null){
           return `${intigerDisplay}.${decimalDigits}`
       }
       else{
           return intigerDisplay
       }
   }



   updateDisplay(){
    this.currentNumberElement.innerText = 
        this.getDisplayNumber(this.currentNumber);
    if(this.operation != null){
        this.previousNumberElement.innerText = 
        `${this.getDisplayNumber(this.previousNumber)} ${this.operation}`
    }
    else{
        this.previousNumberElement.innerText = ''
    }
   }
}

const numberButtons = document.querySelectorAll('[data-numbers]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-allClear]');
const previousNumberElement = document.querySelector('[data-previous-number]');
const currentNumberElement = document.querySelector('[data-current-number]');

const calculator = new Calculator(previousNumberElement, currentNumberElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay();
    console.log(button)
})

clearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})