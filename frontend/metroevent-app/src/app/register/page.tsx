"use client";

import React, { useState, FormEvent } from 'react';
import '../index.css';
import { useRouter } from 'next/navigation';

function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  interface CustomError {
    message: string;
  }
  const router = useRouter();

  
  const API_URL = 'http://localhost:8020/auth/register';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('Por favor, rellena todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setError(''); 
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
        throw new Error(data.detail || 'Error al registrar el usuario');
      }

      setSuccessMessage('Registro exitoso');

      
      setTimeout(() => {
        router.push('/');
      }, 1000);

    } catch (error) {
      const customError = error as CustomError;
      setError(customError.message || 'Error desconocido');
  }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Registrarse</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
             <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="register-password">Contraseña</label>
            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="register-confirm-password">Confirmar Contraseña</label>
            <input
              id="register-confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
