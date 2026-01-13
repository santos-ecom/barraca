document.addEventListener('DOMContentLoaded', () => {
    applyEssenzaTheme();

    // Observer to handle dynamic content changes (React re-renders)
    const observer = new MutationObserver(() => {
        applyEssenzaTheme();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

function applyEssenzaTheme() {
    // 1. Replace Logo
    const logoImgs = document.querySelectorAll('header img');
    logoImgs.forEach(img => {
        if (!img.src.includes('essenza_logo.png')) {
            img.src = './assets/essenza_logo.png';
            img.srcset = ''; // Clear srcset to prevent loading original responsive images
            img.style.maxHeight = '50px'; // Adjust size
            img.style.width = 'auto';
        }
    });

    // 2. Update Top Bar Text
    const topBar = document.querySelector('header > div:first-child');
    if (topBar && !topBar.textContent.includes('Worldwide')) {
        // Preserving the structure if it has icons for language selector etc., but replacing text
        // Assuming simple text node based on inspection
        // topBar.textContent = 'Free Shipping Worldwide 🌍'; 
        // Better: Find the text node only to avoid removing language flags if they exist
    }

    // 3. Hide Unwanted Sections (Safe Delivery / Guarantee)
    // Heuristic: Search for headings containing these words
    const headings = document.querySelectorAll('h2, h3, h4');
    headings.forEach(h => {
        const text = h.textContent.toLowerCase();
        if (text.includes('safe delivery') || text.includes('guarantee') || text.includes('entrega segura') || text.includes('garantia')) {
            // Find the parent section wrapper
            let parent = h.closest('section') || h.closest('div.py-8') || h.parentElement;
            if (parent) parent.style.display = 'none';
        }
    });

    // 4. Force CTA Text if needed (Optional, keeping original language if not requested to translate)

    // 5. Enhance Reviews Stars (Yellow)
    const starIcons = document.querySelectorAll('svg');
    starIcons.forEach(svg => {
        if (svg.classList.contains('text-yellow-400') || svg.classList.contains('text-primary')) { // Common star classes
            svg.style.color = '#FBBF24'; // Ensure yellow
            svg.style.fill = '#FBBF24';
        }
    });

    // 6. Fix Footer Background and Text Color (Inline Style Override)
    // Find the footer container that has the specific green background inline
    const divElements = document.querySelectorAll('div[style*="rgb(79, 105, 91)"], div[style*="#4F695B"]');
    divElements.forEach(div => {
        // Remove the inline background-color style to allow CSS class to work, or override it directly
        div.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--essenza-primary').trim();

        // Ensure "Customer Service" text inside this container is white
        const headings = div.querySelectorAll('h2, h3, h4, span, div');
        headings.forEach(heading => {
            if (heading.textContent.includes('Customer Service')) {
                heading.style.color = '#FFFFFF';
                // Also check if heading has text-primary class and remove it/override
                heading.classList.remove('text-primary');
                heading.style.setProperty('color', '#FFFFFF', 'important');
            }
        });
    });

    // 7. Force White Text on Customer Service explicitly (Fallback)
    const targetHeadings = Array.from(document.querySelectorAll('h2')).filter(h => h.textContent.includes('Customer Service'));
    targetHeadings.forEach(h => {
        h.style.setProperty('color', '#FFFFFF', 'important');
    });

}
