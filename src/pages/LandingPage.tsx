function LandingPage() {
  return (
    <body style={{ margin: 0, padding: 0 }}>
    <div style={{
      background: 'linear-gradient(90deg, #05000cff 0%,#0a0f1b 100%)',
      color: '#fff',
      fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
      overflow: 'hidden'
    }}>
      <header style={{
        padding: '20px 40px',
        display: 'flex',
        height: '5vh',
        width: '95vw',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
        position: 'fixed',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(100px)',}}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a855f7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="../assets/images/LOGO-dragao.png" alt="" />
                BitDragon
            </div>
        </div>
        <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="#" style={{ 
            color: '#cbd5e1', 
            textDecoration: 'none', 
            fontSize: '14px',
            transition: 'color 0.3s'
          }}
          onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#a855f7'}
          onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#cbd5e1'}>Recursos</a>
          <a href="#" style={{ 
            color: '#cbd5e1', 
            textDecoration: 'none', 
            fontSize: '14px',
            transition: 'color 0.3s'
          }}
          onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#a855f7'}
          onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#cbd5e1'}>Como Funciona</a>
          <a href="#" style={{ 
            color: '#cbd5e1', 
            textDecoration: 'none', 
            fontSize: '14px',
            transition: 'color 0.3s'
          }}
          onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#a855f7'}
          onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#cbd5e1'}>Lore</a>
          <a href="#" style={{ 
            color: '#cbd5e1', 
            textDecoration: 'none', 
            fontSize: '14px',
            transition: 'color 0.3s'
          }}
          onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#a855f7'}
          onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#cbd5e1'}>Comunidade</a>
          <a href="/login" style={{
            backgroundColor: '#a855f7',
            color: '#fff',
            padding: '10px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#9333ea';
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#a855f7';
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
          }}>Começar Aventura</a>
        </nav>
      </header>

      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: 'linear-gradient(190deg, rgba(132, 0, 255, 0.15) 0%, rgba(88, 28, 135, 0.1) 100%)',
        padding: '60px 40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>
        
        <div style={{ 
          fontSize: '14px', 
          color: '#a855f7', 
          marginBottom: '5px',
          fontWeight: 'bold',
          letterSpacing: '1px',
          border: '0.5px solid rgba(173, 97, 245, 1)',
         
          borderRadius: '20px'
        }}>
            <div style={{ padding: '8px 12px', backgroundColor: 'rgba(168, 85, 247, 0.1)' }}>
                ★ BETA ABERTO
            </div>
        </div>
        <h1 style={{
          fontSize: '95px',
          fontWeight: 'bolder',
          marginTop: '15px',
          marginBottom: '20px',
          lineHeight: '1.1', padding: '8px 12px',
          maxWidth: '100%',
          color: '#fff'
        }}>
          Forje Suas <span style={{ color: '#9333ea' }}>Lendas</span> Juntos
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#cbd5e1',
          maxWidth: '650px',
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          O santuário digital definitivo para Mestres de Jogo e jogadores. Organize campanhas, construa personagens e rastreie missões em um único espaço épico.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
          <a href="/login" style={{
            backgroundColor: '#a855f7',
            color: '#fff',
            padding: '14px 40px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#9333ea';
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#a855f7';
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
          }}>
            Comece Sua Aventura →
          </a>
          <a href="#" style={{
            backgroundColor: 'transparent',
            color: '#cbd5e1',
            padding: '14px 40px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            border: '2px solid rgba(168, 85, 247, 0.5)',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = '#a855f7';
            (e.currentTarget as HTMLAnchorElement).style.color = '#a855f7';
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(168, 85, 247, 0.1)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(168, 85, 247, 0.5)';
            (e.currentTarget as HTMLAnchorElement).style.color = '#cbd5e1';
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
          }}>
            Retomar Jornada
          </a>
        </div>
      </section>

      <section style={{
        padding: '100px 40px',
        background: ' rgba(88, 28, 135, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto'
 }}>
          <h2 style={{
            fontSize: '52px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '20px',
            backgroundClip: 'text',
          }}>
            Domine Seu Multiverso
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#cbd5e1',
            marginBottom: '60px',
            fontSize: '18px'
          }}>
            Tudo que você precisa para executar campanhas lendárias e criar heróis inesquecíveis.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {[
              {
                icon: '🏛️',
                title: 'Gerenciamento de Campanhas',
                description: 'Domine seu conhecimento e NPCs com ferramentas de construção de mundo centralizadas que mantêm tudo sincronizado.'
              },
              {
                icon: '⚔️',
                title: 'Construtor de Personagens',
                description: 'Ajude os jogadores a criar personagens únicos com estatísticas automatizadas, fichas digitais e rastreamento de inventário personalizado.'
              },
              {
                icon: '📜',
                title: 'Rastreamento de Missões',
                description: 'Nunca perca de vista o objetivo com logs dinâmicos de missões que se atualizam para toda sua equipe.'
              },
              {
                icon: '🗺️',
                title: 'Mapa Interativo',
                description: 'Visualize a jornada com integração de mapa tático de alta fidelidade e neblina de guerra dinâmica.'
              }
            ].map((feature, idx) => (
              <div key={idx} style={{
                backgroundColor: 'rgba(59, 130, 246, 0.08)',
                border: '2px solid rgba(59, 130, 246, 0.2)',
                padding: '40px 30px',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.backgroundColor = 'rgba(59, 130, 246, 0.12)';
                el.style.borderColor = '#a855f7';
                el.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.backgroundColor = 'rgba(59, 130, 246, 0.08)';
                el.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                el.style.transform = 'translateY(0)';
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#fff' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{
        padding: '100px 40px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '52px',
            fontWeight: 'bold',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)',
            backgroundClip: 'text',
          }}>
            Por Que Escolher BitDragon?
          </h2>
          <p style={{
            color: '#cbd5e1',
            marginBottom: '60px',
            fontSize: '18px'
          }}>
            O conjunto de ferramentas mais imersivo para sua mesa digital.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center'
          }}>
            <div>
              {[
                {
                  icon: '🌍',
                  title: 'Prepare Seu Mundo',
                  description: 'Construa ambientes profundos, NPCs complexos e tradições secretas em minutos com nossa interface intuitiva projetada para narradores.'
                },
                {
                  icon: '👥',
                  title: 'Reúna Seu Grupo',
                  description: 'Convide jogadores para seu portal de campanha. As fichas de personagem sincronizam instantaneamente em todos os dispositivos, garantindo que todos permaneçam focados no jogo.'
                },
                {
                  icon: '🎲',
                  title: 'Comece a Saga',
                  description: 'Inicie sua sessão com rastreamento de iniciativa integrado, roladores de dados e paisagens sonoras ambiente que reagem ao seu jogo.'
                }
              ].map((item, idx) => (
                <div key={idx} style={{ marginBottom: '40px', display: 'flex', gap: '20px' }}>
                  <div style={{ fontSize: '32px', minWidth: '50px' }}>{item.icon}</div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              backgroundColor: 'rgba(59, 130, 246, 0.12)',
              border: '2px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '16px',
              padding: '50px 40px',
              textAlign: 'center'
            }}>
              <div style={{
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderRadius: '12px',
                padding: '60px 40px',
                marginBottom: '20px',
                fontSize: '80px'
              }}>
                🗺️
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '16px', fontWeight: '600' }}>
                Exploração tática em tempo real
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{
        background: 'linear-gradient(190deg, rgba(132, 0, 255, 0.69) 0%, rgba(89, 28, 135, 0.64) 100%)',
        padding: '120px 40px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '52px',
          fontWeight: 'bold',
          marginBottom: '30px',
          color: '#fff'
        }}>
          Pronto para Começar Sua Missão?
        </h2>
        <a href="/login" style={{
          backgroundColor: '#fff',
          color: '#a855f7',
          padding: '16px 50px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '18px',
          cursor: 'pointer',
          display: 'inline-block',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.08)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.4)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
        }}>
          Forje Sua Lenda Agora
        </a>
      </section>

      <footer style={{
        backgroundColor: '#0a0f1b',
        padding: '60px 40px 20px',
        borderTop: '1px solid rgba(59, 130, 246, 0.2)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px',
          marginBottom: '40px'
        }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#a855f7', marginBottom: '15px' }}>
              🎲 BitDragon
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>
              Capacitando Mestres de Jogo e jogadores desde a Terceira Era. Construído por jogadores, para jogadores.
            </p>
          </div>
          <div>
            <h3 style={{ fontWeight: 'bold', marginBottom: '15px', color: '#fff' }}>PRODUTO</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Recursos', 'Roadmap', 'Preços', 'Changelog'].map((link, idx) => (
                <a key={idx} href="#" style={{ 
                  color: '#cbd5e1', 
                  textDecoration: 'none', 
                  fontSize: '15px',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#3b82f6'}
                onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#cbd5e1'}>
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ fontWeight: 'bold', marginBottom: '15px', color: '#fff' }}>RECURSOS</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Documentação de Lore', 'Discord Comunidade', 'Referência API'].map((link, idx) => (
                <a key={idx} href="#" style={{ 
                  color: '#cbd5e1', 
                  textDecoration: 'none', 
                  fontSize: '15px',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#3b82f6'}
                onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#cbd5e1'}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(59, 130, 246, 0.2)',
          paddingTop: '30px',
          textAlign: 'center',
          color: '#64748b',
          fontSize: '14px'
        }}>
          <p>© 2026 BitDragon. Que você role críticos sucesso.</p>
        </div>
      </footer>
    </div>
    </body>
  );
}

export default LandingPage;
