document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll("button[data-type]");
    for (let button of buttons) {
        button.addEventListener("click", function() {
            const type = this.getAttribute("data-type");
            if (type === "submit") {
                checkAnswer();
            } else {
                runGame(type);
            }
        });
    }

    // Add event listener for the Enter key on the input field
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    runGame("addition");
});

function runGame(type) {
    let operand1, operand2;

    if (type === "division") {
        operand2 = Math.floor(Math.random() * 10) + 1; // Ensure operand2 is not zero
        operand1 = operand2 * (Math.floor(Math.random() * 10) + 1); // Ensure operand1 is a multiple of operand2
    } else {
        operand1 = Math.floor(Math.random() * 10);
        operand2 = Math.floor(Math.random() * 10);
    }

    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = getOperator(type);
}

function getOperator(type) {
    switch (type) {
        case "addition":
            return "+";
        case "subtract":
            return "-";
        case "multiply":
            return "x";
        case "division":
            return "/";
        default:
            return "";
    }
}

function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById("answer-box").value);
    const calculatedAnswer = calculateCorrectAnswer();
    const isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Awwww...you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "/") {
        return [Math.floor(operand1 / operand2), "division"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}
