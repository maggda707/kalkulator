var value = "";
var ans = "";
var operation = "";


function showOnDisplay()
{
    if (value == '') document.getElementById("display").innerHTML = ans;
    else document.getElementById("display").innerHTML = value;
}

window.onload = start;


var symbols = new Array(20);
symbols = ["OFF", "C", "<-", "+", "7", "8", "9", "-", "4", "5", "6", "x", "1", "2", "3", ":", "0", ".", "=", "%"];


function start()
{
    var buttons_div = "";

    for(i=0; i<20; i++)
    {
        var element = "symb" + i;
        buttons_div = buttons_div + '<div class="symbol" onclick=calculate(' + i + ') id="' + element + '">' + symbols[i] + '</div>';
        if ((i + 1) % 4 == 0) buttons_div = buttons_div + '<div style="clear: both;"></div>';
    }
    document.getElementById("buttons").innerHTML = buttons_div;
    showOnDisplay();
}


function calculate(nr)
{
    switch (nr) {
        case 0:
            value = "";
            ans = "";
            break;
        case 1:
            value = "0";
            ans = "";
            break;
        case 2:
            value = value.substring(0,(value.length - 1));
            break;
        case 3:
        case 7:
        case 11:
        case 15:
        case 19:
            operation = symbols[nr];
            ans = value;
            value = "";
            break;
        case 17:
            if (value == "") value = "0" + symbols[17];
            else if (!value.includes(".")) value = value + symbols[17];
            break;
        case 18:
            value = solve(ans, value, operation);
            break;
        default:
            if (value == "0") value = "";
            if (value.length < 8) value = value + symbols[nr];
            break;
    }
    showOnDisplay();    
}


function solve(ans, value, operation)
{
    ans = Number(ans);
    value = Number(value);

    switch (operation)
    {
        case "+":
            value = ans + value;
            break;
        case "-":
            value = ans - value;
            break;
        case "x":
            value = ans * value;
            break;
        case ":":
            value = ans / value;
            break;
        case "%":
            value = ans * value / 100;
            break;
        default:
            value = undefined;
    }
    if (value <= 99999999) return value;
    else return "E";
}