document.addEventListener('DOMContentLoaded', () => {
    
    // Set Current Year in Footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // --------------------------------------------------------
    // Sticky Header
    // --------------------------------------------------------
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(27, 60, 96, 0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // --------------------------------------------------------
    // FAQ Accordion
    // --------------------------------------------------------
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.accordion-item').forEach(accItem => {
                accItem.classList.remove('active');
            });

            // Open if wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --------------------------------------------------------
    // Testimonials Carousel
    // --------------------------------------------------------
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    let currentIndex = 0;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // loop back
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1; // loop to end
        }
        updateCarousel();
    });

    // --------------------------------------------------------
    // Security: Input Sanitization (LGPD & Anti-XSS)
    // --------------------------------------------------------
    function sanitizeInput(str) {
        if (!str) return '';
        return str.replace(/[&<>"']/g, function(match) {
            const escapeMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;'
            };
            return escapeMap[match];
        });
    }

    // --------------------------------------------------------
    // WhatsApp Form Submission
    // --------------------------------------------------------
    const form = document.getElementById('leadForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Consentimento LGPD
        const lgpdConsent = document.getElementById('lgpd_consent').checked;
        if (!lgpdConsent) {
            alert('Por favor, aceite a Política de Privacidade para prosseguir.');
            return;
        }
        
        // Coleta e sanitização de dados
        const nome = sanitizeInput(document.getElementById('nome').value);
        const email = sanitizeInput(document.getElementById('email').value);
        const whatsapp = sanitizeInput(document.getElementById('whatsapp').value);
        const tipoNegocio = sanitizeInput(document.getElementById('tipo_negocio').value);
        const objetivo = sanitizeInput(document.getElementById('objetivo').value);

        // Número da Manoella (Placehoder - precisa ser ajustado)
        // Como o usuário não informou o número, deixamos o link base
        // https://web.whatsapp.com/send?phone=55XXXXXXXXX&text=...
        
        // Mensagem formatada
        const mensagem = `*Nova solicitação de consultoria!*%0A%0A` +
                         `*Nome:* ${nome}%0A` +
                         `*E-mail:* ${email}%0A` +
                         `*WhatsApp:* ${whatsapp}%0A` +
                         `*Tipo de Negócio:* ${tipoNegocio}%0A` +
                         `*Objetivo/Desafio:* ${objetivo}`;
                         
        // Como a URL pedida foi https://wa.me/5562994545481
        const urlWhatsApp = `https://wa.me/5562994545481?text=${mensagem}`;
        
        // Open WhatsApp in new tab
        window.open(urlWhatsApp, '_blank');
    });

});
