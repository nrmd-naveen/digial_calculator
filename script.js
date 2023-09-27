const display = document.getElementById("display");
const powerBtn = document.getElementById("onOff");
let powerOn = powerBtn.innerHTML == "ON"? 1 : 0;
console.log(powerOn)

let screenSize = "normal";
function newClick(clickCont){
    if(powerOn){
        var dispCont = display.innerHTML;
        if (clickCont == "="){
            displayResult(dispCont)
        }
        else{
            if(dispCont.length>14){
                screenSize = "s";
                display.classList.add("display2")
            }
        
            display.innerHTML = Number(dispCont)== 0 ? String(clickCont) : dispCont+clickCont ;
        }
    }
}


function powerOnOff(st){
    powerBtn.innerHTML = st == "ON"? "OFF" : "ON";
    powerOn = powerBtn.innerHTML == "ON"? 1 : 0;
    if ((powerBtn.innerHTML) == "OFF"){
        if(powerBtn.classList.length>1){
            powerBtn.classList.remove("on")
        }
        powerBtn.classList.add("off")
        display.innerHTML = ""
    }
    else{
        powerBtn.classList.add("on")
        clearDisplay();
    }
}
function clearDisplay(){
    if(powerOn){
        if(screenSize == "s"){
            display.classList.remove("display2")
        }
        display.innerHTML = "0";
    }

}

function delFun(){
    if(powerOn){
        let dispContent = display.innerHTML;
        if(screenSize == "s"){
            if(dispContent.length<17){
                display.classList.remove("display2")
            }
        }
        if (dispContent.length < 2){
            clearDisplay();
        }
        else{
            let len = dispContent.length;
            let newCont = dispContent.substring(0,len-1);
            display.innerHTML = newCont;
        }
        
    }
    
}


let num = 0
function displayResult(cont){
    cont = cont.replaceAll("×","*")
    cont = cont.replaceAll("÷","/")
    if(cont.indexOf("√")==0 | cont.indexOf("√")){
        const sqrt = squareRoot(cont,cont.indexOf("√"))
        console.log(num)
        cont = cont.replace("√"+num,String(sqrt))
    }
    console.log(cont)
    console.log(eval(cont))
    if(eval(cont) | cont.indexOf("√")==0 | cont.indexOf("√")){
        result = String(eval(cont));
        console.log(result)
        if (result.length > 14){
            finalResult = roundDigit(String(result))
        }
        else{
            finalResult = result
        }
        if (screenSize == "s"){
            display.classList.remove("display2")
        }
        display.innerHTML = finalResult;
    }
    else{
        console.log("NOT")
        clearDisplay()
    }
}

function squareRoot(cont,ind){
    let end = ind;
    console.log(cont,ind)
    for(i=ind;i<(cont.length)-1;i++){
        if(Number.isInteger(Number(cont[i+1]))){
            console.log(ind,end)
            end++;
        }
    }
    num = cont.slice(ind+1,end+1)
    console.log(num)
    return (Math.sqrt(Number(num)))
}

function roundDigit(num){
    n = num.split(".")
    let deci = n[1].length
    let pref = n[0].length
    if(pref>12){
        num = num.substring(0,10)
        return num

    }
    else if(deci>10){
        num = Number(num).toFixed(10) 
        return num
    }

}