// Elementos DOM
const heartPhase = document.getElementById('heartPhase');
const carouselPhase = document.getElementById('carouselPhase');
const heartIcon = document.querySelector('.heart-icon');
const carouselTrack = document.getElementById('carouselTrack');
const accelerateBtn = document.getElementById('accelerateBtn');

// Array de imagens (substitua pelos caminhos das suas imagens)
const images = [
    'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1028723/pexels-photo-1028723.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1024979/pexels-photo-1024979.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1024976/pexels-photo-1024976.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1024981/pexels-photo-1024981.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1024982/pexels-photo-1024982.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1024984/pexels-photo-1024984.jpeg?auto=compress&cs=tinysrgb&w=800'
];

// Estado da aplicação
let isAccelerated = false;
let accelerationTimeout;

// Função para criar elementos de imagem do carrossel
function createCarouselImages() {
    // Duplicar as imagens para criar loop infinito suave
    const duplicatedImages = [...images, ...images];
    
    duplicatedImages.forEach(imageSrc => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Momento especial';
        img.className = 'carousel-image';
        img.loading = 'lazy';
        carouselTrack.appendChild(img);
    });
}

// Função para iniciar a fase do coração
function startHeartPhase() {
    // Coração bate por 3 segundos
    setTimeout(() => {
        // Após 3 segundos, inicia animação de explosão
        heartIcon.classList.remove('heartBeat');
        heartIcon.classList.add('exploding');
        
        // Após 1 segundo da explosão (4 segundos total), muda para carrossel
        setTimeout(() => {
            heartPhase.classList.add('hidden');
            carouselPhase.classList.remove('hidden');
            startCarouselPhase();
        }, 1000);
    }, 3000);
}

// Função para iniciar a fase do carrossel
function startCarouselPhase() {
    createCarouselImages();
    
    // Adicionar event listener ao botão
    accelerateBtn.addEventListener('click', accelerateCarousel);
}

// Função para acelerar o carrossel
function accelerateCarousel() {
    if (isAccelerated) return;
    
    isAccelerated = true;
    
    // Mudar para animação acelerada gradualmente
    carouselTrack.style.animation = 'acceleratedCarousel 5s forwards';
    
    // Mudar texto do botão
    accelerateBtn.innerHTML = '<span class="button-text">Acelerando...</span><span class="button-glow"></span>';
    accelerateBtn.disabled = true;
    accelerateBtn.style.opacity = '0.7';
    accelerateBtn.style.cursor = 'not-allowed';
    
    // Após 5 segundos de aceleração, vai para página do vídeo
    accelerationTimeout = setTimeout(() => {
        // Transição suave para página do vídeo
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            window.location.href = 'video.html';
        }, 500);
    }, 5000);
}

// Função para adicionar efeitos de partículas dinâmicas
function createDynamicParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 8 + 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = '#ff0000';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.boxShadow = `0 0 15px #ff0000, 0 0 30px #ff0000`;
        particle.style.animation = `floatParticles ${Math.random() * 4 + 6}s linear forwards`;
        particle.style.pointerEvents = 'none';
        
        particlesContainer.appendChild(particle);
        
        // Remove partícula após animação
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 10000);
    }, 500);
}

// Função para adicionar corações flutuantes dinâmicos
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    if (!heartsContainer) return;
    
    const heartEmojis = ['❤️', '💖', '💕', '💗'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 1.5 + 1.5 + 'rem';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100%';
        heart.style.opacity = '0.7';
        heart.style.animation = `floatHearts ${Math.random() * 4 + 8}s linear forwards`;
        heart.style.pointerEvents = 'none';
        
        heartsContainer.appendChild(heart);
        
        // Remove coração após animação
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 12000);
    }, 1200);
}

// Função para criar efeito de brilho no botão
function createButtonSparkle() {
    accelerateBtn.addEventListener('mouseenter', () => {
        if (!isAccelerated) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.top = '50%';
            sparkle.style.left = '50%';
            sparkle.style.transform = 'translate(-50%, -50%)';
            sparkle.style.width = '6px';
            sparkle.style.height = '6px';
            sparkle.style.background = '#fff';
            sparkle.style.borderRadius = '50%';
            sparkle.style.boxShadow = '0 0 15px #fff';
            sparkle.style.animation = 'sparkleEffect 0.8s ease-out forwards';
            sparkle.style.pointerEvents = 'none';
            
            accelerateBtn.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 800);
        }
    });
}

// Função para precarregar imagens
function preloadImages() {
    images.forEach(imageSrc => {
        const img = new Image();
        img.src = imageSrc;
    });
}

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    createDynamicParticles();
    createFloatingHearts();
    createButtonSparkle();
    startHeartPhase();
    
    // Adicionar listener para tecla ESC (voltar)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !heartPhase.classList.contains('hidden')) {
            location.reload();
        }
    });
});

// CSS adicional via JavaScript para animações específicas
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleEffect {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(12) rotate(180deg);
            opacity: 0;
        }
    }

    @keyframes slowCarousel {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-50%);
        }
    }

    @keyframes acceleratedCarousel {
        0% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0.1, 0.1, 0.1, 1);
        }
        20% {
            transform: translateY(-10%);
            animation-timing-function: cubic-bezier(0.2, 0.2, 0.2, 1);
        }
        40% {
            transform: translateY(-20%);
            animation-timing-function: cubic-bezier(0.3, 0.3, 0.3, 1);
        }
        60% {
            transform: translateY(-30%);
            animation-timing-function: cubic-bezier(0.4, 0.4, 0.4, 1);
        }
        80% {
            transform: translateY(-40%);
            animation-timing-function: cubic-bezier(0.6, 0.6, 0.6, 1);
        }
        100% {
            transform: translateY(-50%);
            animation-timing-function: cubic-bezier(0.8, 0.8, 0.8, 1);
        }
    }
`;
document.head.appendChild(style);