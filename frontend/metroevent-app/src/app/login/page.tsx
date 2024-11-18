"use client";

import React, { useState, FormEvent } from 'react';
import '../index.css';
import logo from '../../../components/img/logoM.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Login() {

  const [username, setUsername] = useState<string>(''); // Cambiar 'email' por 'username'
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  interface CustomError {
    message: string;
  }

  const API_URL = 'http://localhost:8020/auth/login';

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
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
          username: username, // Usamos 'username' en lugar de 'email'
          password: password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Credenciales incorrectas');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user_id', data.user_id);

      setSuccessMessage('Inicio exitoso');

      setTimeout(() => {
        router.push('/homeu');
      }, 1000); 

      setError('');
    } catch (error) {
      const customError = error as CustomError;
      setError(customError.message || 'Error desconocido');
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
            <label htmlFor="username">Nombre de Usuario</label> {/* Cambiar 'email' a 'username' */}
            <input
              id="username"
              className="border border-black"
              type="text" // Usamos 'text' en lugar de 'email'
              value={username} // Usamos el estado 'username'
              onChange={(e) => setUsername(e.target.value)} // Actualizamos el estado de 'username'
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
