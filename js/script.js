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

// Gestione form
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Debug: mostra i dati del form nella console
    const formData = new FormData(this);
    console.log('Dati del form che stanno per essere inviati:');
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    
    // Invia il form a Tally
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Messaggio inviato con successo! Ti contatteremo al più presto.');
            this.reset();
        } else {
            alert('Errore nell\'invio del messaggio. Riprova più tardi.');
        }
    })
    .catch(error => {
        console.error('Errore di connessione:', error);
        alert('Errore di connessione. Controlla la tua internet e riprova.');
    });
});
