document.addEventListener("DOMContentLoaded", () => {
    // Definir tema escuro como padrão
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
    updateThemeIcon();
    
    // Ano atual no footer
    document.getElementById("year").textContent = new Date().getFullYear();
    
    // Smooth scroll para as âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Ativar link ativo no scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-item");
    
    function updateActiveLink() {
        let current = "";
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if (href === "#" + current) {
                link.classList.add("active");
            }
        });
    }
    
    // Observador de scroll
    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink(); // Ativar link inicial
    
    // Fake envio do formulário
    const form = document.getElementById("contact-form");
    const msg = document.getElementById("form-msg");
    
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            msg.textContent = "Mensagem enviada com sucesso!";
            form.reset();
            setTimeout(() => {
                msg.textContent = "";
            }, 5000);
        });
    }
    
    // Re-inicializar ícones do Lucide se necessário
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const printBtn = document.getElementById("printBtn");
    
    if (printBtn) {
        printBtn.addEventListener("click", () => {
            const caminho = "../templates/ruben/cv.pdf";
            // Criar link temporário
            const link = document.createElement("a");
            link.href = caminho;
            link.download = "cv.pdf"; // nome do arquivo que será baixado
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const element = document.getElementById("typing");
    const texts = ["Ruben Silva", "Apaixonado por Python", "Web Designer", "Programador Web"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const erasingSpeed = 60;
    const delayBetween = 1500; // tempo entre frases
    
    function type() {
        const current = texts[textIndex];
        
        if (!isDeleting) {
            element.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(type, delayBetween);
            } else {
                setTimeout(type, typingSpeed);
            }
        } else {
            element.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(type, erasingSpeed);
            }
        }
    }
    
    type();
});

// BOTÃO VOLTAR AO TOPO
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function () {
    scrollTopBtn.style.display = (window.scrollY > 200) ? "flex" : "none";
};

scrollTopBtn.onclick = () => window.scrollTo({
    top: 0,
    behavior: 'smooth'
});

// Envio do formulário via AJAX para Flask
const form = document.getElementById("contact-form");
const msg = document.getElementById("form-msg");

if (form) {
    form.addEventListener("submit", async e => {
        e.preventDefault(); // previne recarregar a página
        msg.textContent = "A enviar...";
        msg.style.color = "#3b82f6"; // azul temporário
        
        const formData = new FormData(form);
        
        try {
            const response = await fetch("/send_message", {
                method: "POST",
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                msg.textContent = result.message;
                msg.style.color = "#3b82f6"; // azul
                form.reset();
            } else {
                msg.textContent = result.message;
                msg.style.color = "red";
            }
        } catch (error) {
            msg.textContent = "Erro de conexão. Tente novamente.";
            msg.style.color = "red";
            console.error("Erro no envio do formulário:", error);
        }
        
        // Limpa a mensagem após 5 segundos
        setTimeout(() => {
            msg.textContent = "";
        }, 5000);
    });
}

// Melhorar alternância de tema
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Definir tema escuro como padrão (já feito no DOMContentLoaded)

themeToggle.addEventListener("click", () => {
    // Adicionar animação de transição
    body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    body.classList.toggle("light");
    const theme = body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", theme);
    updateThemeIcon();
    
    // Remover transição após a animação
    setTimeout(() => {
        body.style.transition = '';
    }, 500);
});

function updateThemeIcon() {
    // Usar ícones do Lucide para maior consistência
    if (body.classList.contains("light")) {
        themeToggle.innerHTML = '<i data-lucide="moon"></i>';
    } else {
        themeToggle.innerHTML = '<i data-lucide="sun"></i>';
    }
    lucide.createIcons();
}

document.addEventListener("DOMContentLoaded", () => {
    // Criar modal invisível no corpo do documento
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <span class="video-close">&times;</span>
            <video id="modalVideo" controls></video>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const modalVideo = modal.querySelector('#modalVideo');
    const closeBtn = modal.querySelector('.video-close');
    
    // Lógica dos botões
    document.querySelectorAll('.btn-ver-projeto').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            
            // Se o botão tiver "data-link", abre link externo
            const link = btn.getAttribute('data-link');
            if (link) {
                window.open(link, '_blank');
                return;
            }
            
            // Caso contrário, abre o vídeo
            const videoSrc = btn.getAttribute('data-video');
            if (videoSrc) {
                modalVideo.src = videoSrc;
                modal.classList.add('active');
                modalVideo.play();
            }
        });
    });
    
    // Fechar modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = '';
    });
    
    // Fechar ao clicar fora
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modalVideo.pause();
            modalVideo.src = '';
        }
    });
});

// Adicionar ao seu JavaScript existente
function handleResponsiveLayout() {
    const width = window.innerWidth;
    const heroSection = document.querySelector('.hero-content');
    
    if (width > 1920) {
        // Ajustes específicos para monitores muito grandes
        document.documentElement.style.fontSize = '18px';
    } else if (width > 1440) {
        document.documentElement.style.fontSize = '16px';
    } else {
        document.documentElement.style.fontSize = '14px';
    }
}

// Executar ao carregar e redimensionar
window.addEventListener('load', handleResponsiveLayout);
window.addEventListener('resize', handleResponsiveLayout);
