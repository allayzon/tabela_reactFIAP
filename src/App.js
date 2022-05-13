import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useEffect, useState } from "react";
import Lista from './Lista.js';
import 'bootstrap/dist/css/bootstrap.css'
import Cartao from './Cartao';

function App() {


  const [usuarios, setUsuarios] = useState([]);
  const [id,setId] = useState("");
  const [nome,setNome] = useState("");
  const [email,setEmail] = useState("");
  const [senha,setSenha] = useState("");
  
  function salvarFormulario(){
      

      let parametros = {
          name: nome,
          email: email,
          password: senha
      }
      axios.post('https://iot.14mob.com/api-fiap/public/index.php/users', parametros).then(response => {
          if(response.status == 201){
              alert('Ebaaaaa deu certo')
              atualizarLista()
              limparDados()
          }else{
              alert('lascou')
          }
      }).catch( error => console.log(error));

  }

  function atualizarUsuarioApi(){

      let parametros = {
          name: nome,
          email: email,
          password: senha
      }
      axios.put('https://iot.14mob.com/api-fiap/public/index.php/users/'+ id, parametros).then(response => {
          if(response.status == 200){
              alert('Ebaaaaa deu certo')
              atualizarLista()
          }else{
              alert('lascou')
          }
      }).catch( error => console.log(error));
  }

  function topoPagina() {
    window.scrollTo(0, 0)
  }

  function atualizarUsuario(usuario){
      setId(usuario.id);
      setNome(usuario.name);
      setEmail(usuario.email);
      setSenha(usuario.password);
      topoPagina()
  }

  function atualizarLista() {
    axios.get('https://iot.14mob.com/api-fiap/public/index.php/users').then( response => {
          setUsuarios(response.data.users);
          limparDados()
      })
  }

  function limparDados() {
    setId("")
    setNome("")
    setEmail("")
    setSenha("")
  }
  
useEffect(() => {
      atualizarLista()
      },[])


return (
    <div className='container'>
      <Cartao titulo="Cadastro de usuario">
        <form className="formulario" onSubmit={event => {
            event.preventDefault();
            if(id != ''){
                atualizarUsuarioApi()
            }else{
                salvarFormulario();
            }
            return false;
        } } > 
        <div className='form-group'>
          <label>Nome</label>
          <input className='form-control' name="name" value={ nome }  onChange={ e => setNome(e.target.value) } />
        </div>
        <div className='form-group'>
          <label>Email</label>
          <input className='form-control' type="email" name="email" value={ email } onChange={ e => setEmail(e.target.value) } />
        </div>
        <div className='form-group'>
          <label>Senha</label>
          <input className='form-control' type="password" name="password" value={ senha } onChange={ e => setSenha(e.target.value) } />
        </div>
        <button className='btn btn-primary mt-3' type="submit">Enviar cadastro</button>
        </form>
      </Cartao>

      {/* <p>{ nome }</p>
      <p>{ email }</p>
      <p>{ senha }</p> */}
      
      <Cartao titulo="Lista de usuarios">
          <Lista usuarios={usuarios} onEditar={usuario => atualizarUsuario(usuario)} atualizarLista={atualizarLista} ></Lista>
      </Cartao>

  </div>
    
    
);

  
}

export default App;