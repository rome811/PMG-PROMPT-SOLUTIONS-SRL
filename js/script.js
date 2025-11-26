// Menu mobile
document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('show');
});

// Smooth scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
        });
    });
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
