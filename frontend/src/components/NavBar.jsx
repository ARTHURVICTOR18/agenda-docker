import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <h1 className="navbar-logo">
                <img
                    src='/contact-us.png'
                    alt="Logo"
                    className="navbar-logo-img"
                />
                Meus Contatos
            </h1>
            <div className="navbar-links">
                {/* Destaca o link ativo */}
                <Link
                    to="/"
                    className={location.pathname === '/' ? 'active' : ''}
                >
                    Contatos
                </Link>
                <Link
                    to="/cadastro"
                    className={location.pathname === '/cadastro' ? 'active' : ''}
                >
                    Novo Contato
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
