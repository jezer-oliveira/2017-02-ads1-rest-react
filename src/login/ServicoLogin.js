
import ServicoRest from "../ServicoRest";
import base64 from "base-64/base64.js";

class ServicoLogin  {
    constructor(){
        //super("api/login");
    }
    
    login(usuario, senha){
        this.usuario=usuario;
        this.senha=senha;
        
    }
    
    getAuthorization() {
         return base64.encode(this.usuario+":"+this.senha);
    }
    
    logado() {
    if(this.usuario&&this.senha) {
        return true;
    } else {
        return false;
    }
   
    }
}

let servicoLogin = new ServicoLogin();

//servicoLogin.login("admin","1234");

export default servicoLogin;