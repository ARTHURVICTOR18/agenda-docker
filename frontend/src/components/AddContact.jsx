import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createContato } from '../services/api'

const AddContact = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nome || !email) {
            alert('Nome e email são obrigatórios.');
            return;
        }
        await onAdd({ nome, email, telefone });
        navigate('/')
    };

    const onAdd = async ({ nome, email, telefone }) => {
        try{
            await createContato({nome, email, telefone});
        }catch(err){    
            console.log("Erro ao criar contato", err)
        }

    }

    return (
        <div className="page">
            <h2>Adicionar Novo Contato</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Nome<span className="required">*</span>:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite o nome"
                    />
                </div>
                <div className="form-group">
                    <label>Email<span className="required">*</span>:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite o email"
                    />
                </div>
                <div className="form-group">
                    <label>Telefone:</label>
                    <input
                        type="text"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        placeholder="Digite o telefone (opcional)"
                    />
                </div>
                <button type="submit" className="btn-submit">
                    Salvar Contato
                </button>
            </form>
        </div>
    );
};

export default AddContact;
