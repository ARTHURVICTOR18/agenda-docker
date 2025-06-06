import React, { useEffect, useState } from 'react';
import { getAllContatos, deleteContato } from '../services/api';
import { useLocation } from 'react-router-dom';


const ContactList = () => {
    const [contatos, setContatos] = useState([]);   // inicie como array vazio
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    const location = useLocation(); // <-- capturamos a localização atual

    useEffect(() => {
        buscarContatos();
    }, [location]); // <-- toda vez que `location` mudar, refaz a requisição

    const buscarContatos = async () => {
        setLoading(true);
        try {
            const response = await getAllContatos();
            setContatos(response || []);
        } catch (err) {
            console.log("Erro ao buscar contatos", err);
            setErro('Não foi possível carregar os contatos.');
        } finally {
            setLoading(false);
        }
    };
    const onDelete = async (id) => {
        try {
            await deleteContato(id);
            // já que deletamos, refazemos a lista
            buscarContatos();
        } catch (err) {
            console.log("Erro ao deletar contato", err);
            setErro('Não foi possível remover o contato.');
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }
    if (erro) {
        return <p style={{ color: 'red' }}>{erro}</p>;
    }

    return (
        <div className="page">
            <h2>Contatos Existentes</h2>
            {contatos.length === 0 ? (
                <p>Nenhum contato cadastrado.</p>
            ) : (
                <table className="contatos-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contatos.map((contato) => (
                            <tr key={contato.id}>
                                <td>{contato.nome}</td>
                                <td>{contato.email}</td>
                                <td>{contato.telefone}</td>
                                <td>
                                    <button
                                        className="btn-delete"
                                        onClick={() => onDelete(contato.id)}
                                    >
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ContactList;
