import {FiSearch} from 'react-icons/fi';
import './App.css';
import {useState} from 'react';
import api from './services/api';

export default function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  const handleInputChange = (event) => {
    const inputValue = event.target.value.replace(/\D/g, '');
    setInput(inputValue);
  };

  async function handleSearch() {
    if (input === '') {
      alert('Preencha o CEP');
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    } catch {
      alert('Erro ao buscar o CEP');
      setInput('');
    }
  }

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      await handleSearch();
    }
  };

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button className="btnSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main id="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.complento ? `Complemento: ${cep.complemento}` : ''}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}
