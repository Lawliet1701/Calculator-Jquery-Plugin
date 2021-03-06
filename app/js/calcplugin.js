// plugin
(function ($) {
    
    var count = 0;

    $.fn.calculator = function () {
        
        var $this = $(this);
 
        var idCalc = '#calculator' + ++count + " ";
        
        $this.append("<div id='calculator" + count + "' class='calculator'></div>");

        $.getJSON('json/json_buttons.json', function (data) {
            
                $.each(data.inputs, function(key, input){
                    var res = "<input type='text' id=" + input.id + " disabled>"
                    $this.children(idCalc).append(res);
                       
                });
                
                $.each(data.buttons, function(key, button){
                    var res = "<button id='" + button.id + "' value='" + button.value + "'>" + button.text + "</button>"
                    $this.children(idCalc).append(res);
                });
        });  
        
        function Init(){
             
               // var parentClass = "." + $this.attr('class') + " ";
                var input = $(idCalc + "#input");
                var historyInput = $(idCalc + "#history-input");

                var calc = {

                    result: 0,
                    lastOperation: "",
                    memory: 0,
                    
                    printNumber: function(){
                        var newInput = input.val() + $(this).attr("value");
                        input.val(newInput);
                    },

                    add: function () {
                        calc.calculate();
                        calc.lastOperation = "+";
                        calc.printResult();
                    },

                    substract: function () {
                        calc.calculate();
                        calc.lastOperation = "-";
                        calc.printResult();
                    },

                    multiply: function () {
                        calc.calculate();
                        calc.lastOperation = "*";
                        calc.printResult();
                    },

                    divide: function () {
                        calc.calculate();
                        calc.lastOperation = "/";
                        calc.printResult();
                    },

                    sqrt: function () {
                        calc.lastOperation = "sq";
                        calc.calculate();
                        calc.lastOperation = "";
                        calc.printResult();
                    },

                    power2: function () {
                        calc.lastOperation = "pw2";
                        calc.calculate();
                        calc.lastOperation = "";
                        calc.printResult();
                    },

                    percent: function () {
                        calc.lastOperation = calc.lastOperation + "%";
                        calc.calculate();
                        calc.lastOperation = "";
                        calc.printResult();
                    },

                    equal: function () {
                        calc.calculate();
                        calc.lastOperation = "";
                        calc.printResult();     
                        calc.result = 0;
                    },
                    
                    madd: function() {
                        calc.lastOperation = "m+";
                        calc.calculate(); 
                        calc.lastOperation = "";
                    },
                    
                    msub: function() {
                        calc.lastOperation = "m-";
                        calc.calculate(); 
                        calc.lastOperation = "";
                    },
                    
                    mread: function() {
                        calc.lastOperation = "mr";
                        calc.calculate();
                        calc.lastOperation = "";
                        calc.printResult();
                    },
                    
                    mclean: function() {
                        calc.lastOperation = "mc";
                        calc.calculate();
                        calc.lastOperation = "";
                        calc.printResult();
                    },
                    
                    dot: function() {
                         if(input.val().indexOf(".") == -1){
                             var newInput = input.val() + ".";
                             input.val(newInput);
                         } 
                    },

                    calculate: function () {

                        switch (calc.lastOperation) {
                            case "":  calc.result  = +input.val(); break;
                            case "+": calc.result += +input.val(); break;
                            case "-": calc.result -=  input.val(); break;
                            case "*": calc.result *=  input.val(); break;
                            case "/": calc.result /=  input.val(); break;
                            case "*%": calc.result *=  input.val();
                                    calc.result /= 100; break;
                            case "+%": calc.result *= (100 + +input.val());
                                    calc.result /= 100; break;
                            case "sq": calc.result = Math.sqrt(input.val()); break;
                            case "pw2": calc.result = Math.pow(input.val(), 2); break;
                            case "m+": calc.memory += +historyInput.val(); break;
                            case "m-": calc.memory -= historyInput.val(); break;
                            case "mr": calc.result = calc.memory; break;
                            case "mc": calc.memory = 0; calc.result = 0; break;           
                        }

                    },

                    clean: function () {
                        input.val("");
                        historyInput.val("");
                        calc.result = 0;
                        calc.lastOperation = "";
                    },

                    cleanLastNumber: function () {
                        input.val(input.val().substring(0, input.val().length - 1));
                    },

                    printResult: function () {
                        input.val("");
                        historyInput.val(calc.result + calc.lastOperation);
                    }  
                };

                $(idCalc + "#btn-clean").on('click', calc.clean);
                $(idCalc + "#btn-add").on('click', calc.add);
                $(idCalc + "#btn-sub").on('click', calc.substract);
                $(idCalc + "#btn-mult").on('click', calc.multiply);
                $(idCalc + "#btn-equal").on('click', calc.equal);
                $(idCalc + "#btn-div").on('click', calc.divide);
                $(idCalc + "#btn-prc").on('click', calc.percent);
                $(idCalc + "#btn-sqrt").on('click', calc.sqrt);
                $(idCalc + "#btn-pow").on('click', calc.power2);
                $(idCalc + "#btn-bsp").on('click', calc.cleanLastNumber);
                $(idCalc + "#btn-dot").on('click', calc.dot);
                $(idCalc + "#btn-Madd").on('click', calc.madd);
                $(idCalc + "#btn-Msub").on('click', calc.msub);
                $(idCalc + "#btn-MR").on('click', calc.mread);
                $(idCalc + "#btn-MC").on('click', calc.mclean);
                
                for (var i = 0; i < 10; i++){
                    $(idCalc + "#btn" +i).on('click', calc.printNumber);
                }
        }
            
        $(window).on('load', function(){
            Init();
        }); 
        
        return this;
    }

}(jQuery));
