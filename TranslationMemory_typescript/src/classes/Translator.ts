import { Admin } from "./Admin";

export class Translator extends Admin{

    private _translatorname;
    private _translatorpassword;
    private _accessfrench;
    private _accessenglish;
    private _accessspanish;
   

   constructor(translatorname : String, translatorpassword: String){
   
    super(translatorname, translatorpassword);
    this._translatorname = translatorname;
    this._translatorpassword =translatorpassword;
    this._accessfrench = false;
    this._accessenglish = true;
    this._accessspanish= false;
    
   }
    public get accessfrench() {

        return this._accessfrench;
    }

    public set accessfrench(value) {

        this._accessfrench = value
    }

    public get accessspanish() {

        return this._accessspanish;
    }

    public set accessspanish(value) {

        this._accessspanish = value;
    }

    public get accessenglish() {

        return this._accessenglish;
    }
    public set accessenglish(value) {

        this._accessenglish = value;
    }
 
   public get translatorname(){

       return this._translatorname;

   }

   public get translatorpassword(){
              
       return this._translatorpassword;

   }

   public set translatorname(_translatorname ){
       
       this._translatorname =_translatorname ;

   }

   public set translatorpassword(_translatorpassword){
       
       this._translatorpassword = _translatorpassword;

   }
  

}

