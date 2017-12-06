/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from "react";
import Dialog, {
DialogActions,
        DialogContent,
        DialogContentText,
        DialogTitle,
        } from 'material-ui/Dialog';
import Button  from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import servicoLogin from "../login/ServicoLogin";

export default class ProdutoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                update:0,
                produto: this.props.produto
        }

    }

    componentWillReceiveProps(proximoEstado) {
        this.setState({produto: proximoEstado.produto});

    }

    setNome(valor) {
        this.setState(
                (anterior) =>
        {
            anterior.produto.nome = valor;
            return anterior;
        }
        );

    }

    setValor(valor) {
        this.setState(
                (anterior) => {
            anterior.produto.valor = valor;
            return valor;
        }

        );

    }

    upload(form) {

        let formData = new FormData(form);
        fetch("/api/produtos/" + this.state.produto.id + "/foto", {
            method: "POST",

            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization()

            }),
            body: formData
        }).then((resultado) => {
            if (resultado.ok) {
                this.setState(
                (anterior) =>
        {
            anterior.update = anterior.update+1;
            console.log("Mudou!");
            return anterior;
        }
        );
                
                
            } else {
                resultado.json().then(
                        (resultadoErro) => console.log(resultadoErro)
                )
            }

        });

    }

    confirmar() {
        if (this.state.produto.nome &&
                this.state.produto.valor) {
            if (this.state.produto.id) {
                this.props.editar(this.state.produto.id, this.state.produto);
            } else {
                this.props.inserir(this.state.produto);
            }
        } else {
            alert("Preencha todos os campos!");
        }



    }

    render() {
        return <Dialog open={this.props.abrir}>
<DialogTitle>{this.state.produto.id ? `Editar item ${this.state.produto.nome}` : "Novo Produto"}</DialogTitle>
<DialogContent>
    <img style={{"width": "300px"}} src={"/api/produtos/" + this.state.produto.id + "/foto?" 
                + servicoLogin.getAuthorizationGet()+"&update="+this.state.update}/>

    <br/>
    <form method="post" encType="multipart/form-data"  
          onSubmit={(event) => {
                            event.preventDefault();
                            this.upload(event.target);
}}>
        <input name="arquivo" type="file" />
        <button type="submit">Enviar</button>
    </form>


    <br/>
    <TextField label="Nome"
               value={this.state.produto.nome}
               onChange={(evento) => this.setNome(evento.target.value)}  /><br/><br/>
    <TextField type="number" label="Valor"
               value={this.state.produto.valor}
               onChange={(evento) => this.setValor(evento.target.value)}
               /><br/><br/>
</DialogContent>

<DialogActions>
    <Button onClick={() => {
                                this.props.cancelar()
}} color="primary">
        Cancelar
    </Button>
    <Button onClick={(evento) => {
                                    this.confirmar()
}} color="primary">
        Confirmar
    </Button>
</DialogActions>
</Dialog >;

        }
    } 