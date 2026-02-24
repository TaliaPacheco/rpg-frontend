import { useState } from 'react';
import api from '../services/api';

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; confirmPassword?: string }>({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = (): { username?: string; email?: string; password?: string; confirmPassword?: string } => {
    const newErrors: { username?: string; email?: string; password?: string; confirmPassword?: string } = {};

    if (!formData.username) newErrors.username = 'Nome de usuário é obrigatório';
    else if (formData.username.length < 3) newErrors.username = 'Nome deve ter pelo menos 3 caracteres';

    if (!formData.email) newErrors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';

    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    else if (formData.password.length < 6) newErrors.password = 'Senha deve ter pelo menos 6 caracteres';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem';

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
    setSuccess('');

    try {
      await api.post('/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      setSuccess('Conta criada com sucesso! Redirecionando para login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <body style={{ margin: 0, padding: 0 }}>
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
        borderRadius: '8px'
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
          Criar Conta
        </h1>

        <p style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#cbd5e1',
          fontSize: '14px'
        }}>
          Bem vindo ao reino, aventureiro! Crie sua conta para começar sua jornada.
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

        {success && (
          <div style={{
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.5)',
            borderRadius: '4px',
            color: '#86efac'
          }}>
            {success}
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
              Nome de Usuário
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder='Digite seu nome de usuário'
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
            {errors.username && (
              <span style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                {errors.username as string}
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
              Senha
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

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#cbd5e1',
              fontSize: '14px'
            }}>
              Confirmar Senha
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder='Confirme sua senha'
              value={formData.confirmPassword}
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
            {errors.confirmPassword && (
              <span style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                {errors.confirmPassword as string}
              </span>
            )}
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
            {loading ? '⏳ Criando conta...' : 'Criar Conta'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#cbd5e1', fontSize: '14px', margin: '0' }}>
          Já tem uma conta?{' '}
          <a href="/login" style={{
            color: '#3b82f6',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline'}
          onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none'}>
            Fazer login
          </a>
        </p>
      </div>
    </div>
    </body>
  );
}

export default RegisterPage;
