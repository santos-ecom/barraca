document.addEventListener('DOMContentLoaded', () => {
    forceNovaGoodsLogo();

    // Observer to prevent any other script from changing the logo back
    const observer = new MutationObserver((mutations) => {
        let shouldCheck = false;
        for (const mutation of mutations) {
            if (mutation.type === 'childList' || (mutation.type === 'attributes' && mutation.target.tagName === 'IMG')) {
                shouldCheck = true;
                break;
            }
        }
        if (shouldCheck) forceNovaGoodsLogo();
    });

    const header = document.querySelector('header');
    if (header) {
        observer.observe(header, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'srcset', 'style'] });
    } else {
        observer.observe(document.body, { childList: true, subtree: true });
    }
});

function forceNovaGoodsLogo() {
    const logoImgs = document.querySelectorAll('header img');
    logoImgs.forEach(img => {
        if (!img.src.includes('novagoods_logo_shopify.png')) {
            // console.log('Enforcing Nova Goods logo');
            img.src = '/assets/novagoods_logo_shopify.png';
            img.srcset = ''; // Clear srcset
            img.style.maxHeight = '65px';
            img.style.width = 'auto';
        }
    });
}
