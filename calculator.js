// GLOBAL VARIABLES
let operand1 = '';
let operand2 = '';
let operator = '';
let on1 = true;
let hasDecimal = false;

// Once page loads - add eventlisteners
window.addEventListener("load", (event) => {
  let numKeys = document.querySelectorAll('.num-key')
  let numArray = [...numKeys];
  numArray.forEach(numKey => {
  	numKey.addEventListener("click",
  		function() {
  			pressNumKey(numKey.innerText);
  		}
  	);
  });

  let operatorKeys = document.querySelectorAll('.operator')
  let operatorArray = [...operatorKeys];
  operatorArray.forEach(operatorKey => {
  	operatorKey.addEventListener("click",
  		function() {
  			pressOperatorKey(operatorKey.value);
  		}
  	);
  });

  document.querySelector('.clear-key').addEventListener('click',
  	function(){
  		clearScreen();
  	}
  );

  document.querySelector('.enter-key').addEventListener('click',
  	function(){
  		evaluate();
  	}
  );

  document.querySelector('.percentage-key').addEventListener('click',
  	function(){
  		percentage();
  	}
  );

  document.querySelector('.sign-key').addEventListener('click',
  	function(){
  		changeSign();
  	}
  );

  document.querySelector('.decimal-key').addEventListener('click',
  	function(){
  		addDecimal();
  	}
  );

  resetGlobals();
});

// On key press, add number to screen
function pressNumKey(number){
	let screenValue = document.querySelector('#screen-value');
	if (screenValue.innerText.replace(/[^0-9]/g,"").length >= 9){
		return;
	}
	if(screenValue.innerText=='0'){
		screenValue.innerText=number;
		if(on1){
			operand1=number;
		}
		else{
			operand2=number;
		}
	}
	else{
		screenValue.innerText+=number;
		if(on1){
			operand1+=number;
		}
		else{
			operand2+=number;
		}
	}

	checkOverflow();
}

// On key press, add number to screen
function pressOperatorKey(operatorkey){
	if(operator && !operand2){
		on1=false;
		hasDecimal=false;
		operator=operatorkey;
	}
	else{
		if(!on1){
			evaluate();
		}
		on1=false;
		hasDecimal=false;
		operator=operatorkey;
		document.querySelector('#screen-value').innerText='';
		document.getElementById('screen-value').style.fontSize = '100px';
	}
}

// Clear screen
function clearScreen(){
	document.querySelector('#screen-value').innerText='0';
	resetGlobals();
}

function evaluate(){
	let result = operate(Number(operand1), operator, Number(operand2));
	resetGlobals();
	operand1=result;
	result = displayValue(result);
	document.querySelector('#screen-value').innerText=result;
	if(operand1.toString().includes('.')){
		hasDecimal=true;
	}
	checkOverflow();
}

function displayValue(number){
	number = parseFloat(number.toPrecision(9));
	let numberPreDecimal = number.toFixed(0).toString();

	// Has no decimal and is 9 digits or less (display number)
	if(number - Math.floor(number) == 0 && numberPreDecimal.length <= 9){
		return number;
	}
	// If number has greater than 9 digits left of decimal (display exponential with 5 decimals)
	else if(numberPreDecimal.replace(/[^0-9]/g,"").length > 9){
		return number.toExponential(5);
	}
	// If number has less than 9 digits pre-decimal but greater than 1 (display pre-decimal digits and remaining from 9 of post decimal)
	else if(numberPreDecimal.replace(/[^0-9]/g,"").length <= 9 && numberPreDecimal.replace(/[^0-9]/g,"").length > 1){
		return `${1 * number.toFixed(9-(numberPreDecimal.replace(/[^0-9]/g,"").length))}`;
	}
	// If number has one digit predecimal
	else if(numberPreDecimal.replace(/[^0-9]/g,"").length == 1 && (number >= 0.00000001 || (numberPreDecimal[0]=='-' && number <= -0.00000001))){
		return `${1 * number.toFixed(8)}`;
	}
	else if(numberPreDecimal.replace(/[^0-9]/g,"").length == 1 && number < 0.00000001){
		return parseFloat(number.toExponential(5));
	}
}

function percentage(){
	if(operand1 && !operator){
		operator='/';
		operand2='100';
		evaluate();
	}
	else if(operator && operand2){
		operand2 = operate(operand1, '/', operand2);
		evaluate();
	}

	checkOverflow();
}

function changeSign() {
	if(on1){
		if(operand1.toString()[0]=='-'){
			operand1 = operand1.toString().substring(1);
		}
		else if(operand1.toString()=='' || operand1.toString()=='0'){
			operand1 = '-';
		}
		else{
			operand1 = '-' + operand1;
		}

		if(operand1=='-'){
			document.querySelector('#screen-value').innerText = '-';
		}
		else if(operand1==''){
			document.querySelector('#screen-value').innerText = '';
		}
		else if(operand1=='-.'){
			document.querySelector('#screen-value').innerText = '-.';
		}
		else if(operand1=='.'){
			document.querySelector('#screen-value').innerText = '.';
		}
		else{
			document.querySelector('#screen-value').innerText = displayValue(parseFloat(operand1));
		}
	}
	else{
		if(operand2.toString()[0]=='-'){
			operand2 = operand2.toString().substring(1);
		}
		else if(operand2.toString()=='' || operand2.toString()=='0'){
			operand2 = '-';
		}
		else{
			operand2 = '-' + operand2;
		}

		if(operand2=='-'){
			document.querySelector('#screen-value').innerText = '-';
		}
		else if(operand2==''){
			document.querySelector('#screen-value').innerText = '';
		}
		else if(operand2=='-.'){
			document.querySelector('#screen-value').innerText = '-.';
		}
		else if(operand2=='.'){
			document.querySelector('#screen-value').innerText = '.';
		}
		else{
			document.querySelector('#screen-value').innerText = displayValue(parseFloat(operand2));
		}
	}
	document.getElementById('screen-value').style.fontSize = '100px';
	checkOverflow();
}

function addDecimal() {
	let screenValue = document.querySelector('#screen-value');
	if (screenValue.innerText.replace(/[^0-9]/g,"").length >= 9){
		return;
	}
	if(!hasDecimal){
		if(on1){
			operand1+='.';
			document.querySelector('#screen-value').innerText = operand1;
		}
		else{
			operand2+='.';
			document.querySelector('#screen-value').innerText = operand2;
		}
		hasDecimal=true;
	}
	checkOverflow();
}

function resetGlobals(){
	operand1 = '';
	operand2 = '';
	operator = '';
	on1 = true;
	hasDecimal = false;
	document.getElementById('screen-value').style.fontSize = '100px';
}

function isOverflown(element, container) {
    return element.scrollHeight > (container.scrollHeight - 45) || element.scrollWidth > (container.scrollWidth - 45);
}

function checkOverflow(){
	let screen = document.getElementById('screen-value');
	let container = document.querySelector('.screen');
	let fontSize = parseInt(screen.style.fontSize);
	for (let i = fontSize; i >= 0; i--) {
	    let overflow = isOverflown(screen, container);
	    if (overflow) {
	    	fontSize--;
	    	screen.style.fontSize = fontSize + "px";
	    }
	}
}

// 
// MATH FUNCTIONS
// 

// Division function
function divide(a, b){
	if(a=='0' && b=='0'){
		return 0;
	}
	return a/b;
}

// Multiplication function
function multiply(a, b) {
	return a*b;
}

function subtract(a, b){
	return a-b;
}

// Addition function
function add(a, b){
	return a+b;
}

// Evaluates two operands with an operator
function operate(operand1, operator, operand2){
	if(!operator){
		if(operand1){
			return operand1;
		}
		else{
			return 0;
		}
	}
	else{
		if(operator=='/'){
			console.log('divide result: ' + divide(operand1, operand2));
			return divide(operand1, operand2);
		}
		else if(operator=='*'){
			return multiply(operand1, operand2);
		}
		else if(operator=='-'){
			return subtract(operand1, operand2);
		}
		else{
			return add(operand1, operand2);
		}
	}
}