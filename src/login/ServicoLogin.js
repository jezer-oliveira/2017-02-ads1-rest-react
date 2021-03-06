
import ServicoRest from "../ServicoRest";
import base64 from "base-64/base64.js";

class ServicoLogin  {
    constructor(){
        //super("api/login");
    }
    
    
    loginGoogle(token, sucesso, erro){
        
        fetch(`api/usuarios/login/google?googleToken=${token}`,{
            method:"GET"
        }
        ).then((resposta)=>{
           if(resposta.ok) {
               this.token=resposta.headers.get("token");
               resposta.json().then((dados)=>{this.dados=dados; sucesso(dados);}) 
               
           } else {
               resposta.json().then(erro);
           }
               
        } ).catch(erro);
    }
    
    
    login(usuario, senha, sucesso, erro){
        this.usuario=usuario;
        this.senha=senha;
        
        
        fetch(`api/usuarios/login`,{
             headers: new Headers({
                'Authorization':this.getAuthorization()
            }),
            method:"GET"
        }
        ).then((resposta)=>{
           if(resposta.ok) {
               this.token=resposta.headers.get("token");
               resposta.json().then((dados)=>{this.dados=dados; sucesso(dados);}) 
               
           } else {
               resposta.json().then(erro);
           }
               
        } ).catch(erro);
    }
    
    getAuthorizationGet() {
        return "token="+this.token;
    } 
    
    getAuthorization() {
        if(this.token){
            return "Bearer "+this.token;
        } else 
            return "Basic "+base64.encode(this.usuario+":"+this.senha);
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