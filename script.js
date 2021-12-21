// getting all the numbers and symbols from keyboard
document.addEventListener("keydown", function (event) {
  switch (event.keyCode) {
    case 48:
    case 96:
      addNum(0);
      break;
    case 49:
    case 97:
      addNum(1);
      break;
    case 50:
    case 98:
      addNum(2);
      break;
    case 51:
    case 99:
      addNum(3);
      break;
    case 52:
    case 100:
      addNum(4);
      break;
    case 53:
    case 101:
      addNum(5);
      break;
    case 54:
    case 102:
      addNum(6);
      break;
    case 55:
    case 103:
      addNum(7);
      break;
    case 56:
    case 104:
      addNum(8);
      break;
    case 57:
    case 105:
      addNum(9);
      break;
    case 56:
    case 106:
      arithmetic("x");
      break;
    case 111:
    case 191:
      arithmetic("÷");
      break;
    case 107:
    case 187:
      arithmetic("+");
      break;
    case 109:
    case 189:
      arithmetic("-");
      break;
    case 110:
    case 190:
      addNum(".");
      break;
    case 8:
    case 46:
      del();
      break;
    case 13:
      calculate();
      break;
    default:
      break;
  }
});

// functions
// -----------------
function clearAll() {
  //get the value in bottom-input & top-input
  document.getElementById("top-input").innerHTML = "";
  document.getElementById("bottom-input").innerHTML = "0";
}

function del() {
  //get the value in bottom-input
  let bottomInput = document.getElementById("bottom-input").innerHTML;
  if (bottomInput.length >= 1 && bottomInput !== "0") {
    document.getElementById("bottom-input").innerHTML = bottomInput.slice(
      0,
      -1
    );
  }
  if (bottomInput.length == 1 && bottomInput !== "0") {
    document.getElementById("bottom-input").innerHTML = "0";
  }
}

function addNum(num) {
  let number = document.getElementById("bottom-input").innerHTML;
  let topNumber = document.getElementById("top-input").innerHTML;
  if (number.includes(".") && num === ".") {
    // alert("invalid input!");
    return;
  }
  if (number.length <= 12) {
    number === "0"
      ? (document.getElementById("bottom-input").innerHTML = num)
      : (document.getElementById("bottom-input").innerHTML += num);
  }
}

function arithmetic(symbol) {
  let bottomValue = document.getElementById("bottom-input").innerHTML;
  let topValue = document.getElementById("top-input").innerHTML;
  if (bottomValue === "0" && topValue !== "") {
    document.getElementById("top-input").innerHTML = topValue.slice(0, -1);
    document.getElementById("top-input").innerHTML =
      document.getElementById("top-input").innerHTML + " " + symbol;
  } else if (bottomValue !== "0" && topValue !== "") {
    document.getElementById("top-input").innerHTML +=
      " " + document.getElementById("bottom-input").innerHTML + " " + symbol;
  } else if (
    bottomValue !== "0" &&
    bottomValue.length >= 1 &&
    topValue === ""
  ) {
    document.getElementById("top-input").innerHTML =
      document.getElementById("bottom-input").innerHTML + " " + symbol;
  }
  document.getElementById("bottom-input").innerHTML = "0";
}

function calculate() {
  array = [];
  symbols = ["+", "-", "x", "÷"];
  let bottomValue = document.getElementById("bottom-input").innerHTML;
  let topValue = document.getElementById("top-input").innerHTML;
  multiplication = false;
  division = false;
  if (topValue === "") return;
  array = topValue.split(" ");
  //removing empty values
  newArray = array.filter(Boolean);
  const countOccurrences = (arr, val) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
  multiplicationNumber = countOccurrences(newArray, "x");
  divisionNumber = countOccurrences(newArray, "÷");
  additionNumber = countOccurrences(newArray, "+");
  subtractionNumber = countOccurrences(newArray, "-");
  // setting the first value to 'value'
  value = parseFloat(newArray[0]);
  if (newArray.length >= 2) {
    if (multiplicationNumber >= 1 && divisionNumber >= 1) {
      for (i = 0; i < newArray.length - 1; i++) {
        if (newArray[i] == "x") {
          value = value * parseFloat(newArray[i + 1]);
        } else if (newArray[i] == "+") {
          value = value / parseFloat(newArray[i + 1]);
        }
      }
      if (bottomValue !== "0" && newArray[newArray.length - 1] == "x") {
        value = value * parseFloat(bottomValue);
      } else if (bottomValue !== "0" && newArray[newArray.length - 1] == "+") {
        value = value / parseFloat(bottomValue);
      }
    } else if (multiplicationNumber >= 1) {
      for (i = 0; i < newArray.length - 1; i++) {
        if (newArray[i] == "x") {
          value = value * parseFloat(newArray[i + 1]);
        }
      }
      if (bottomValue !== "0") {
        value = value * parseFloat(bottomValue);
      }
    } else if (divisionNumber >= 1) {
      for (i = 0; i < newArray.length - 1; i++) {
        if (newArray[i] == "+") {
          value = value / parseFloat(newArray[i + 1]);
        }
      }
      if (bottomValue !== "0") {
        value = value / parseFloat(bottomValue);
      }
    }
    // For addition and subtraction
    if (additionNumber >= 1 && subtractionNumber >= 1) {
      for (i = 0; i < newArray.length - 1; i++) {
        if (newArray[i] == "+") {
          value = value + parseFloat(newArray[i + 1]);
        } else if (newArray[i] == "-") {
          value = value - parseFloat(newArray[i + 1]);
        }
      }
      if (bottomValue !== "0" && newArray[newArray.length - 1] == "+") {
        value = value + parseFloat(bottomValue);
      } else if (bottomValue !== "0" && newArray[newArray.length - 1] == "-") {
        value = value - parseFloat(bottomValue);
      }
    } else if (additionNumber >= 1) {
      for (i = 0; i < newArray.length - 1; i++) {
        if (newArray[i] == "+") {
          value = value + parseFloat(newArray[i + 1]);
        }
      }
      if (bottomValue !== "0") {
        value = value + parseFloat(bottomValue);
      }
    } else if (subtractionNumber >= 1) {
      for (i = 0; i < newArray.length - 1; i++) {
        if (newArray[i] == "-") {
          value = value - parseFloat(newArray[i + 1]);
        }
      }
      if (bottomValue !== "0") {
        value = value - parseFloat(bottomValue);
      }
    }
  }

  document.getElementById("top-input").innerHTML = value + " ";
  document.getElementById("bottom-input").innerHTML = "0";
}

//   if (topValue.includes("+"))
