//Select Elements From the html file
let countSpan= document.querySelector(".quiz-info .count span"); // Adding the number of the quesions
let bulletsspancontainer=document.querySelector(".bullets .spans");
let quizArea= document.querySelector(".quiz-area");
let answersArea= document.querySelector(".answers-area");
let sunbitButton =document.querySelector(".button-answer")
let bullets=document.querySelector(".bullets");
let results=document.querySelector(".results");
let countdownElement=document.querySelector(".countdown");


// Set Options

let currentIndex=0;
let rightanswers=0;
let countdownInterval;



function getQuesions(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200){
           
            let myJsonObject=JSON.parse(this.responseText);
            let quesionscount=myJsonObject.length
            createBullets(quesionscount);
            //Add Qoesions Data
            addQuesionsData(myJsonObject[currentIndex],quesionscount);

            //Count down elemen
            countdown(5, quesionscount);
            // click on sumbit

            sunbitButton.onclick = () =>{
                // Get right answer
                let right_answer=myJsonObject[currentIndex].right_answer;
                
                //increase Index
                currentIndex++;

                //check The answer 
                checkAnswer(right_answer,quesionscount);

                //REmove Previos Quesions
                quizArea.innerHTML="";
                answersArea.innerHTML="";
                //add the next question
                addQuesionsData(myJsonObject[currentIndex],quesionscount);

                //Count down elemen
                clearInterval(countdownInterval)
                countdown(5, quesionscount);

                // Handle Bukkets Class

                handleBullets();

                // show Results
                showResults(quesionscount);


            }

        }
    }
    myRequest.open("GET", "html_quesions.json", true);
    myRequest.send();
    
}
getQuesions();


function createBullets(num){
    countSpan.innerHTML = num;

    // Create Spans
    for(let i = 0; i < num; i++){

        //creat span
        let theBullet=document.createElement("span");
        //check if this first span
        if(i===0){
            theBullet.className = "on";

        }
        // Append Bullets to main bullet container
        bulletsspancontainer.appendChild(theBullet);

    }
}

function addQuesionsData(obj,count){

if(currentIndex < count)
   { //Create Quesion Title "h2"
    let quesionsTitle = document.createElement("h2");
    

    //Create Quesion Text

    let quesionText = document.createTextNode(obj.title);

    //Append Text To Heading
    quesionsTitle.appendChild(quesionText);

    // Append the h2 to the quiz area

    quizArea.appendChild(quesionsTitle);

    // create the asnwers

    for(let i=1;i<=4;i++)
    {
        //creat Main Answer div{
        let mainDiv= document.createElement("div");

        //Add Class to main div

        mainDiv.className = "answer";

        // create Radio Input
        
        let radioInput = document.createElement("input");
        //Add type + Name +  ID + Data-Attribute
        radioInput.name='question';
        radioInput.type="radio";
        radioInput.id=`answer_${i}`;
        radioInput.dataset.answer= obj[`answer_${i}`];

        // Make First Option Selected
        if(i===1)
        {
            radioInput.checked=true;

        }

        // Create Label

        let theLabel = document.createElement("label");

        //add For Attribute

        theLabel.htmlFor=`answer_${i}`;


        //create Label Text

        let theLabelText = document.createTextNode(obj[`answer_${i}`]);

        // Add the text to the label

        theLabel.appendChild(theLabelText);


        // Add Input + Label to main div

        mainDiv.appendChild(radioInput);
        mainDiv.appendChild(theLabel);

        //Append all divs to the answers area

        answersArea.appendChild(mainDiv);
}
    }
  
}



function checkAnswer(rAnswer,count) {

    let answers =document.getElementsByName('question');
    let theChoosenAnswer;

    for (let i=0; i<answers.length; i++){
        if(answers[i].checked){
            theChoosenAnswer=answers[i].dataset.answer;
        }
    }

    // 
    

    if(theChoosenAnswer===rAnswer){
        rightanswers++;
     
    }

}


function handleBullets(){
    let bspans=document.querySelectorAll(".bullets .spans span")

    let arrayOfSpans=Array.from(bspans);
    arrayOfSpans.forEach((span,index)=>{

        if(currentIndex==index){
            span.className="on";
        }
    
    });}


    function showResults(count){

        let theResults;
        if(currentIndex==count){

        quizArea.remove();
        answersArea.remove();
        sunbitButton.remove();
        bullets.remove();


        if(rightanswers > (count /2) && rightanswers < count){
            theResults=`<span class="good">Good</span> The result is:  ${rightanswers} From ${count}.`;
        }
        else if(rightanswers===count){
            theResults=`<span class="perfect">Perfect</span>The result is:  ${rightanswers} From ${count}.`;
        }
        else{
            theResults=`<span class="bad">Bad</span> The result is: ${rightanswers} From ${count}.`;
        }

        results.innerHTML=theResults;
        results.style.padding='10px';
        results.style.margin='10px';
        results.style.backgroundColor='white';


        }

    
    }


    function countdown(duration , count){
        if(currentIndex < count){
            let minutes , seconds;
            countdownInterval=setInterval(function(){

                minutes=parseInt(duration / 60);
                seconds=parseInt(duration % 60);

                minutes= minutes <10 ? `0${minutes}` : minutes;
                seconds= seconds <10 ? `0${seconds}` : seconds;
                countdownElement.innerHTML=`<span>${minutes}</span>:<span>${seconds}</span>`;

                if(--duration <0){
                    clearInterval(countdownInterval);
                    sunbitButton.click();
                }
            },1000);

        }
}

