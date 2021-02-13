export class Admin {

  private _adminname;
  private _adminpassword;

  constructor(adminname: String, adminpassword: String ){
    
    this._adminname = adminname;
    this._adminpassword =adminpassword;
 }


 public get adminname(): String{
     return this._adminname;

 }

 public get adminpassword(): String{
     return this._adminpassword;

 }

 public set adminname(value: String ){
     
     this._adminname = value ;

 }

 public set adminpassword(value: String){
     
     this._adminpassword = value;

 }


}

