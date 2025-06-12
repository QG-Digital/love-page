// ===== CONFIGURAÇÕES INICIAIS =====
const fullMessage = `Hoje é Dia dos Namorados, mas a verdade é que desde o dia em que você entrou na minha vida, todos os dias se tornaram especiais. 💘

Quase 6 anos juntos... Parece que foi ontem que tudo começou lá no Badoo (quem diria que um app ia me dar o melhor presente do mundo?). A nossa primeira conversa, as risadas, aquele friozinho na barriga de marcar o primeiro encontro... E aí veio o momento que mudou tudo: o dia em que te vi pela primeira vez no terminal central. Eu lembro do teu sorriso, do teu jeito, e como tudo pareceu se encaixar de um jeito leve e mágico.

Nosso primeiro rolê no BK pode até parecer simples pra quem vê de fora, mas pra mim foi o início da nossa história — real, sincera, cheia de carinho, parceria e amor de verdade. E desde aquele dia, cada memória que criamos juntos só fortalece mais ainda o que sinto por você.

A gente cresceu, enfrentou muita coisa, riu, chorou, brigou, fez as pazes, e aqui estamos. Mais unidos do que nunca. Você é minha base, meu porto seguro, minha melhor amiga, minha parceira de vida. Com você, tudo faz mais sentido.

Quero, te agradecer por estar ao meu lado é pouco. Eu quero continuar escrevendo nossa história por muitos e muitos anos. Quero novos encontros, novos rolês (com ou sem BK 😆), viagens, planos, conquistas… E mesmo nas fases difíceis, sei que com você ao meu lado, tudo fica mais leve.

Te amo muito. Obrigado por ser essa mulher incrível, carinhosa, e por transformar minha vida com a tua presença. Você é o meu presente todos os dias. 🌹

Feliz Dia dos Namorados, meu amor 💕`;

let currentSection = 0;
const sections = ['heart-section', 'message-section', 'carousel-section', 'final-section'];

// ===== DETECÇÃO DE DISPOSITIVO MÓVEL =====
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
}

// ===== FUNÇÃO PARA CRIAR ESTRELAS CAINDO =====
function createFallingStars() {
    const starsContainer = document.getElementById('falling-stars');
    if (!starsContainer) return;

    function createStar() {
        const star = document.createElement('div');
        star.className = 'falling-star';
        star.innerHTML = ['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)];
        
        // Posição inicial aleatória no topo
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = '-50px';
        
        // Tamanho aleatório
        star.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
        
        // Duração da animação aleatória
        const duration = 3 + Math.random() * 4;
        star.style.animationDuration = duration + 's';
        
        // Movimento horizontal aleatório
        const drift = (Math.random() - 0.5) * 100;
        star.style.setProperty('--drift', drift + 'px');
        
        starsContainer.appendChild(star);
        
        // Remove a estrela após a animação
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, duration * 1000);
    }

    // Cria estrelas continuamente
    setInterval(createStar, isMobileDevice() ? 800 : 500);
}

// ===== FUNÇÕES DE CONTROLE DE MÚSICA =====
function initializeMusic() {
    const music = document.getElementById('background-music');
    if (!music) return;
    
    // Configura o áudio para pré-carregar
    music.preload = 'auto';
    music.volume = isMobileDevice() ? 0.2 : 0.3;
    
    const heartButton = document.getElementById('heart-button');
    if (heartButton) {
        heartButton.addEventListener('click', function(e) {
            // Primeiro inicia a música
            const playPromise = music.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Mostra um aviso se não conseguir tocar
                    heartButton.textContent = "Clique novamente para ativar o som";
                    heartButton.style.fontSize = '1rem';
                    heartButton.onclick = function() {
                        music.play();
                        startMainSequence();
                    };
                }).then(() => {
                    // Continua com a sequência se a música tocar
                    createIntenseHeartRain();
                    heartButton.style.transform = 'scale(1.3)';
                    setTimeout(() => {
                        heartButton.style.transform = 'scale(1)';
                    }, 300);
                    
                    setTimeout(() => {
                        startMainSequence();
                    }, 2000);
                    
                    heartButton.style.pointerEvents = 'none';
                    heartButton.style.opacity = '0.7';
        });
    }
}

function ensureMusicPlaying() {
    const music = document.getElementById('background-music');
    if (music && !document.hidden && music.paused) {
        music.play().catch(console.log);
    }
}

// ===== FUNÇÕES DE NAVEGAÇÃO =====
function switchToSection(sectionIndex) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sections[sectionIndex]);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionIndex;
        
        // Força o reflow para melhor performance em mobile
        if (isMobileDevice()) {
            targetSection.offsetHeight;
        }
    }
}

// ===== FUNÇÃO DE MÁQUINA DE ESCREVER OTIMIZADA PARA MOBILE =====
function typeWriter(element, text, speed = 50) {
    return new Promise((resolve) => {
        if (!element) {
            resolve();
            return;
        }
        
        let i = 0;
        element.innerHTML = '';
        
        // Velocidade ajustada para mobile
        const adjustedSpeed = isMobileDevice() ? Math.max(speed * 0.4, 15) : speed;
       
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                
                // Auto-scroll para acompanhar o texto
                const wrapper = element.closest('.typewriter-wrapper');
                if (wrapper) {
                    wrapper.scrollTop = wrapper.scrollHeight;
                }
                
                setTimeout(type, adjustedSpeed);
            } else {
                // Remove o cursor piscante após terminar
                element.style.borderRight = 'none';
                resolve();
            }
        }
        
        type();
    });
}

// ===== FUNÇÃO DE CHUVA INTENSA DE CORAÇÕES =====
function createIntenseHeartRain() {
    const explosion = document.createElement('div');
    explosion.className = 'heart-rain-container';
    document.body.appendChild(explosion);

    const heartCount = isMobileDevice() ? 150 : 200;
    const heartTypes = ['❤️', '💖', '💗', '💓', '💘', '💕', '💞', '💝'];
    const colors = ['#ff6b6b', '#ff8e8e', '#ffb3b3', '#ffd8d8', '#e74c3c', '#ff9999', '#ffcccc', '#ff1744'];

    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-rain-particle';
            heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
            
            // Posição inicial aleatória no topo
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.top = `-50px`;
            
            // Configurações de animação
            const duration = 2 + Math.random() * 3;
            heart.style.animationDuration = `${duration}s`;
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.fontSize = `${1 + Math.random() * 2}rem`;
            
            // Movimento horizontal aleatório
            const moveX = (Math.random() - 0.5) * 300;
            heart.style.setProperty('--moveX', `${moveX}px`);
            
            // Rotação aleatória
            heart.style.setProperty('--rotate', `${Math.random() * 720}deg`);
            
            explosion.appendChild(heart);

            // Remove após a animação
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, duration * 1000);
        }, i * 20);
    }

    setTimeout(() => {
        if (explosion.parentNode) {
            explosion.parentNode.removeChild(explosion);
        }
    }, 8000);
}

// ===== FUNÇÃO DE EXPLOSÃO DE CORAÇÕES OTIMIZADA =====
function createHeartsExplosion() {
    const explosionContainer = document.getElementById('hearts-explosion');
    if (!explosionContainer) return;
    
    // Menos corações em dispositivos móveis para melhor performance
    const heartsCount = isMobileDevice() ? 20 : 30;
    
    for (let i = 0; i < heartsCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = '❤️';
        
        // Posição aleatória
        heart.style.left = Math.random() * 150 + '%';
        heart.style.top = Math.random() * 150 + '%';
        
        // Direção aleatória para a animação
        const randomX = (Math.random() - 0.5) * (isMobileDevice() ? 600 : 1000);
        const randomY = (Math.random() - 0.5) * (isMobileDevice() ? 600 : 1000);
        heart.style.setProperty('--randomX', randomX + 'px');
        heart.style.setProperty('--randomY', randomY + 'px');
        
        explosionContainer.appendChild(heart);
        
        // Remove o coração após a animação
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 3000);
    }
}

// ===== SEQUÊNCIA PRINCIPAL DA PÁGINA =====
async function startMainSequence() {
    // Tempos ajustados para mobile
    const heartDuration = isMobileDevice() ? 600 : 1000;
    const writingDelay = isMobileDevice() ? 800 : 1000;
    const carouselDelay = isMobileDevice() ? 2500 : 3000;
    
    // Após alguns segundos, vai para a mensagem
    setTimeout(async () => {
        switchToSection(1);
        
        // Aguarda um pouco antes de começar a escrever
        setTimeout(async () => {
            const typewriterElement = document.getElementById('typewriter-text');
            await typeWriter(typewriterElement, fullMessage, 100);
            
            // Após terminar de escrever, espera e vai para o carrossel
            setTimeout(() => {
                switchToSection(2);
            }, carouselDelay);
        }, writingDelay);
    }, heartDuration);
}

// ===== CONFIGURAÇÃO DO CARROSSEL OTIMIZADA =====
function setupCarousel() {
    const speedButton = document.getElementById('speed-button');
    const carousel = document.getElementById('photo-carousel');
    
    if (!speedButton || !carousel) return;
    
    // Configura a posição inicial de cada slide
    const slides = document.querySelectorAll('.photo-slide');
    slides.forEach((slide, index) => {
        slide.style.setProperty('--i', index);
    });
    
    // Função para lidar com o clique/toque
    const handleSpeedButton = function(e) {
        e.preventDefault();
        
        // Adiciona efeito de pulso
        speedButton.classList.add('pulse');
        
        // Desabilita o botão
        speedButton.disabled = true;
        speedButton.style.opacity = '0.8';
        
        // Acelera o carrossel
        carousel.style.animation = 'fastRotate 0.5s linear infinite';
        
        // Duração ajustada para mobile
        const explosionDelay = isMobileDevice() ? 4000 : 5000;
        const finalSectionDelay = isMobileDevice() ? 1200 : 1500;
        
        // Após alguns segundos, explode em corações e vai para a seção final
        setTimeout(() => {
            createHeartsExplosion();
            
            // Remove o efeito de pulso
            speedButton.classList.remove('pulse');
            
            // Espera um pouco para a explosão e depois vai para a seção final
            setTimeout(() => {
                switchToSection(3);
            }, finalSectionDelay);
        }, explosionDelay);
    };
    
    speedButton.addEventListener('click', handleSpeedButton);
    speedButton.addEventListener('touchstart', handleSpeedButton, { passive: false });
}

// ===== NAVEGAÇÃO POR TECLADO E TOUCH =====
function setupNavigation() {
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' && currentSection < sections.length - 1) {
            switchToSection(currentSection + 1);
        } else if (e.key === 'ArrowLeft' && currentSection > 0) {
            switchToSection(currentSection - 1);
        }
    });
    
    // Navegação por swipe em dispositivos móveis
    if (isMobileDevice()) {
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Verifica se é um swipe horizontal
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0 && currentSection < sections.length - 1) {
                    // Swipe para esquerda - próxima seção
                    switchToSection(currentSection + 1);
                } else if (diffX < 0 && currentSection > 0) {
                    // Swipe para direita - seção anterior
                    switchToSection(currentSection - 1);
                }
            }
            
            startX = 0;
            startY = 0;
        }, { passive: true });
    }
}

// ===== CONTROLE DE MÚSICA QUANDO O VÍDEO É REPRODUZIDO =====
function setupVideoControls() {
    const video = document.querySelector('.video-container video');
    const music = document.getElementById('background-music');
    
    if (!video || !music) return;
    
    // Pausa a música quando o vídeo começa
    video.addEventListener('play', () => {
        music.pause();
    });
    
    // Retoma a música quando o vídeo pausa ou termina
    video.addEventListener('pause', () => {
        music.play().catch(console.log);
    });
    
    video.addEventListener('ended', () => {
        music.play().catch(console.log);
    });
}

// ===== OTIMIZAÇÕES DE PERFORMANCE PARA MOBILE =====
function optimizeForMobile() {
    if (!isMobileDevice()) return;
    
    // Reduz a qualidade das animações em dispositivos mais fracos
    const isLowEndDevice = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;
    
    if (isLowEndDevice) {
        document.documentElement.style.setProperty('--animation-duration', '0.5s');
        
        // Simplifica algumas animações
        const carousel = document.getElementById('photo-carousel');
        if (carousel) {
            carousel.style.animationDuration = '30s';
        }
    }
    
    // Otimiza o scroll
    document.addEventListener('touchmove', function(e) {
        if (e.target.closest('.typewriter-wrapper')) {
            // Permite scroll apenas no container da mensagem
            return;
        }
        e.preventDefault();
    }, { passive: false });
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    // Otimizações para mobile
    optimizeForMobile();
    
    // Inicia as estrelas caindo
    createFallingStars();
    
    // Inicializa a música
    initializeMusic();
    
    // Configura o carrossel
    setupCarousel();
    
    // Configura navegação
    setupNavigation();
	
	setupVideoControls();
    
    // Força o primeiro render
    if (isMobileDevice()) {
        requestAnimationFrame(() => {
            document.body.offsetHeight;
        });
    }
});

// ===== CONTROLE DE VISIBILIDADE DA PÁGINA =====
document.addEventListener('visibilitychange', ensureMusicPlaying);

// ===== CONTROLE DE ORIENTAÇÃO PARA MOBILE =====
if (isMobileDevice()) {
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Força um reflow após mudança de orientação
            document.body.offsetHeight;
            
            // Reajusta a seção atual
            const currentSectionElement = document.getElementById(sections[currentSection]);
            if (currentSectionElement) {
                currentSectionElement.classList.remove('active');
                setTimeout(() => {
                    currentSectionElement.classList.add('active');
                }, 50);
            }
        }, 100);
    });
}

// ===== PREVENÇÃO DE ZOOM ACIDENTAL =====
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

document.addEventListener('gesturechange', function(e) {
    e.preventDefault();
});

document.addEventListener('gestureend', function(e) {
    e.preventDefault();
});