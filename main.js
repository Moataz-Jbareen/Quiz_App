function getQuesions(){

    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function() {

        if(this.readyState === 4 && this.status === 200){
           
            let myJsonObject=JSON.parse(this.responseText);
            console.log(myJsonObject);
            for(var i=0;i<myJsonObject.length;i++){
                console.log(myJsonObject[i].title);
            }

        }

        



    }




    myRequest.open("GET", "html_quesions.json", true);
    myRequest.send();
    
}


getQuesions();