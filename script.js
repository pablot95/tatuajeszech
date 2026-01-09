document.addEventListener('DOMContentLoaded', () => {
    
    // --- Background Collage Generation ---
    const images = [
        'tatuador.jpeg', 'tatuadordefrente.jpeg', 'tatuadortomandomates.jpeg',
        'tatuajeantebrazo.jpeg', 'tatuajebrazo1.jpeg', 'tatuajebrazo2.jpeg',
        'tatuajebrazo3.jpeg', 'tatuajebrazopierna.jpeg', 'tatuajeespalda.jpeg',
        'tatuajehombro.jpeg'
    ];
    
    // Create a grid 
    const size = 50; // px
    const gap = 20; // px
    
    // Calculate how many fit
    const cols = Math.ceil(window.innerWidth / (size + gap));
    const rows = Math.ceil(window.innerHeight / (size + gap));
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // Randomly skip some spots for "sparse" look if desired, or fill all
            if (Math.random() > 0.05) { // 95% fill
                const img = document.createElement('img');
                const randomImg = images[Math.floor(Math.random() * images.length)];
                img.src = `images/${randomImg}`;
                img.classList.add('bg-grid-item');
                
                // Add some randomness to position (scatter)
                const offsetX = (Math.random() - 0.5) * 20;
                const offsetY = (Math.random() - 0.5) * 20;
                
                img.style.left = `${c * (size + gap) + offsetX}px`;
                img.style.top = `${r * (size + gap) + offsetY}px`;
                
                // Random scale/rotation slightly for collage feel
                const scale = 0.8 + Math.random() * 0.4;
                const rotate = (Math.random() - 0.5) * 30;
                img.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
                
                // Parallax depth data attribute
                // Some are "farther" (move slower) some "closer" (move faster - but we are background)
                // Actually if it's "background", simpler is just static or slow move.
                // But user asked for parallax effect.
                // Let's make the container fixed (which it is) but maybe move individual items slightly on mousemove?
                // Or scroll based? "parallax... que de una sensacion de que esten lejos"
                // Fixed background ALREADY gives "far away" feel relative to scrolling content.
                // Let's add slight mouse parallax for extra "depth" feel.
                const depth = Math.random(); 
                img.dataset.depth = depth;
            }
        }
    }


    // Configuración del Intersection Observer
    // Utilizaremos este observador para todos los elementos que queramos animar
    const observerOptions = {
        root: null, // viewport
        threshold: 0.30, // se dispara cuando el 30% del elemento es visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar la clase que resetea la transformación y opacidad
                entry.target.classList.add('show');
                // Dejar de observar una vez que ya apareció (opcional, si queremos que se anime solo una vez)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionamos todos los elementos con clases 'hidden-*'
    const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right, .hidden-bottom, .hidden-scale, .hidden-fade');
    hiddenElements.forEach((el) => observer.observe(el));


    // Navbar effect on scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 10px 30px -10px rgba(2, 12, 27, 0.7)";
            header.style.padding = "5px 50px";
        } else {
            header.style.boxShadow = "none";
            header.style.padding = "5px 50px";
        }
    });

    // Mobile check adjustment (si hay necesidad en el futuro)
    if (window.innerWidth <= 768) {
        // Ajustes específicos para móviles si se requiere
    }
});
