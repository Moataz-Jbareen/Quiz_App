//Select Elements From the html file
let countSpan= document.querySelector(".quiz-info .count span"); // Adding the number of the quesions
let bulletsspancontainer=document.querySelector(".bullets .spans")





function getQuesions(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200){
           
            let myJsonObject=JSON.parse(this.responseText);
            createBullets(myJsonObject.length);
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