const UGUID = require("./UUID");
const fs = require('fs');

module.exports = class Words{
    
 #_GUID;
 #_english; 
 #_german;
 #_spanish;
 #_french;
     
      
 constructor(_GUID,_english,_german,_spanish,_french) {

 let rawWords = fs.readFileSync('./wordlist.json');
 let words = JSON.parse(rawWords);

 for (let i = 0; i < words.length; i++){
 this._GUID = GUID.GenerateUUIDv4();
 this.#_english =  words[i].english;
 this.#_german=  words[i].german;
 this.#_spanish=  words[i].spanish;
 this.#_french=  words[i].french;
    }     
  }


 getEnglishWord(){
  
  return this.#_english;
  
  }
  
  setEnglishWord(_english){
        
    this.#_english = _english;
  }

  getSpanishWord(){
      return this.#_spanish;
  
  }
  
  setSpanishWord(_spanish){
        
      this.#_spanish = _spanish;
  
  }
  
  getGermanWord(){
      return this.#_german;
  
  }
  
  setGermanWord(_german){
        
 this.#_german = _german;
  
  }
    
  getFrenchWord(){
    
    return this.#_french;
  
  }
  
  setFrenchWord(_french){
        
  this.#_french= _french;
  
  }


  getGUID(){
    return this.#_GUID;
  }

  setGUID(_GUID){
      
  this.#_GUID = _GUID;

  }
  
   
}
 
  