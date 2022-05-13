import axios from "axios";
//import { useEffect, useState } from "react";

function Lista(props){
    
    function removerUsuario(id){
  
        axios.delete("https://iot.14mob.com/api-fiap/public/index.php/users/" + id).then( response => {
            alert('Deu certo removi o usuario')

            props.atualizarLista()
  
        }).catch( error => console.log(error));
  
    }

    return(
        <table className='minhaTabela table table-bordered'>
          <thead>
              <tr>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Data de criação</th>
              <th scope="col">Ações</th>
              </tr>
          
          </thead>  
          <tbody> 
              { props.usuarios.map( usuario => {
                  return (
                      <tr key={usuario.id}>
                          <td scope="row">{usuario.name}</td>
                          <td scope="row">{usuario.email}</td>
                          <td scope="row">{usuario.created_at}</td>
                          <td>
                              <button id="topo-da-pagina" className="btn btn-secondary" onClick={ event => props.onEditar(usuario)  } > Editar </button>
                              <button className="btn btn-danger" onClick={ event => removerUsuario(usuario.id) } > Deletar </button>
                          </td>
                          
                      </tr>
                      )
              } ) }
          </tbody>
      </table>
    )
}

export default Lista;