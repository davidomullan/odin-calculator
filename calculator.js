// Once page loads
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
  			pressOperatorKey(operatorKey.innerText);
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
});

// On key press, add number to screen
function pressNumKey(number){
	if(document.querySelector('#screenField').value==0){
		document.querySelector('#screenField').value=number;
	}
	else{
		document.querySelector('#screenField').value+=number;
	}
}

// On key press, add number to screen
function pressOperatorKey(operator){
	document.querySelector('#screenField').value+=operator;
}

// Clear screen
function clearScreen(){
	document.querySelector('#screenField').value = 0;
}

function evaluate(){
	let operand1 = parseInt(document.querySelector('#screenField').value[0]);
	let operator = document.querySelector('#screenField').value[1];
	let operand2 = parseInt(document.querySelector('#screenField').value[2]);
	let result = operate(operand1, operator, operand2);
	document.querySelector('#screenField').value = result;
}

// Division function
function divide(a, b){
	return Math.round(a/b);
}

// Multiplication function
function multiply(a, b) {
	return Math.round(a*b);
}

function substract(a, b){
	return a-b;
}

// Addition function
function add(a, b){
	return a+b;
}

// Evaluates two operands and an operator
function operate(operand1, operator, operand2){
	if(!operator){
		return NaN;
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