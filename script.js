let buttons = document.querySelectorAll("button");
let buttonsDiv = document.querySelector(".buttons");
let input = document.querySelector("input");
let brackets = document.querySelector(".bracket-row");
let historyIcon = document.querySelector(".icon");
let closeIcon = document.querySelector(".icon2");

let historyDiv = document.querySelector(".history");

let history = [];
let result = "";

function showHistory(expression, finalResult){

    let historyText = expression + "=" + finalResult;

    history.push(historyText);
    
    if(history.length > 10) history.shift();

    document.querySelectorAll("#history h4").forEach(h4 => h4.remove());

    history.forEach(val =>{
        let h4 = document.createElement("h4");
        h4.textContent = val;

        document.querySelector("#history").appendChild(h4);
    });

};

function calculate(result) {
    try {
        return Function(`return(${result})`)();
    } catch (error) {
        return error;
    }
};

buttonsDiv.addEventListener("click", (details) => {

    if (details.target.tagName !== "BUTTON") return

    let value = details.target.textContent;


    if (value === "=") {
        let expression = result;

        result = calculate(result);
        input.value = result;

        showHistory(expression, result);
    }
    else if (value === "AC") {
        result = "";
        input.value = result;
    }
    else if (value === "DEL") {
        result = result.slice(0, -1);
        input.value = result;
    }
    else if (value === "Sin") {
        result = Math.sin(result * Math.PI / 180);
        input.value = result;
    }
    else if (value === "Cos") {
        result = Math.cos(result * Math.PI / 180);
        input.value = result;
    }
    else if (value === "Tan") {
        result = Math.tan(result * Math.PI / 180);
        input.value = result;
    }
    else if (value === "√") {
        result = Math.sqrt(result);
        input.value = result;
    }
    else if (value === "%") {
        result = result / 100;
        input.value = result;
    }
    else {
        result += value;
        input.value = result
    }
});

// Keyboard support

document.addEventListener("keydown", (details) => {
    // console.log(details.key);

    if (details.key >= "0" && details.key <= "9" || details.key === "+" || details.key === "-" || details.key === "*" || details.key === "/" || details.key === ".") {
        result += details.key;
        input.value = result;
    }
    else if (details.key === "Backspace") {
        result = result.slice(0, -1);
        input.value = result;
    }
    else if (details.key === "Enter" || details.key === "=") {
        let expression = result;
        result = calculate(result);
        input.value = result;
        showHistory(expression, result);
    };
});

historyIcon.addEventListener("click", ()=>{
    historyDiv.style.right = "0px";
});

closeIcon.addEventListener("click", ()=>{
    historyDiv.style.right = "-50vw";
});