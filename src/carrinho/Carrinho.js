import React from 'react';
import servicoLogin from "./../login/ServicoLogin";


export default class Carrinho extends React.Component {
        constructor(props) {
            
            super(props);
            fetch('/api/usuarios/4/foto', {
            method: "GET",
            
            headers: new Headers({
                'Authorization': 'Basic ' + servicoLogin.getAuthorization(),
                
            }),
        })
.then((response)=> {
  return response.blob();
}).then((myBlob)=> {
  var objectURL = URL.createObjectURL(myBlob);
  this.setState({src:objectURL});
});
            this.state={src:""};
        }
        upload(form) {
            
            let formData = new FormData(form);
             fetch("/api/usuarios/4/foto", {
            method: "POST",
            
            headers: new Headers({
                'Authorization': 'Basic ' + servicoLogin.getAuthorization()
                
            }),
            body: formData
        }).then((resultado) => {
            if (resultado.ok) {
                resultado.json().then(console.log)
            } else {
                resultado.json().then(
                        (resultadoErro) => console.log(resultadoErro)
                )
            }

        });
            
        }
        
        render(){
            return 
            
            <form method="post" encType="multipart/form-data"  onSubmit={(event)=>{event.preventDefault(); this.upload(event.target);}}>
                <a href={this.state.src}> aqui</a>
                <br/>
                Carrinho
            <input name="arquivo" type="file" />
            <button type="submit">Enviar</button>
            </form>;
        } 
}