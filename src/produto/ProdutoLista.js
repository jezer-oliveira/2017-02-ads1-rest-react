import React from "react";
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from 'material-ui/Table';


import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import Button from 'material-ui/Button';

const theme = createMuiTheme({
  palette: {
    primary: purple, // Purple and green play nicely together.
    secondary: {
      ...green,
      A400: '#00e677',
    },
    error: red,
  },
});


export default class ProdutoLista extends React.Component {

    setPagina(numero) {
        this.props.mudaPagina(numero);
    }

    botoesPagina() {
        let botoes = [<button>&lt;&lt;</button>, <button>&lt;</button>];
        for (let x = 0; x < this.props.pagina.totalPages; x++) {
            let botao = <button 
                onClick={(evento) => {
                                this.setPagina(x);
            }}
                disabled={x == this.props.pagina.number}>{x + 1}</button>;
                botoes.push(botao);
        }
        return botoes;
    }

    botoesProduto(produto) {
        let botoes = [];
        


        if (this.props.editar) {
            let botao = <IconButton onClick={(evento) => {
                                this.props.editar(produto);
            }} >
        <Icon style={{color:"#F0F"}}>create</Icon>
      </IconButton>
                            /*
                            <button onClick={(evento) => {
                                this.props.editar(produto);
            }}>
                Editar</button>;*/;
                botoes.push(botao);
        }

        if (this.props.apagar) {
            let botao = 
                    <IconButton onClick={(evento) => {
                                this.props.apagar(produto);
            }} color="accent">
        <Icon>delete</Icon>
      </IconButton>;
                    /*            
                                
                                <button onClick={(evento) => {
                                this.props.apagar(produto);
            }}>
                Apagar</button>;*/
                botoes.push(botao);
        }
        return botoes;
    }

    render() {

        if (!this.props.pagina.content) {
            return <div>Vazio!</div>;
        } else {

            return (<MuiThemeProvider theme={theme}> <Table >
    <TableHead>
        <TableRow>
            <TableCell>Nome</TableCell><TableCell  >Valor</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {this.props.pagina.content.map((produto) => {
                                return <TableRow hover="true" key={produto.id}>
                            <TableCell>{produto.nome}</TableCell>
                            <TableCell numeric="true">{produto.valor}</TableCell>
                            <TableCell>
                                {this.botoesProduto(produto)}</TableCell>
                        </TableRow>;
        })}        
    </TableBody>
    <TableFooter>
        <TableRow>
        <TablePagination
                  count={this.props.pagina.totalElements}
                  rowsPerPage={this.props.pagina.size}
                  page={this.props.pagina.number}
                  onChangePage={(evento,pagina)=>{this.setPagina(pagina);}}
                  onChangeRowsPerPage={()=>{}}
                  rowsPerPageOptions={[this.props.pagina.size]}
                  labelRowsPerPage=""
                />
        </TableRow>                        
    </TableFooter>
    </Table>
    </MuiThemeProvider>);
        }
    }
}