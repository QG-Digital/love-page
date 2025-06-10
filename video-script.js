// Elementos DOM
const backBtn = document.getElementById('backBtn');
const loveVideo = document.getElementById('loveVideo');

// Função para voltar à página principal
function goBack() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// Função para criar partículas flutuantes dinâmicas
function createDynamicSparkles() {
    const particlesContainer = document.querySelector('.floating-particles');
    const sparkleEmojis = ['✨', '⭐', '💫', '🌟'];
    
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = Math.random() * 1.5 + 1 + 'rem';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = '100%';
        sparkle.style.opacity = Math.random() * 0.5 + 0.5;
        sparkle.style.animation = `floatSparkles ${Math.random() * 4 + 8}s linear forwards`;
        sparkle.style.pointerEvents = 'none';
        
        particlesContainer.appendChild(sparkle);
        
        // Remove elemento após animação
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 12000);
    }, 1000);
}

// Função para adicionar efeitos ao vídeo
function setupVideoEffects() {
    // Adicionar efeito de brilho quando o vídeo inicia
    loveVideo.addEventListener('play', () => {
        document.querySelector('.video-frame').style.boxShadow = `
            0 0 60px rgba(255, 105, 180, 0.8),
            0 0 100px rgba(139, 92, 246, 0.5),
            0 0 140px rgba(245, 158, 11, 0.3)
        `;
    });
    
    // Remover efeito quando pausa
    loveVideo.addEventListener('pause', () => {
        document.querySelector('.video-frame').style.boxShadow = `
            0 0 40px rgba(255, 105, 180, 0.6),
            0 0 80px rgba(139, 92, 246, 0.3)
        `;
    });
    
    // Efeito especial quando o vídeo termina
    loveVideo.addEventListener('ended', () => {
        const videoFrame = document.querySelector('.video-frame');
        videoFrame.style.animation = 'videoEndGlow 2s ease-in-out infinite alternate';
        
        // Mostrar mensagem especial
        const endMessage = document.createElement('div');
        endMessage.innerHTML = '<h3 style="color: #ff69b4; text-shadow: 0 0 20px rgba(255, 105, 180, 0.8);">Te amo muito! 💕</h3>';
        endMessage.style.textAlign = 'center';
        endMessage.style.marginTop = '20px';
        endMessage.style.animation = 'fadeInScale 1s ease-out';
        
        document.querySelector('.video-wrapper').appendChild(endMessage);
    });
}

// Função para adicionar efeito hover no botão voltar
function setupBackButtonEffects() {
    backBtn.addEventListener('mouseenter', () => {
        // Criar efeito de ondas
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.top = '50%';
        ripple.style.left = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        backBtn.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    backBtn.addEventListener('click', goBack);
    createDynamicSparkles();
    setupVideoEffects();
    setupBackButtonEffects();
    
    // Listener para tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            goBack();
        }
    });
    
    // Adicionar entrada suave
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// CSS adicional via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
    
    @keyframes videoEndGlow {
        0% {
            box-shadow: 
                0 0 40px rgba(255, 105, 180, 0.6),
                0 0 80px rgba(139, 92, 246, 0.3);
        }
        100% {
            box-shadow: 
                0 0 80px rgba(255, 105, 180, 1),
                0 0 120px rgba(139, 92, 246, 0.7),
                0 0 160px rgba(245, 158, 11, 0.5);
        }
    }
    
    @keyframes fadeInScale {
        0% {
            opacity: 0;
            transform: scale(0.5);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);