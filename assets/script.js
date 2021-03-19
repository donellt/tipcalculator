$(document).ready(function () {
    $("#addTipBtn").click(function () {

        function doDecimalSafeMath(a, operation, b, precision) {
            function decimalLength(numStr) {
                var pieces = numStr.toString().split(".");
                if (!pieces[1]) return 0;
                return pieces[1].length;
            }

            // Figure out what we need to multiply by to make everything a whole number
            precision = precision || Math.pow(10, Math.max(decimalLength(a), decimalLength(b)));

            a = a * precision;
            b = b * precision;

            // Figure out which operation to perform.
            var operator;
            switch (operation.toLowerCase()) {
                case '-':
                    operator = function (a, b) { return a - b; }
                    break;
                case '+':
                    operator = function (a, b) { return a + b; }
                    break;
                case '*':
                case 'x':
                    precision = precision * precision;
                    operator = function (a, b) { return a * b; }
                    break;
                case '÷':
                case '/':
                    precision = 1;
                    operator = function (a, b) { return a / b; }
                    break;

                // Let us pass in a function to perform other operations.
                default:
                    operator = operation;
            }
            var result = operator(a, b);

            // Remove our multiplier to put the decimal back.
            return result / precision;
        }

        console.log("button clicked");
        var a = $("input").val();
        console.log("Original Amount: " + a)
        var b = a * 0.15;
        var finalTip = (Math.round(b * 100) / 100)
        console.log("Tip Amount: " + finalTip);

        var finalUnroundedAmount = doDecimalSafeMath(a, '+', b);
        console.log(finalUnroundedAmount);
        var finalAmount = (Math.round(finalUnroundedAmount * 100) / 100);

        $("#tipAmount").html("Tip: $" + finalTip);
        $("#finalAmount").html("Total Cost: $" + finalAmount);
        //console.log("Final Amount: " + finalAmount)
    })
})