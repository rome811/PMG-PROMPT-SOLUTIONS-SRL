// Header che si riduce allo scroll - SOLO SU MOBILE
function handleHeaderScroll() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}



// Menu mobile con animazione
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');

mobileMenu.addEventListener('click', function() {
    navMenu.classList.toggle('show');
    this.classList.toggle('active');
});



// Chiudi menu mobile al click su un link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId.startsWith('#')) {
            e.preventDefault();
            
            // Chiudi menu mobile
            navMenu.classList.remove('show');
            mobileMenu.classList.remove('active');
            
            // Smooth scrolling
            const targetElement = document.querySelector(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});



// Chiudi menu mobile quando si clicka fuori
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        if (!e.target.closest('nav') && !e.target.closest('.mobile-menu')) {
            navMenu.classList.remove('show');
            mobileMenu.classList.remove('active');
        }
    }
});



// Gestione form con Formspree
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        console.log('Form di contatto trovato!');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form inviato - elaborazione in corso...');
            
            // Disabilita il pulsante per evitare doppi invii
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Invio in corso...';
            submitBtn.disabled = true;
            
            // Prepara i dati del form
            const formData = new FormData(this);
            
            // Debug: mostra i dati nella console
            console.log('Dati del form:');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            
            // Invia a Formspree
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                console.log('Risposta ricevuta:', response.status);
                
                if (response.ok) {
                    alert('✅ Messaggio inviato con successo! Ti contatteremo al più presto.');
                    contactForm.reset();
                } else {
                    throw new Error('Errore nel server');
                }
            })
            .catch(error => {
                console.error('Errore completo:', error);
                alert('❌ Errore nell\'invio del messaggio. Riprova più tardi o contattaci direttamente.');
            })
            .finally(() => {
                // Riabilita il pulsante
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    } else {
        console.error('Form di contatto NON trovato!');
    }
});



// Event listeners per lo scroll e resize
window.addEventListener('scroll', handleHeaderScroll);
window.addEventListener('resize', handleHeaderScroll);



// Chiamata iniziale
handleHeaderScroll();
