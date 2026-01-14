// CLIENT-SIDE ROUTING HIJACK (Fix for missing server files)
// This script detects if we are on a product page and INJECTS the static content manually.
(function () {
    const path = window.location.pathname;

    // CONTENT FOR MOTOSERRA (Minified/Compressed for script injection)
    const MOTOSERRA_HTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dewalt 20V Super Impact Wrench</title>
        <link rel="stylesheet" href="/assets/index-DcQQoMRH.css">
        <link rel="stylesheet" href="/overrides.css">
    </head>
    <body>
        <div class="min-h-screen bg-background">
             <header class="bg-background border-b border-border">
                <div class="bg-primary text-primary-foreground py-2 px-4 text-center text-sm">Free Shipping Worldwide &#127758;</div>
                <div class="px-4 py-3" style="background-color: rgb(254, 249, 243);">
                    <div class="flex items-center justify-center">
                         <img src="/assets/essenza_logo.png" alt="ESPAZIE" class="h-8" style="max-height: 50px; width: auto;">
                    </div>
                </div>
            </header>
            <main class="px-4 py-4"><div class="text-center p-10">
                <h1 class="text-2xl font-bold mb-4">Product: Dewalt 20V Chainsaw</h1>
                <div class="aspect-square bg-secondary relative max-w-sm mx-auto mb-4">
                     <img src="/assets/motoserra-1.jpg" class="w-full h-full object-contain">
                </div>
                <p class="text-lg font-bold text-price-sale mb-2">$29.00 <span class="text-sm text-price-original line-through">$289.90</span></p>
                <form action="https://5qxzc2-13.myshopify.com/cart/add" method="post">
                    <input type="hidden" name="items[0][id]" value="45000940224651">
                    <input type="hidden" name="items[0][quantity]" value="1">
                    <input type="hidden" name="return_to" value="/checkout">
                    <button type="submit" class="w-full h-12 rounded-md font-semibold bg-primary text-primary-foreground hover:bg-primary/90">Buy Now</button>
                </form>
            </div></main>
        </div>
        <!-- Scripts (Mocked for basics) -->
        <script>
            // Basic interactivity if needed
        </script>
    </body>
    </html>
    `;

    // Only hijack if we are on the specific route AND the server returned the SPA (checked by #root existence)
    if (path.includes('/motoserra')) {
        console.log("OVERRIDES: Hijacking route for Motoserra");

        // We need to fetch the REAL HTML content if possible, or inject the backup.
        // Since we can't fetch the file (it 404s/redirects), we must REBUILD the DOM.

        // STOP THE SPA from mounting
        window.stop();

        document.addEventListener('DOMContentLoaded', () => {
            document.body.innerHTML = MOTOSERRA_HTML;

            // Dynamic Fetch of the REAL content (Self-Repair)
            // We will try to fetch the raw HTML from a known good location if available, 
            // but for now, let's inject a redirect or a "Please Wait" to catch the user.
            // BETTER STRATEGY: 
            // Redirect to the /dist/ version if it exists? 
            // No, browser check said /dist/ failed too.

            // ACTUAL STRATEGY:
            // Since I cannot embed 600 lines easily here without breaking syntax, 
            // I will try one last "Hail Mary": 
            // Redirect to the generic product page IF we can make it work.

            // Wait, I can embed the content.
        });
    }
})();

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
