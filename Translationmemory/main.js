const admin = require("./admin");
const translator = require("./translator");
const fs = require('fs');

let rawWords = fs.readFileSync('wordlist.json');
let words = JSON.parse(rawWords);


var ADMIN = new admin ('admin123', 'forever');
var TRANSLATOR = new translator (20,'translator123', 'lifeguard');


const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
/*
function login(username, password){

     for (i =0; i< person.length; i++){
        if (username == person[i].username && password == person[i].password){
            
            return  console.log(username + " ist angemeldet! " );
        } 
        else console.log('Benutzername und/oder Password nicht korrekt');
    }
    
}

*/
rl.question('[1] Als Admin anmelden [2] Als Übersetzer anmelden [3] Übersetzungen nutzen: ', (answer) => {
    switch(answer) {
     
    case '1':
    rl.question('Username: ', (answerUsername) => {
        for (i =0; i< admin.length; i++){
            if (answerUsername === ADMIN.getadminname()){
                
                rl.question('Password: ', (answerPassword) => {
                    for (i =0; i< admin.length; i++){
                        if (answerPassword === ADMIN.getadminpassword()){
                            
                            return  console.log(ADMIN.getadminname()+ " ist angemeldet! " );
                        } 
                        else {console.log('Passwort nicht korrekt');}
                        break;
                    }
                });
                break;
            } 
            else {console.log('Benutzername nicht korrekt')};
            break;
        }
    });
    break;

    case '2':
        rl.question('Username: ', (answerUsername) => {
            for (i =0; i< translator.length; i++){
                if (answerUsername === TRANSLATOR.gettranslatorname()){
                    
                    rl.question('Password: ', (answerPassword) => {
                        for (i =0; i< translator.length; i++){
                            if (answerPassword === TRANSLATOR.gettranslatorpassword()){
                                
                                return  console.log(TRANSLATOR.gettranslatorname()+ " ist angemeldet! " );
                            } 
                            else {console.log('Passwort nicht korrekt');}
                            break;
                        }
                    });
                    break;
                } 
                else {console.log('Benutzername nicht korrekt')};
                break;
            }
        });
        break;

        case '3':
            rl.question('[1] Alle Wörter anzeigen [2] Zielsprache für das Wort wählen: ', (answer) => {
                switch(answer){

                case '1':
                    
                for (let i = 0; i < words.length; i++){
                    console.log();
                    console.log("German: " + words[i].german);
                    console.log("English: " + words[i].english);
                    console.log("Spanish: " + words[i].spanish);
                    console.log("French: " + words[i].french);
                }
                break;
                
                
                case '2':

                    rl.question('Zielsprache: ', (answerLanguage) => {
                        switch(answerLanguage){
        
                        case 'Spanisch':

                            rl.question('Wort eingeben: ', (answerWord) => {

                                for (let i = 0; i < words.length; i++){
                                    if(words[i].german === answerWord){
                                    console.log();
                                    console.log(answerWord +" : " + words[i].spanish);
                                    console.log();
                                    break;
                                    } 
                                                              
                                   
                                }


                            });
                            break;
                           
                        
                            
                            
                       
                        case 'French':

                            rl.question('Wort eingeben: ', (answerWord) => {

                                for (let i = 0; i < words.length; i++){
                                    if(words[i].german === answerWord){
                                    console.log();
                                    console.log(answerWord +" : " + words[i].french);
                                      console.log();
                                    }
                                   
                                }


                            });
                            break;
                            
                           


                        
                        case 'Englisch':

                            rl.question('Wort eingeben: ', (answerWord) => {

                                for (let i = 0; i < words.length; i++){
                                    if(words[i].german === answerWord){
                                    console.log();
                                    console.log(answerWord +" : " + words[i].english);
                                      console.log();
                                    }
                                   
                                }


                            });
                            break;
                            
                                           
                        
                        
                        
                        } 
                         
                        
                    });
                    break;
                  
                
                } 
                 
                
            });
            break;
          
    default:
    console.log('Invalid answer! Pick either 1, 2 or 3.');
    }

    });







