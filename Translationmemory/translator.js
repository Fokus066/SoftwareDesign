const User = require("./user");

module.exports = class translator extends User {

    #_translatorname;
    #_translatorpassword;

    constructor(_savedwords, _translatorname, _translatorpassword){
        super(_savedwords)
            this._translatorname = _translatorname;
            this._translatorpassword =_translatorpassword;
    }
    getsavedWords(){
        return this._savedwords;
 
    }
 
    setsavedWords(_savedwords){
        
        this._savedwords = _savedwords;
 
    }

    gettranslatorname(){
        return this._translatorname;

    }

    gettranslatorpassword(){
        return this._translatorpassword;

    }

    settranslatorname (_translatorname ){
        
        this._translatorname  =_translatorname ;

    }

    settranslatorpassword(_translatorpassword){
        
        this._translatorpassword = _translatorpassword;

    }
   

}