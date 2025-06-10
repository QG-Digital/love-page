// Texto completo da mensagem
const fullMessage = `Hoje é Dia dos Namorados, mas a verdade é que desde o dia em que você entrou na minha vida, todos os dias se tornaram especiais. 💘

Quase 6 anos juntos... Parece que foi ontem que tudo começou lá no Badoo (quem diria que um app ia me dar o melhor presente do mundo?). A nossa primeira conversa, as risadas, aquele friozinho na barriga de marcar o primeiro encontro... E aí veio o momento que mudou tudo: o dia em que te vi pela primeira vez no terminal central. Eu lembro do teu sorriso, do teu jeito, e como tudo pareceu se encaixar de um jeito leve e mágico.

Nosso primeiro rolê no BK pode até parecer simples pra quem vê de fora, mas pra mim foi o início da nossa história — real, sincera, cheia de carinho, parceria e amor de verdade. E desde aquele dia, cada memória que criamos juntos só fortalece mais ainda o que sinto por você.

A gente cresceu, enfrentou muita coisa, riu, chorou, brigou, fez as pazes, e aqui estamos. Mais unidos do que nunca. Você é minha base, meu porto seguro, minha melhor amiga, minha parceira de vida. Com você, tudo faz mais sentido.

Carol, te agradecer por estar ao meu lado é pouco. Eu quero continuar escrevendo nossa história por muitos e muitos anos. Quero novos encontros, novos rolês (com ou sem BK 😆), viagens, planos, conquistas… E mesmo nas fases difíceis, sei que com você ao meu lado, tudo fica mais leve.

Te amo muito. Obrigado por ser essa mulher incrível, carinhosa, e por transformar minha vida com a tua presença. Você é o meu presente todos os dias. 🌹

Feliz Dia dos Namorados, meu amor 💕`;

let currentSection = 0;
const sections = ['heart-section', 'message-section', 'carousel-section', 'final-section'];

// Função para inicializar a música
function initializeMusic() {
    const music = document.getElementById('background-music');
    music.volume = 0.5; // 50% do volume
    
    // Tenta tocar automaticamente
    music.play().catch(error => {
        console.log('Autoplay bloqueado. A música será iniciada na primeira interação do usuário.');
        
        // Adiciona listener para iniciar música na primeira interação
        document.addEventListener('click', function startMusic() {
            music.play();
            document.removeEventListener('click', startMusic);
        }, { once: true });
    });
}

// Função para trocar seções
function switchToSection(sectionIndex) {
    // Remove active de todas as seções
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Adiciona active na seção atual
    document.getElementById(sections[sectionIndex]).classList.add('active');
    currentSection = sectionIndex;
}

// Função de máquina de escrever
function typeWriter(element, text, speed = 50) {
    return new Promise((resolve) => {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Remove o cursor piscante
                element.style.borderRight = 'none';
                resolve();
            }
        }
        
        type();
    });
}

// Função para criar explosão de corações
function createHeartsExplosion() {
    const explosionContainer = document.getElementById('hearts-explosion');
    const heartsCount = 30;
    
    for (let i = 0; i < heartsCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = '❤️';
        
        // Posição aleatória
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        
        // Direção aleatória
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

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa a música
    initializeMusic();
    
    // Começa com o coração pulsando
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
    
    // Configura o botão do carrossel
    const speedButton = document.getElementById('speed-button');
    const carousel = document.getElementById('photo-carousel');
    
    speedButton.addEventListener('click', function() {
        // Desabilita o botão
        speedButton.disabled = true;
        speedButton.style.opacity = '0.5';
        
        // Acelera o carrossel
        carousel.classList.add('fast-rotation');
        
        // Após 5 segundos, explode em corações e vai para a seção final
        setTimeout(() => {
            createHeartsExplosion();
            
            // Espera um pouco para a explosão e depois vai para a seção final
            setTimeout(() => {
                switchToSection(3);
            }, 1500);
        }, 5000);
    });
});

// Adiciona navegação por teclado (opcional)
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' && currentSection < sections.length - 1) {
        switchToSection(currentSection + 1);
    } else if (e.key === 'ArrowLeft' && currentSection > 0) {
        switchToSection(currentSection - 1);
    }
});

// Função para garantir que a música continue tocando
document.addEventListener('visibilitychange', function() {
    const music = document.getElementById('background-music');
    if (!document.hidden && music.paused) {
        music.play().catch(console.log);
    }
});