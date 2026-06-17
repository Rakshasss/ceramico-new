const filterBtns = document.querySelectorAll('.filter-btn');
const sections = document.querySelectorAll('.gallery-section');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        
        filterBtns.forEach(b => b.classList.remove('active'));

       
        btn.classList.add('active');

        const filter = btn.dataset.filter; 

        
        sections.forEach(sec => {
            if (filter === 'all' || sec.id === filter) {
                sec.style.display = 'block';
            } else {
                sec.style.display = 'none';
            }
        });
    });
});




const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const items       = document.querySelectorAll('.gallery-item');
const allImgs     = [...document.querySelectorAll('.gallery-item img')];
let currentIndex  = 0;


items.forEach((item, i) => {
    item.addEventListener('click', () => {
        currentIndex = i;                       
        lightboxImg.src = allImgs[i].src;        
        lightbox.classList.add('open');           
        document.body.style.overflow = 'hidden';
    });
});


document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);


lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
});

document.querySelector('.lightbox-prev').addEventListener('click', e => {
    e.stopPropagation();
   
    currentIndex = (currentIndex - 1 + allImgs.length) % allImgs.length;
    lightboxImg.src = allImgs[currentIndex].src;
});


document.querySelector('.lightbox-next').addEventListener('click', e => {
    e.stopPropagation();
   
    currentIndex = (currentIndex + 1) % allImgs.length;
    lightboxImg.src = allImgs[currentIndex].src;
});


document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;

    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  { currentIndex = (currentIndex - 1 + allImgs.length) % allImgs.length; lightboxImg.src = allImgs[currentIndex].src; }
    if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % allImgs.length; lightboxImg.src = allImgs[currentIndex].src; }
});


function closeLightbox() {
    lightbox.classList.remove('open'); 
    document.body.style.overflow = '';  
}
