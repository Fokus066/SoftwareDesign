import { WordDAO } from "../types/WordDAO.type";
import { Word} from "../classes/Word";


export class Language {

    private _germanLCID : String; 
    private _spanishLCID: String;
    private _englishLCID: String;
    private _frenchLCID: String;
 
  
   constructor(word: WordDAO){

    this._englishLCID = word.english;
    this._germanLCID = word.german;
    this._spanishLCID= word.spanish;
    this._frenchLCID = word.french;


    this._germanLCID = "de-de";
    this._spanishLCID= "es-es";
    this._englishLCID = "en-gb";
    this._frenchLCID = "fr-fr";

   }

    public get germanLCID() : String  {

        return this._germanLCID;
    }

    public set germanLCID(value) {

        this._germanLCID = value;
    }

    public get spanishLCID() : String {
        
        return this._spanishLCID;
    }

    public set spanishLCID(value) {

        this._spanishLCID = value;
    }

    public get englishLCID() : String {

        return this._englishLCID;
    }

    public set englishLCID(value) {

        this._englishLCID = value;
    }
    
    public get frenchLCID(): String  {

        return this._frenchLCID;
    }

    public set frenchLCID(value) {

        this._frenchLCID = value;

    }
   
  

}

