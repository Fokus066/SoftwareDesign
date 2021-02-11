module.exports =  class user{

   #_savedwords = String;    

    constructor(_savedwords){
       this._savedwords= _savedwords;
    }

   getsavedWords(){
       return this._savedwords;

   }

   setsavedWords(_savedwords){
       
       this._savedwords = _savedwords;

   }

   showAllsavedWords(){
   }
 
 
}