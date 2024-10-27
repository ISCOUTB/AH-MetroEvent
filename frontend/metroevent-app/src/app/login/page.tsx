"use client";

import React, { useState, FormEvent } from 'react';
import '../index.css';
import logo from '../../../components/img/logoM.png'
import Image from 'next/image';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, rellena todos los campos');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert('Inicio de sesión exitoso');
    } else {
      setError('Credenciales incorrectas');
    }
  }; 

  return (
    <div className="login-container">
      <div className="login-box">
        <div className='flex  w-full justify-center'>
          <Image className=" w-[5vw] h-[2vw]" src={logo} alt="Logo" priority />
        </div>
        <h2 className='protest-strike-regular'>Iniciar Sesión</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input className='border border-black'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input className='border border-black'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
