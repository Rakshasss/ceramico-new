// ============================================
// CERAMICO — gallery.js
// Handles: filter buttons + lightbox
// Used by: koleqcia.html, collection.html
// ============================================


// ============================================
// PART 1 — FILTER BUTTONS
// Shows/hides gallery sections based on which
// filter button the user clicks
// ============================================

const filterBtns = document.querySelectorAll('.filter-btn');
const sections = document.querySelectorAll('.gallery-section');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        // Remove active highlight from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));

        // Highlight the clicked button
        btn.classList.add('active');

        const filter = btn.dataset.filter; // "all", "classic", or "new"

        // Show or hide each section based on filter
        sections.forEach(sec => {
            if (filter === 'all' || sec.id === filter) {
                sec.style.display = 'block';
            } else {
                sec.style.display = 'none';
            }
        });
    });
});


// ============================================
// PART 2 — LIGHTBOX
// Click a photo → opens fullscreen overlay
// Navigate with arrows or keyboard
// ============================================

const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const items       = document.querySelectorAll('.gallery-item');
const allImgs     = [...document.querySelectorAll('.gallery-item img')];
let currentIndex  = 0;

// Click any photo to open lightbox
items.forEach((item, i) => {
    item.addEventListener('click', () => {
        currentIndex = i;                        // remember which photo was clicked
        lightboxImg.src = allImgs[i].src;        // set the fullscreen image
        lightbox.classList.add('open');           // show the overlay
        document.body.style.overflow = 'hidden'; // disable page scrolling
    });
});

// Close button (X)
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

// Click outside the image to close
lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
});

// Previous arrow
document.querySelector('.lightbox-prev').addEventListener('click', e => {
    e.stopPropagation();
    // Go back one photo, loop to last if at beginning
    currentIndex = (currentIndex - 1 + allImgs.length) % allImgs.length;
    lightboxImg.src = allImgs[currentIndex].src;
});

// Next arrow
document.querySelector('.lightbox-next').addEventListener('click', e => {
    e.stopPropagation();
    // Go forward one photo, loop to first if at end
    currentIndex = (currentIndex + 1) % allImgs.length;
    lightboxImg.src = allImgs[currentIndex].src;
});

// Keyboard navigation
document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return; // ignore if lightbox is closed

    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  { currentIndex = (currentIndex - 1 + allImgs.length) % allImgs.length; lightboxImg.src = allImgs[currentIndex].src; }
    if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % allImgs.length; lightboxImg.src = allImgs[currentIndex].src; }
});

// Close the lightbox
function closeLightbox() {
    lightbox.classList.remove('open');  // hide the overlay
    document.body.style.overflow = '';  // re-enable page scrolling
}
