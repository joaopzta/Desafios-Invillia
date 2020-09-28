import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import './styles.css';

export default function Pessoa() {
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');

  const [listPessoas ,setListPessoas] = useState([]);

  function initialState() {
    setCodigo(null);
    setNome('');
    setEmail('');
    setCidade('');
    setUf('');
  }

  async function handlePessoa(e) {
    e.preventDefault();

    const data = {
      nome,
      email,
      cidade,
      uf
    };

    try {
      await api.post('pessoas', data);
      alert('Cadastro realizado com SUCESSO!!!');

      api.get('pessoas').then(response => {
        setListPessoas(response.data)
      });

      initialState();
    } catch (err) {
      alert('Erro no cadastro!', err);
    }
  }

  async function handleDeletePessoa(codigo) {
    try {
      await api.delete(`pessoas/${codigo}`);

      setListPessoas(listPessoas.filter(pessoa => pessoa.codigo !== codigo));
    } catch (err) {
      console.log("Erro ao deletar!");
    }
  }

  async function handleBuscarPorCodigo(codigo) {
    api.get(`pessoas/${codigo}`).then(response => {
      if (response.data != null) {
        setCodigo(response.data.codigo)
        setNome(response.data.nome);
        setEmail(response.data.email);
        setCidade(response.data.cidade);
        setUf(response.data.uf);
      }
    }).catch((err) => {
      console.error('Erro: ' + err);
    });
  }

  async function handleAtualizarPessoa(e) {
    e.preventDefault();

    const data = {
      codigo,
      nome,
      email,
      cidade,
      uf
    };

    try {
      await api.put(`pessoas/${codigo}`, data);
      alert('Alteração realizada com SUCESSO!!!');

      api.get('pessoas').then(response => {
        setListPessoas(response.data)
      });
      
      initialState();
    } catch (err) {
      alert('Erro no cadastro!', err);
    }
  }
  
  useEffect(() => {
    api.get('pessoas').then(response => {
      setListPessoas(response.data)
    });
  }, []);

  return (
    <div className="pessoa-container">
      <div className="content">
        <form onSubmit={codigo ? handleAtualizarPessoa : handlePessoa}>
        <h1>Formulário</h1>
        <input 
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        
        <div className="input-group">
          <input 
            placeholder="Cidade"
            value={cidade}
            onChange={e => setCidade(e.target.value)}
          />
          <input 
            placeholder="UF"
            value={uf}
            onChange={e => setUf(e.target.value)}
          />
        </div>

        {codigo ? <button className="button" type="submit">Salvar</button> : <button className="button" type="submit">Cadastrar</button>}
        </form>
      </div>
      <section className="list">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Cidade</th>
              <th>UF</th>
              <th className="button-action"></th>
            </tr>
          </thead>
          <tbody>
            {listPessoas.map(pessoa => (
              <tr key={pessoa.codigo}>
                <td className="data-row">{pessoa.nome}</td>
                <td className="data-row">{pessoa.email}</td>
                <td className="data-row">{pessoa.cidade}</td>
                <td className="data-row">{pessoa.uf}</td>
                <td>
                  <button className="button" onClick={() => handleDeletePessoa(pessoa.codigo)}>Excluir</button>
                  <button className="button" onClick={() => handleBuscarPorCodigo(pessoa.codigo)}>Atualizar</button>
                </td>
              </tr>
            ))};
          </tbody>
        </table>
      </section>
    </div>
  );
}