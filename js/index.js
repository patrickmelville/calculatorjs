//update CE so that it takes off only one digit from the most recent entry!!!
//update all operator additions so that it doesnt add consecutive ones, but replaces the last?

//KEYBOARD INPUT LIST ( these names coorispond with div IDs on page)
var KEYLIST = {
  48: "zero",
  49: "one",
  50: "two",
  51: "three",
  52: "four",
  53: "five",
  54: "six",
  55: "seven",
  56: "eight",
  57: "nine",
  96: "zero",
  97: "one",
  98: "two",
  99: "three",
  100: "four",
  101: "five",
  102: "six",
  103: "seven",
  104: "eight",
  105: "nine",
  111: "divide",
  106: "times",
  109: "minus",
  110: "decimal",
  107: "plus",
  13: "equals",
  8: "CE",
  46: "AC"
};
//asdf//
var test = "test";
//listen for keydown event and trigger a click if the key is on our list
$("body").keydown(function(e){
  if(e.which in KEYLIST){
    $("#" + KEYLIST[e.which]).click();
  };
  // $("footer").append(e.which + " ");
});


var CalcData = function() {
  this.dataStr = [];

  this.myPush = function(x) {
    if (this.dataStr.length == 0) {
      //if its a decimal point, put in a zero first.
      if (x == ".") {
        this.dataStr.push(0);
      }
      this.dataStr.push(x);
    } else {
      if (!isNaN(this.dataStr[this.dataStr.length - 1]) && !isNaN(x)) {
        //Concat numbers as a (string) then convert back 2 #s
        this.dataStr[this.dataStr.length - 1] = this.dataStr[this.dataStr.length - 1] + "" + x;
        this.dataStr[this.dataStr.length - 1] = Number(this.dataStr[this.dataStr.length - 1]);
      } else {
        //last on the list is not a number so just stick it at the end.
        //also put a zero in front of decimal if needed
        if (isNaN(this.dataStr[this.dataStr.length - 1]) && x == ".") {
          this.dataStr.push(0);
        }
        this.dataStr.push(x);
      }
    }
  };

  //Method that checks to see if there are specific operators left in the dataStr
  this.opCheck = function(x) {
    var op = false;
    for (i = 0; i < this.dataStr.length; i++) {
      if (this.dataStr[i] == x) {
        op = true;
      }
    }
    return op;
  };

  this.solve = function() {
    var result = 0;
    var oLocation = 0;
    // ORDER OF OPERATIONS (PEMDAS)
    // combine all numbers around a decimal point into 1 number instead.
    // while there are still operators in the dataStr
    // first: search for operator and process the numbers around it.
    // splice the array to store new result in place of the old 3 locations  
    // process the remaining repeat for each operator.
    while (this.opCheck(".") == true) {
      for (o = 0; o < this.dataStr.length; o++) {
        if (this.dataStr[o] == ".") {
          oLocation = this.dataStr.indexOf(this.dataStr[o]);
          // combine all numbers around a decimal point into 1 number instead.
          result = this.dataStr[oLocation - 1] + "." + this.dataStr[oLocation + 1];
          result = Number(result);
          var removed = this.dataStr.splice(oLocation - 1, 3, result);
          break;
        }
      }
    }
    // P E ( M D ) A S
    while (this.opCheck("*") == true || this.opCheck("/") == true) {
      for (o = 0; o < this.dataStr.length; o++) {
        switch( this.dataStr[o] ){
          case "*":
            oLocation = this.dataStr.indexOf(this.dataStr[o]);
            result = this.dataStr[oLocation - 1] * this.dataStr[oLocation + 1];
            var removed = this.dataStr.splice(oLocation - 1, 3, result);
            break;
          case "/":
            oLocation = this.dataStr.indexOf(this.dataStr[o]);
            result = this.dataStr[oLocation - 1] / this.dataStr[oLocation + 1];
            var removed = this.dataStr.splice(oLocation - 1, 3, result);
            break;
        }
      }
    }

    while (this.opCheck("%") == true) {
      for (o = 0; o < this.dataStr.length; o++) {
        if (this.dataStr[o] == "%") {
          oLocation = this.dataStr.indexOf(this.dataStr[o]);
          result = this.dataStr[oLocation - 1] % this.dataStr[oLocation + 1];
          var removed = this.dataStr.splice(oLocation - 1, 3, result);
          break;
        }
      }
    }
    
    // P E M D ( A S )
    while (this.opCheck("+") == true || this.opCheck("-") == true) {
      for (o = 0; o < this.dataStr.length; o++) {
        switch( this.dataStr[o] ){
          case "+":
            oLocation = this.dataStr.indexOf(this.dataStr[o]);
            result = this.dataStr[oLocation - 1] + this.dataStr[oLocation + 1];
            var removed = this.dataStr.splice(oLocation - 1, 3, result);
            break;
          case "-":
            oLocation = this.dataStr.indexOf(this.dataStr[o]);
            result = this.dataStr[oLocation - 1] - this.dataStr[oLocation + 1];
            var removed = this.dataStr.splice(oLocation - 1, 3, result);
            break;
        }
      }
    }
    //after all operators have been processed and removed, return the solution.
    return this.dataStr;
  };
};
var cInput = new CalcData();

$(document).ready(function() {
  //Button Functionality

  //ALL CLEAR - clear the numbers and operators
  $("#AC").click(function() {
    cInput.dataStr = [];
    $("#num-box").html(cInput.dataStr);
  });

  // CE clear the last number entered.
  $("#CE").click(function() {
    cInput.dataStr.pop();
    $("#num-box").html(cInput.dataStr);
  });
  // MOD % for remainder
  $("#mod").click(function() {
    cInput.dataStr.push("%");
    $("#num-box").html(cInput.dataStr);
  });
  // DIVIDE
  $("#divide").click(function() {
    cInput.dataStr.push("/");
    $("#num-box").html(cInput.dataStr);
  });
  // MULTIPLY
  $("#times").click(function() {
    cInput.dataStr.push("*");
    $("#num-box").html(cInput.dataStr);
  });
  // SUBTRACT
  $("#minus").click(function() {
    cInput.dataStr.push("-");
    $("#num-box").html(cInput.dataStr);
  });
  // ADD
  $("#plus").click(function() {
    cInput.dataStr.push("+");
    $("#num-box").html(cInput.dataStr);
  });
  // DECIMAL POINT
  $("#decimal").click(function() {
    cInput.myPush(".");
    $("#num-box").html(cInput.dataStr);
  });
  // ANS??? what does this do?
  // EQUALS TO PROCESS DATA
  $("#equals").click(function() {
    $("#num-box").html(cInput.solve());
  });
  // 0
  $("#zero").click(function() {
    cInput.myPush(0);
    $("#num-box").html(cInput.dataStr);
  });
  // 1
  $("#one").click(function() {
    cInput.myPush(1);
    $("#num-box").html(cInput.dataStr);
  });
  // 2
  $("#two").click(function() {
    cInput.myPush(2);
    $("#num-box").html(cInput.dataStr);
  });
  // 3
  $("#three").click(function() {
    cInput.myPush(3);
    $("#num-box").html(cInput.dataStr);
  });
  // 4
  $("#four").click(function() {
    cInput.myPush(4);
    $("#num-box").html(cInput.dataStr);
  });
  // 5
  $("#five").click(function() {
    cInput.myPush(5);
    $("#num-box").html(cInput.dataStr);
  });
  // 6
  $("#six").click(function() {
    cInput.myPush(6);
    $("#num-box").html(cInput.dataStr);
  });
  // 7
  $("#seven").click(function() {
    cInput.myPush(7);
    $("#num-box").html(cInput.dataStr);
  });
  // 8
  $("#eight").click(function() {
    cInput.myPush(8);
    $("#num-box").html(cInput.dataStr);
  });
  // 9
  $("#nine").click(function() {
    cInput.myPush(9);
    $("#num-box").html(cInput.dataStr);
  });
});