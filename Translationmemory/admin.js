module.exports = class admin {

    #_adminname;
    #_adminpassword;

    constructor(_adminname, _adminpassword){
    
        this.#_adminname = _adminname;
        this.#_adminpassword =_adminpassword;
    }
  
    getadminname(){
        return this.#_adminname;

    }

    getadminpassword(){
        return this.#_adminpassword;

    }

    setadminname(_adminname ){
        
        this.#_adminname =_adminname ;

    }

    setadminpassword(_adminpassword){
        
        this.#_adminpassword = _adminpassword;

    }
   

}

