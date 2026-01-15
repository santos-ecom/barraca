// Hijacking logic removed since motoserra/index.html exists and is complete.


// Original Essenza Theme Logic
document.addEventListener('DOMContentLoaded', () => {
    applyEssenzaTheme();
});

function applyEssenzaTheme() {
    const logoImgs = document.querySelectorAll('header img');
    logoImgs.forEach(img => {
        if (!img.src.includes('essenza_logo.png')) {
            img.src = '/assets/essenza_logo.png';
            img.style.maxHeight = '50px';
            img.style.width = 'auto';
        }
    });
}
