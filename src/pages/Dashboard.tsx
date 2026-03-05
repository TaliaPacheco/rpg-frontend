import { useState, useEffect } from 'react';
import api from '../services/api';

interface Campaign {
  id: string;
  title: string;
  description?: string;
  system: string;
  status: string;
  userId: string;
  campaignImage?: string;
  createdAt?: string;
  characters?: any[];
  quests?: any[];
  journalEntries?: any[];
  participants?: Array<{
    id: string;
    campaignId: string;
    userId: string;
    createdAt: string;
    user: {
      id: string;
      name: string;
      profileImage?: string;
    }
  }>;
  name?: string;
  gameMaster?: string;
  createdOn?: string;
  activePlayers?: number;
  openQuests?: number;
  mapLocations?: number;
  nextSession?: string;
  nextSessionTime?: string;
  daysLeft?: number;
  synopsis?: string;
  quote?: string;
  recentActivity?: Array<{
    id: number;
    title: string;
    time: string;
    description: string;
  }>;
}

function Dashboard() {
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingCover, setEditingCover] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`campaigns/user/${user.id}`);
        console.log('Resposta da campanha:', response.data);
        
        if (!response.data) {
          console.log('Nenhuma campanha encontrada. Criando uma padrão...');
          const newCampaignResponse = await api.post('/campaigns', {
            title: 'Minha Primeira Aventura',
            description: 'Uma campanha épica de RPG',
            system: 'FANTASIA',
            userId: user.id,
          });
          console.log('Campanha criada:', newCampaignResponse.data);
          setActiveCampaign(newCampaignResponse.data.campanha || newCampaignResponse.data);
        } else {
          setActiveCampaign(response.data);
        }
        
        const userResponse = await api.get(`users/${user.id}`);
        console.log('Resposta do usuário:', userResponse.data);
        setUserData(userResponse.data);
        
        setError('');
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setError(err.response?.data?.message || 'Erro ao carregar campanha');
      } finally {
        setLoading(false);
      }
    };

    if (user.id) {
      fetchCampaignData();
    } else {
      setLoading(false);
      setError('Usuário não encontrado');
    }
  }, []);

  const handleUploadCover = async () => {
    if (!selectedFile || !activeCampaign) {
      console.warn('Arquivo ou campanha ausente. Arquivo:', selectedFile, 'Campanha:', activeCampaign);
      return;
    }

    try {
      setUploadingCover(true);
      const formData = new FormData();
      formData.append('campaignImage', selectedFile);

      console.log('Enviando arquivo:', selectedFile.name);
      console.log('Campaign ID:', activeCampaign.id);
      console.log('FormData preparado:', {
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        fileType: selectedFile.type
      });

      const response = await api.post(`/campaigns/${activeCampaign.id}/upload-campaign-image`, formData);

      console.log('✅ Resposta do servidor:', response.data);
      console.log('Status da resposta:', response.status);
      
      const updatedCampaign = response.data.campaign || response.data;
      console.log('Campanha atualizada:', updatedCampaign);
      
      setActiveCampaign({ ...activeCampaign, ...updatedCampaign });
      setEditingCover(false);
      setSelectedFile(null);
      setError('');
      alert('Capa da campanha atualizada com sucesso!');
    } catch (err: any) {
      console.error('Erro ao fazer upload da capa:', err);
      console.error('Status do erro:', err.response?.status);
      console.error('Detalhes do erro:', err.response?.data);
      console.error('Mensagem de erro:', err.message);
      setError(err.response?.data?.message || 'Erro ao fazer upload da capa');
    } finally {
      setUploadingCover(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '18px'
      }}>
        ⏳ Carregando campanha...
      </div>
    );
  }

  const campaign = activeCampaign || {
    id: '0',
    title: 'Nova Aventura',
    system: 'Campanha de RPG',
    status: 'Em preparação',
    userId: user.id,
    name: 'Nova Aventura',
    gameMaster: 'Mestre da Masmorra',
    createdOn: new Date().toLocaleDateString('pt-BR'),
    activePlayers: 0,
    openQuests: 0,
    mapLocations: 0,
    nextSession: 'Próxima Sessão',
    nextSessionTime: '---',
    daysLeft: 0,
    synopsis: 'Nenhuma sinopse definida. Clique em editar para descrever sua aventura',
    quote: '---',
    recentActivity: [],
    participants: [],
    campaignImage: undefined
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#fff',
      fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
      display: 'flex',
      padding: '0',
    }}>
      
      <aside style={{
        width: '300px',
        backgroundColor: '#0a0f1b',
        borderRight: '1px solid rgba(148, 163, 184, 0.1)',
        padding: '24px',
        marginRight: '50px',
        position: 'fixed',
        height: '100vh',
      }}>
        <div style={{ padding: '0 20px', marginBottom: '32px' }}>
          <div style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#a855f7',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🎲 BitDragon
          </div>
        </div>

        <nav style={{ marginBottom: '32px' }}>
          {[
            { icon: '📊', label: 'Dashboard', active: true },
            { icon: '👥', label: 'Personagens' },
            { icon: '⚔️', label: 'Quests', badge: '2' },
            { icon: '📖', label: 'Journal' },
            { icon: '🗺️', label: 'Mapa' }
          ].map((item, idx) => (
            <a
              key={idx}
              href="#"  
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                color: item.active ? '#a855f7' : '#cbd5e1',
                textDecoration: 'none',
                fontSize: '14px',
                borderLeft: item.active ? '3px solid #a855f7' : 'transparent',
                backgroundColor: item.active ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!item.active) {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(168, 85, 247, 0.05)';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#a855f7';
                }
              }}
              onMouseLeave={(e) => {
                if (!item.active) {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#cbd5e1';
                }
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {item.label}
              {item.badge && (
                <span style={{
                  marginLeft: 'auto',
                  backgroundColor: '#a855f7',
                  color: '#fff',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        <div style={{
          borderTop: '1px solid rgba(148, 163, 184, 0.1)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
          padding: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Campaign Settings
        </div>

        <nav style={{ marginTop: '0' }}>
          {[
            { icon: '⚙️', label: 'Configurações' },
            { icon: '📧', label: 'Convites' }
          ].map((item, idx) => (
            <a
              key={idx}
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                color: '#cbd5e1',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(168, 85, 247, 0.05)';
                (e.currentTarget as HTMLAnchorElement).style.color = '#a855f7';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLAnchorElement).style.color = '#cbd5e1';
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          width: 'calc(240px - 40px)',
          padding: '12px',
          backgroundColor: 'rgba(168, 85, 247, 0.1)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#a855f7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            DM
          </div>
          <div style={{ fontSize: '12px' }}>
            <div style={{ fontWeight: 'bold' }}>{userData?.name || user.name || 'Usuário'}</div>
            <div style={{ color: '#64748b' }}>Usuario</div>
          </div>
        </div>
      </aside>


        <main style={{
          width: '100%',
          flex: 1,
          marginLeft: '380px',
          justifyContent: 'center',
          padding: '40px',
          maxWidth: '1200px',
          marginRight: '380px'     
        }}>

          <div
            style={{
              width: '100%',
              height: '300px',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '32px',
              background: 'linear-gradient(180deg, #982dfc41 0%, rgba(84, 11, 255, 0) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {campaign.campaignImage ? (
                <img 
                  src={`http://localhost:5000/uploads/${campaign.campaignImage}`}
                  alt={campaign.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }} 
                />
              ) : (
                <span style={{
                  color: '#64748b',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  <div 
                    style={{
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center'
                      }}
                  > 
                    <img src="/src/assets/icons/no-picture.svg" alt="sem capa" style={{ width: '80px', opacity: 0.3 }} />
                  </div>
                </span>
              )}
            </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px'
          }}>
            <div>
              <div style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#a855f7',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '8px'
              }}>
                {campaign.status} • {campaign.system}
              </div>
              <h1 style={{
                fontSize: '48px',
                fontWeight: 'bold',
                margin: '0',
                background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {campaign.title || campaign.name || 'Nova Aventura'}
              </h1>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setEditingCover(true)}
                style={{
                padding: '12px 24px',
                backgroundColor: 'transparent',
                border: '1px solid rgba(168, 85, 247, 0.5)',
                color: '#a855f7',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s',
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(168, 85, 247, 0.1)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#a855f7';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(168, 85, 247, 0.5)';
                }}>
                  <img src="/src/assets/icons/pencil.svg" alt="Edit" style={{ height: '15px', marginRight: '8px' }} />
                 Editar capa
              </button>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}>
            {[
              { 
                label: 'ACTIVE PLAYERS', 
                value: campaign.activePlayers, 
                color: '#3b82f6',
                emptyMessage: 'Nenhum jogador ativo'
              },
              { 
                label: 'OPEN QUESTS', 
                value: campaign.openQuests, 
                color: '#a855f7',
                emptyMessage: 'Sem quests'
              },
              { 
                label: 'MAP LOCATIONS', 
                value: campaign.mapLocations, 
                color: '#8b5cf6',
                emptyMessage: 'Sem novas localizações'
              }
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: `rgba(59, 130, 246, ${stat.color === '#3b82f6' ? '0.1' : '0.05'})`,
                  border: `2px solid ${stat.color.replace(')', ', 0.3)')}`,
                  borderRadius: '12px',
                  padding: '20px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = stat.color;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '8px'
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: '#fff',
                  marginBottom: stat.value === 0 ? '8px' : '0'
                }}>
                  {stat.value}
                </div>
                {stat.value === 0 ? (
                  <div style={{
                    fontSize: '12px',
                    color: '#64748b',
                    fontStyle: 'italic'
                  }}>
                    {stat.emptyMessage}
                  </div>
                ) : (
                  stat.label === 'OPEN QUESTS' && (
                    <div style={{
                      fontSize: '12px',
                      color: stat.color
                    }}>
                      3 Critical Priority
                    </div>
                  )
                )}
              </div>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
            marginBottom: '32px'
          }}>
            <div style={{
              gridColumn: '1 / 2'
            }}>
              <div style={{
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                border: '2px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#fff'
                }}>
                  🎭 Campaign Synopsis
                </h2>
                <p style={{
                  color: '#cbd5e1',
                  lineHeight: '1.6',
                  fontSize: '14px',
                  marginBottom: '16px'
                }}>
                  {campaign.synopsis}
                </p>
                <blockquote style={{
                  borderLeft: '4px solid #a855f7',
                  paddingLeft: '16px',
                  marginLeft: '0',
                  color: '#a855f7',
                  fontSize: '13px',
                  fontStyle: 'italic'
                }}>
                  {campaign.quote}
                </blockquote>
              </div>
            </div>

            <div style={{
              gridColumn: '2 / 3'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)',
                border: '2px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#fff'
                }}>
                  🎬 Next Session
                </h2>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#a855f7ff',
                    marginBottom: '8px'
                  }}>
                    {campaign.nextSession}
                  </div>
                  <div style={{
                    fontSize: '16px',
                    color: '#cbd5e1',
                    marginBottom: '24px'
                  }}>
                    {campaign.nextSessionTime}
                  </div>
                  <div style={{
                    height: '6px',
                    backgroundColor: 'rgba(168, 85, 247, 0.2)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      height: '100%',
                      backgroundColor: '#a855f7',
                      width: '25%'
                    }} />
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#64748b',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span>{campaign.daysLeft} days left</span>
                    <span>Scheduled</span>
                  </div>
                </div>
                <button style={{
                  marginTop: '20px',
                  padding: '12px 24px',
                  backgroundColor: 'rgba(168, 85, 247, 0.2)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  color: '#a855f7',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(168, 85, 247, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(168, 85, 247, 0.2)';
                  }}>
                  Reschedule
                </button>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            border: '2px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                📝 Recent Activity
              </span>
              <a href="#" style={{
                color: '#a855f7',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
                onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline'}
                onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none'}>
                View All
              </a>
            </h2>
            {(campaign.recentActivity || []).length > 0 ? (
              (campaign.recentActivity || []).map((activity) => (
                <div
                  key={activity.id}
                  style={{
                    paddingBottom: '20px',
                    borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
                    marginBottom: '20px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '8px'
                  }}>
                    <h3 style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#fff',
                      margin: '0'
                    }}>
                      {activity.title}
                    </h3>
                    <span style={{
                      fontSize: '12px',
                      color: '#64748b'
                    }}>
                      {activity.time}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '13px',
                    color: '#cbd5e1',
                    margin: '0',
                    lineHeight: '1.5'
                  }}>
                    {activity.description}
                  </p>
                </div>
              ))
            ) : (
              <div style={{
                padding: '24px',
                textAlign: 'center',
                color: '#64748b',
                fontStyle: 'italic'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📖</div>
                Nenhuma atividade registrada ainda.
                <br />
                Comece sua aventura adicionando personagens, quests ou notas!
              </div>
            )}
          </div>
        </main>

        <aside style={{
          position: 'fixed',
          right: '32px',
          top: '120px',
          width: '280px',
          backgroundColor: 'rgba(59, 130, 246, 0.05)',
          border: '2px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '12px',
          padding: '24px',
          maxHeight: 'calc(100vh - 150px)',
          overflowY: 'auto'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '20px'
          }}>
            Campaign Info
          </h3>

          <div style={{ marginBottom: '20px' }}>
            <div style={{
              fontSize: '12px',
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '8px'
            }}>
              Game Master
            </div>
            <div style={{
              fontSize: '14px',
              color: '#fff',
              fontWeight: 'bold'
            }}>
              {campaign.gameMaster}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{
              fontSize: '12px',
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '8px'
            }}>
              Created On
            </div>
            <div style={{
              fontSize: '14px',
              color: '#fff'
            }}>
              {campaign.createdOn}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{
              fontSize: '12px',
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '8px'
            }}>
              System
            </div>
            <div style={{
              fontSize: '14px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📖 {campaign.system}
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '12px',
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '12px'
            }}>
              Active Players
            </div>
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {(campaign.participants || []).length > 0 ? (
                (campaign.participants || []).map((participant, idx) => {
                  const colors = ['#3b82f6', '#a855f7', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
                  const color = colors[idx % colors.length];
                  
                  return (
                    <div
                      key={participant.id}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        color: '#fff',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                      }}
                      title={participant.user.name}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                      }}
                    >
                      {participant.user.name.charAt(0).toUpperCase()}
                    </div>
                  );
                })
              ) : (
                <div style={{
                  fontSize: '12px',
                  color: '#64748b',
                  fontStyle: 'italic',
                  padding: '8px',
                  backgroundColor: 'rgba(100, 116, 139, 0.1)',
                  borderRadius: '4px',
                  width: '100%',
                  textAlign: 'center'
                }}>
                  Aguardando jogadores...
                </div>
              )}
            </div>
          </div>
        </aside>

        {editingCover && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: '#0f172a',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '500px',
              width: '90%',
              border: '2px solid rgba(168, 85, 247, 0.3)'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: '24px'
              }}>
                Editar Capa da Campanha
              </h2>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'rgba(168, 85, 247, 0.1)',
                  border: '2px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                  marginBottom: '24px',
                  cursor: 'pointer'
                }}
              />

              {selectedFile && (
                <div style={{
                  marginBottom: '24px',
                  padding: '12px',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '8px',
                  color: '#cbd5e1',
                  fontSize: '14px'
                }}>
                  Arquivo selecionado: {selectedFile?.name}
                </div>
              )}

              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                <button
                  onClick={() => {
                    setEditingCover(false);
                    setSelectedFile(null);
                  }}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    backgroundColor: 'transparent',
                    border: '2px solid rgba(148, 163, 184, 0.3)',
                    color: '#cbd5e1',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(148, 163, 184, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleUploadCover}
                  disabled={!selectedFile || uploadingCover}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    backgroundColor: selectedFile ? '#a855f7' : 'rgba(168, 85, 247, 0.5)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '8px',
                    cursor: selectedFile ? 'pointer' : 'not-allowed',
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                    opacity: uploadingCover ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (selectedFile && !uploadingCover) {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#9333ea';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedFile && !uploadingCover) {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#a855f7';
                    }
                  }}
                >
                  {uploadingCover ? 'Enviando...' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}

export default Dashboard;