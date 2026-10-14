const projects = [
    {
        title: 'NOGUE',
        type: 'Diseño editorial · Revista de moda',
        img: 4,
        pages: [3, 4, 5],
        desc: 'Revista de moda ficticia desarrollada como proyecto de diseño editorial. Un universo visual con inspiración DIY, fotografía y una dirección de arte expresiva.',
        tools: 'InDesign · Photoshop · Procreate · Fotografía'
    },
    {
        title: 'Gulliver’s Travel',
        type: 'Diseño editorial · Clásico reinterpretado',
        img: 'assets/gullivers-cover.png',
        pages: [6, 7, 8],
        desc: 'Reinterpretación visual del primer capítulo de Los viajes de Gulliver, con una narrativa gráfica expresiva, composiciones vibrantes y una edición contemporánea.',
        tools: 'InDesign · Photoshop · Procreate'
    },
    {
        title: 'Ben & Jerry’s',
        type: 'Branding · Rebranding conceptual',
        img: 'assets/ben-jerrys-cover.png',
        pages: [9, 10, 11],
        desc: 'Proyecto académico de rebranding ficticio. Una propuesta visual fresca y minimalista, desde el logotipo hasta el packaging, la papelería y las aplicaciones.',
        tools: 'Illustrator · Photoshop'
    },
    {
        title: 'ChopChop',
        type: 'Branding · Diseño de interfaces',
        img: 14,
        pages: [12, 13, 14],
        desc: 'Concepto de aplicación móvil para un restaurante de sushi: reservas, pedidos a domicilio y personalización de platos, con una identidad divertida y reconocible.',
        tools: 'Figma · Illustrator'
    },
    {
        title: 'Estrella Galicia',
        type: 'Fotografía · Campaña conceptual',
        img: 17,
        pages: [15, 16, 17],
        desc: 'Sesión fotográfica de estudio para una campaña ficticia inspirada en la tradición española. Imágenes con una estética casual y auténtica, aplicadas a soportes publicitarios.',
        tools: 'Photoshop · Fotografía'
    }
];

/* Acepta tanto números como rutas personalizadas */
const asset = value => {
    if (typeof value === 'string') return value;
    return 'assets/p' + String(value).padStart(2, '0') + '.webp';
};

const grid = document.getElementById('projectGrid');

projects.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'project-card' + (i === 4 ? ' wide' : '');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'project-button';
    button.setAttribute('aria-label', 'Ver proyecto ' + p.title);

    button.innerHTML = `
        <div class="preview">
            <img src="${asset(p.img)}" alt="Vista previa del proyecto ${p.title}" loading="lazy">
            <span class="view" aria-hidden="true">↗</span>
        </div>
        <div class="project-info">
            <div>
                <h3>${p.title}</h3>
                <p>${p.type}</p>
            </div>
            <span class="count">0${i + 1} / 05</span>
        </div>
    `;

    button.addEventListener('click', () => openProject(i));
    card.append(button);
    grid.append(card);
});

const modal = document.getElementById('modal');
let opener = null;

function openProject(i) {
    const p = projects[i];
    opener = document.activeElement;

    document.getElementById('modal-num').textContent = 'PROYECTO 0' + (i + 1) + ' / 05';
    document.getElementById('modal-title').textContent = p.title;
    document.getElementById('modal-desc').textContent = p.desc;
    document.getElementById('modal-meta').textContent = p.tools;

    const gal = document.getElementById('gallery');
    gal.replaceChildren();

    p.pages.forEach(n => {
        const im = document.createElement('img');
        im.src = asset(n);
        im.alt = 'Presentación del proyecto ' + p.title + ', página ' + n;
        im.loading = 'lazy';
        gal.append(im);
    });

    modal.classList.add('open');
    document.body.classList.add('modal-open');
    modal.scrollTop = 0;
    document.getElementById('close').focus();
}

function closeProject() {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    if (opener) opener.focus();
}

document.getElementById('close').addEventListener('click', closeProject);

modal.addEventListener('click', e => {
    if (e.target === modal) closeProject();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeProject();
    }
});


/* =====================================
   SCROLL REVEAL ANIMATIONS
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // No activar animaciones si el usuario
    // tiene configurado movimiento reducido.
    if (reduceMotion) return;

    // Seleccionamos los elementos a animar.
    const elements = [
        ".section-head",
        ".project-card",
        ".about-heading",
        ".about-block",
        ".about-photo-column",
        ".footer-inner .eyebrow",
        ".footer-inner h2",
        ".contact-links",
        ".footer-inner .bottom"
    ];

    // Añadir la clase reveal a cada elemento.
    elements.forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {

            element.classList.add("reveal");

            // Alternar retrasos en proyectos y habilidades.
            if (
                selector === ".project-card" ||
                selector === ".about-block"
            ) {
                element.style.transitionDelay =
                    `${(index % 3) * 0.12}s`;
            }

            // La imagen aparece desde la derecha.
            if (selector === ".about-photo-column") {
                element.classList.add("reveal-right");
            }
        });
    });

    // Activamos el sistema de animaciones.
    document.documentElement.classList.add(
        "scroll-animations"
    );

    // Detectamos cuándo entran en pantalla.
    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    // Solo se anima una vez.
                    observer.unobserve(entry.target);
                }
            });

        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    // Observar todos los elementos.
    document.querySelectorAll(".reveal").forEach(element => {
        observer.observe(element);
    });

});
