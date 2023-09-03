// GLOBAL VARIABLES
let operand1 = '';
let operand2 = '';
let operator = '';
let on1 = true;

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

  resetGlobals();
});

// On key press, add number to screen
function pressNumKey(number){
	let screenValue = document.querySelector('#screen-value');
	if(screenValue.innerText=='0'){
		screenValue.innerText=number;
	}
	else{
		screenValue.innerText+=number;
	}

	if(on1){
		operand1+=number;
		console.log(operand1);
	}
	else{
		operand2+=number;
		console.log(operand2);
	}

	checkOverflow();
}

// On key press, add number to screen
function pressOperatorKey(operatorkey){
	if(operator){
		on1=false;
		operator=operatorkey;
	}
	else{
		if(!on1){
			evaluate();
		}
		on1=false;
		operator=operatorkey;
		document.querySelector('#screen-value').innerText='';
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
	document.querySelector('#screen-value').innerText=result;
	operand1=result;

	checkOverflow();
}

function percentage(){
	if(operand1 && !operator){
		operator='/';
		operand2='100';
		evaluate();
	}
	else if(operator){
		operand2 = operate(operand1, '/', operand2);
		evaluate();
	}
}

function changeSign() {
	if(on1){
		if(operand1[0]=='-'){
			operand1 = operand1.substring(1);
		}
		else{
			operand1 = '-' + operand1;
		}
		document.querySelector('#screen-value').innerText = operand1;
	}
	else{
		if(operand2[0]=='-'){
			operand2=operand2.substring(1);
		}
		else{
			operand2 = '-' + operand2;
		}
		document.querySelector('#screen-value').innerText = operand2;
	}
}

function resetGlobals(){
	operand1 = '';
	operand2 = '';
	operator = '';
	on1 = true;
	document.getElementById('screen-value').style.fontSize = '100px';
}

function isOverflown(element, container) {
    return element.scrollHeight > (container.scrollHeight - 40) || element.scrollWidth > (container.scrollWidth - 40);
}

function checkOverflow(){
	console.log("checkOverflow");
	let screen = document.getElementById('screen-value');
	let container = document.querySelector('.screen');
	console.log(screen);
	let fontSize = parseInt(screen.style.fontSize);
	console.log(fontSize);
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
	return Math.round(a/b);
}

// Multiplication function
function multiply(a, b) {
	return Math.round(a*b);
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