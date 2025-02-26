const result = document.getElementById("result");

// Append character to the display
function appendCharacter(character) {
    result.value += character;
}

// Clear the display
function clearDisplay() {
    result.value = "";
}

// Delete the last character
function deleteLast() {
    result.value = result.value.slice(0, -1);
}

// Calculate factorial
function calculateFactorial() {
    try {
        let num = parseFloat(result.value);
        if (isNaN(num) || num < 0) throw "Error";
        let fact = 1;
        for (let i = 1; i <= num; i++) {
            fact *= i;
        }
        result.value = fact;
    } catch {
        result.value = "Error";
    }
}

// Evaluate the expression
function calculateResult() {
    try {
        let expression = result.value;

        // Replace '÷' with '/' and '×' with '*' for evaluation
        expression = expression.replace(/÷/g, "/").replace(/×/g, "*");

        // Auto-close brackets
        let openBrackets = (expression.match(/\(/g) || []).length;
        let closeBrackets = (expression.match(/\)/g) || []).length;
        expression += ")".repeat(openBrackets - closeBrackets);

        // Evaluate the expression
        let answer = eval(expression);

        // Handle division by zero
        if (!isFinite(answer)) {
            result.value = "Error: Division by zero";
            return;
        }

        // Display the result
        result.value = answer;
    } catch (error) {
        console.error("Error during evaluation:", error);
        result.value = "Error";
    }
}

// Handle keyboard input
document.addEventListener("keydown", function(event) {
    if (event.key.match(/[0-9+\-*/.%()]/)) {
        appendCharacter(event.key);
    } else if (event.key === "Enter") {
        event.preventDefault();
        calculateResult();
    } else if (event.key === "Backspace") {
        deleteLast();
    } else if (event.key === "Escape") {
        clearDisplay();
    }
});