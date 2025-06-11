// ===== CONFIGURAÇÕES INICIAIS =====
const fullMessage = `Hoje é Dia dos Namorados, mas a verdade é que desde o dia em que você entrou na minha vida, todos os dias se tornaram especiais. 💘

Quase 6 anos juntos... Parece que foi ontem que tudo começou lá no Badoo (quem diria que um app ia me dar o melhor presente do mundo?). A nossa primeira conversa, as risadas, aquele friozinho na barriga de marcar o primeiro encontro... E aí veio o momento que mudou tudo: o dia em que te vi pela primeira vez no terminal central. Eu lembro do teu sorriso, do teu jeito, e como tudo pareceu se encaixar de um jeito leve e mágico.

Nosso primeiro rolê no BK pode até parecer simples pra quem vê de fora, mas pra mim foi o início da nossa história — real, sincera, cheia de carinho, parceria e amor de verdade. E desde aquele dia, cada memória que criamos juntos só fortalece mais ainda o que sinto por você.

A gente cresceu, enfrentou muita coisa, riu, chorou, brigou, fez as pazes, e aqui estamos. Mais unidos do que nunca. Você é minha base, meu porto seguro, minha melhor amiga, minha parceira de vida. Com você, tudo faz mais sentido.

Carol, te agradecer por estar ao meu lado é pouco. Eu quero continuar escrevendo nossa história por muitos e muitos anos. Quero novos encontros, novos rolês (com ou sem BK 😆), viagens, planos, conquistas… E mesmo nas fases difíceis, sei que com você ao meu lado, tudo fica mais leve.

Te amo muito. Obrigado por ser essa mulher incrível, carinhosa, e por transformar minha vida com a tua presença. Você é o meu presente todos os dias. 🌹

Feliz Dia dos Namorados, meu amor 💕`;

let currentSection = 0;
const sections = ['heart-section', 'message-section', 'carousel-section', 'final-section'];

// ===== FUNÇÕES DE CONTROLE DE MÚSICA =====
function initializeMusic() {
    const music = document.getElementById('background-music');
    if (!music) return;
    
    music.volume = 0.3;
    
    music.play().catch(error => {
        console.log('Autoplay bloqueado. A música será iniciada na primeira interação do usuário.');
        
        document.addEventListener('click', function startMusic() {
            music.play().catch(console.log);
            document.removeEventListener('click', startMusic);
        }, { once: true });
    });
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
    }
}

// ===== FUNÇÃO DE MÁQUINA DE ESCREVER =====
function typeWriter(element, text, speed = 1000) {
    return new Promise((resolve) => {
        if (!element) {
            resolve();
            return;
        }
        
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                
                // Auto-scroll para acompanhar o texto
                const wrapper = element.closest('.typewriter-wrapper');
                if (wrapper) {
                    wrapper.scrollTop = wrapper.scrollHeight;
                }
                
                setTimeout(type, speed);
            } else {
                // Remove o cursor piscante após terminar
                element.style.borderRight = 'none';
                resolve();
            }
        }
        
        type();
    });
}

// ===== FUNÇÃO DE EXPLOSÃO DE CORAÇÕES =====
function createHeartsExplosion() {
    const explosionContainer = document.getElementById('hearts-explosion');
    if (!explosionContainer) return;
    
    const heartsCount = 30;
    
    for (let i = 0; i < heartsCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = '❤️';
        
        // Posição aleatória
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        
        // Direção aleatória para a animação
        const randomX = (Math.random() - 0.5) * 1000;
        const randomY = (Math.random() - 0.5) * 1000;
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
    // Inicia com o coração pulsando
    switchToSection(0);
    
    // Após 3 segundos, vai para a mensagem
    setTimeout(async () => {
        switchToSection(1);
        
        // Aguarda um pouco antes de começar a escrever
        setTimeout(async () => {
            const typewriterElement = document.getElementById('typewriter-text');
            await typeWriter(typewriterElement, fullMessage, 30);
            
            // Após terminar de escrever, espera 3 segundos e vai para o carrossel
            setTimeout(() => {
                switchToSection(2);
            }, 3000);
        }, 1000);
    }, 3000);
}

// ===== CONFIGURAÇÃO DO CARROSSEL =====
function setupCarousel() {
    const speedButton = document.getElementById('speed-button');
    const carousel = document.getElementById('photo-carousel');
    
    if (!speedButton || !carousel) return;
    
    // Configura a posição inicial de cada slide
    const slides = document.querySelectorAll('.photo-slide');
    slides.forEach((slide, index) => {
        slide.style.setProperty('--i', index);
    });
    
    speedButton.addEventListener('click', function() {
        // Adiciona efeito de pulso
        speedButton.classList.add('pulse');
        
        // Desabilita o botão
        speedButton.disabled = true;
        speedButton.style.opacity = '0.8';
        
        // Acelera o carrossel
        carousel.style.animation = 'fastRotate 0.5s linear infinite';
        
        // Após 5 segundos, explode em corações e vai para a seção final
        setTimeout(() => {
            createHeartsExplosion();
            
            // Remove o efeito de pulso
            speedButton.classList.remove('pulse');
            
            // Espera um pouco para a explosão e depois vai para a seção final
            setTimeout(() => {
                switchToSection(3);
            }, 1500);
        }, 5000);
    });
}

// ===== NAVEGAÇÃO POR TECLADO =====
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' && currentSection < sections.length - 1) {
            switchToSection(currentSection + 1);
        } else if (e.key === 'ArrowLeft' && currentSection > 0) {
            switchToSection(currentSection - 1);
        }
    });
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa a música
    initializeMusic();
    
    // Configura o carrossel
    setupCarousel();
    
    // Configura navegação por teclado
    setupKeyboardNavigation();
    
    // Inicia a sequência principal
    startMainSequence();
});

// ===== CONTROLE DE VISIBILIDADE DA PÁGINA =====
document.addEventListener('visibilitychange', ensureMusicPlaying);