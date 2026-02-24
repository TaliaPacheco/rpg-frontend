import { useState } from 'react';
import api from '../services/api';

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = (): { email?: string; password?: string } => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) newErrors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';

    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    else if (formData.password.length < 6) newErrors.password = 'Senha deve ter pelo menos 6 caracteres';

    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/login', formData);
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      backgroundImage: "url('/src/assets/images/Foto-floresta-azul.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif"
    }}>
      <div style={{
        width: 400,
        padding: '40px',
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        borderRadius: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <img src="/src/assets/images/LOGO.png" alt="BitDragon Logo" style={{
            width: '250px',
            height: '170px',
            objectFit: 'contain'
          }} />
        </div>

        <h1 style={{
          textAlign: 'center',
          marginBottom: '25px',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '32px',
          margin: '0 0 8px 0'
        }}>
          Faça seu login
        </h1>

        <p style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#cbd5e1',
          fontSize: '14px'
        }}>
          Bem vindo de volta, aventureiro! Sua campanha te espera.
        </p>

        {error && (
          <div style={{
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            borderRadius: '4px',
            color: '#fca5a5'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#cbd5e1',
              fontSize: '14px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Digite seu email'
              style={{
                width: '100%',
                height: '45px',
                padding: '10px 12px',
                color: '#e2e8f0',
                backgroundColor: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                borderRadius: '10px',
                fontSize: '14px',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.5)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.3)'}
            />
            {errors.email && (
              <span style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                {errors.email as string}
              </span>
            )}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#cbd5e1',
              fontSize: '14px'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder='Digite sua senha'
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                height: '45px',
                padding: '10px 12px',
                color: '#e2e8f0',
                backgroundColor: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                borderRadius: '10px',
                fontSize: '14px',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.5)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.3)'}
            />
            {errors.password && (
              <span style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                {errors.password as string}
              </span>
            )}
          </div>

          <div style={{ textAlign: 'right', marginTop: '8px', marginBottom: '16px' }}>
            <a href="#" style={{
              color: '#3b82f6',
              textDecoration: 'none',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline'}
            onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none'}>
              Esqueceu a senha?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: loading ? '#1e40af' : '#3b82f6',
              color: '#fff',
              padding: '10px',
              marginTop: '16px',
              marginBottom: '16px',
              fontSize: '16px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '10px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => !loading && ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2563eb')}
            onMouseLeave={(e) => !loading && ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#3b82f6')}
          >
            {loading ? '⏳ Entrando...' : 'Entrar'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#cbd5e1', fontSize: '14px', margin: '0' }}>
           Ainda não é um aventureiro?{' '}
          <a href="/register" style={{
            color: '#3b82f6',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline'}
          onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none'}>
            Criar conta
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
