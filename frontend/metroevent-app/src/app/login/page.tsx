"use client";

import React, { useState, FormEvent } from 'react';
import '../index.css';
import logo from '../../../components/img/logoM.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  
  const API_URL = 'http://localhost:8020/auth/login';

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, rellena todos los campos');
      return;
    }

    setSuccessMessage(''); 

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Credenciales incorrectas');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token); 

      setSuccessMessage('Inicio exitoso');

      setTimeout(() => {
        router.push('/homeu');
      }, 1000); 

      setError('');
    } catch (error: any) {
      setError(error.message || 'Error desconocido');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className='flex w-full justify-center'>
          <Image className="w-[5vw] h-[2vw]" src={logo} alt="Logo" priority />
        </div>
        <h2 className='protest-strike-regular'>Iniciar Sesión</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="border border-black"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="contraseña">Contraseña</label>
            <input
              id="contraseña"
              className='border border-black'
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
