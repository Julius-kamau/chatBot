let textBox = document.getElementById('holder');
const bubblesHolder = document.getElementById('bubblesHolder');
let LIBRARY;
const savedLIBRARY = localStorage.getItem('newLibrary');


function checkForLibrary() {
  if(savedLIBRARY){
    alert("library found ");
    LIBRARY = JSON.parse(savedLIBRARY);
  }else{
    alert("no Library found,created a new library");
    LIBRARY = [];
  }
}


function sendText() {
   let message = textBox.innerText;
   textBox.innerText = "";
   appendText(message);
   mainFunc(message);
}

function reply(message) {
    appendText(message);
}

function appendText(message) {
  let bubble = document.createElement("h4");
  bubble.innerText = String(message);
  bubblesHolder.appendChild(bubble);
 // alert(text + " " + typeof(text));
}



function mainFunc(message) {
   message = analyse(message);
    reply(message);
}



function analyse(message){
  for(i=0; i<LIBRARY.length; i++){
    if(LIBRARY[i].input.join(" ") === message){
      return LIBRARY[i].output.join(" ");
    }
  }
  //alert("not found in the Library");
  learn(message);
  return "learning mode: tell me what I should say when one says "+message+" and then hit teach teach button";
}

function learn(message){
  let dataIn = message;
  let dataOut;
  textBox.focus();
  //document.getElementById('sendBtn').setAttribute("disabled", "true");
  let teachBtn =document.getElementById('teachBtn');
  teachBtn.removeAttribute("disabled");
  teachBtn.onclick = async ()=>{
    dataOut = textBox.innerText; 
    teachBtn.setAttribute("disabled", "true");
    alert("now I know that when one says, "+message+ "I shold say, " + dataOut+".Thanks for the lesson I am still learning");
    await createLibrary(dataIn, dataOut);
    textBox.innerText = "";
    //document.getElementById('sendBtn').removeAttribute("disabled");
  }
}

function createLibrary(dataIn, dataOut) {
  let arrayedIn = String(dataIn || "").split(" ");
  let arrayedOut = String(dataOut || "").split(" ");
  for(i=0; i<LIBRARY.length; i++){
    if(LIBRARY[i].input.join(" ") === arrayedIn.join(" ")){
      return null;
    }
  }
  //when input not exist in library create one
  let newLibrary = {
    input: arrayedIn,
    output: arrayedOut
  };
  LIBRARY.push(newLibrary);
  localStorage.setItem("newLibrary", JSON.stringify(LIBRARY));
}



checkForLibrary();
createLibrary("hello", "hello too");
createLibrary("how are you", "i am good how are you");
createLibrary("i am also good", "okay nice to hear from you");
//create an else{} in analyse() => when the corresponding input us not found in the library,
//call a function that allows th user to provide the right respomse to that input
//also there was a thoght I was having about the bot learning from rpt things over and over and
//instead I wanted for it to be that....ugh gues what,I forgot the idea.