document.addEventListener('DOMContentLoaded', () => {
    const galleryScroller = document.querySelector('.gallery-scroller');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let isDown = false;
    let startX;
    let scrollLeft;
    
    // Show scroll indicator on page load
    setTimeout(() => {
        scrollIndicator.classList.add('visible');
        setTimeout(() => {
            scrollIndicator.classList.remove('visible');
        }, 3000); // Hide after 3 seconds
    }, 1000);
    
    // Fine-tune the spacing between devices to ensure they don't touch
    function updateSpacingAndScaling() {
        const deviceContainers = document.querySelectorAll('.device-container');
        const viewportWidth = window.innerWidth;
        
        // Calculate the minimum spacing needed (scales with viewport size)
        const minSpacing = Math.max(24, viewportWidth * 0.04);
        
        // Update root CSS variables for continuous fluid scaling
        const root = document.documentElement;
        
        // Smoothly adjust minimum scales for different viewport sizes
        if (viewportWidth <= 480) {
            root.style.setProperty('--large-device-scale-min', '0.335639');
            root.style.setProperty('--phone-device-scale-min', '0.294933');
            root.style.setProperty('--square-device-scale-min', '0.35');
        } else if (viewportWidth <= 768) {
            root.style.setProperty('--large-device-scale-min', '0.435639');
            root.style.setProperty('--phone-device-scale-min', '0.344933');
            root.style.setProperty('--square-device-scale-min', '0.40');
        } else if (viewportWidth <= 1024) {
            root.style.setProperty('--large-device-scale-min', '0.535639');
            root.style.setProperty('--phone-device-scale-min', '0.394933');
            root.style.setProperty('--square-device-scale-min', '0.45');
        } else if (viewportWidth <= 1440) {
            root.style.setProperty('--large-device-scale-min', '0.635639');
            root.style.setProperty('--phone-device-scale-min', '0.444933');
            root.style.setProperty('--square-device-scale-min', '0.50');
        }
        
        // Ensure devices don't touch with proper spacing
        deviceContainers.forEach((container, index) => {
            if (index < deviceContainers.length - 1) {
                // Calculate the right margin based on viewport size
                const rightMargin = viewportWidth <= 480 ? Math.max(40, viewportWidth * 0.08) : 
                                    viewportWidth <= 768 ? Math.max(30, viewportWidth * 0.06) :
                                    Math.max(24, viewportWidth * 0.04);
                                    
                container.style.marginRight = `${rightMargin}px`;
            }
        });
    }
    
    // Handle mouse events for drag scrolling
    galleryScroller.addEventListener('mousedown', (e) => {
        isDown = true;
        galleryScroller.style.cursor = 'grabbing';
        startX = e.pageX - galleryScroller.offsetLeft;
        scrollLeft = galleryScroller.scrollLeft;
        e.preventDefault(); // Prevent browser drag behavior
    });
    
    galleryScroller.addEventListener('mouseleave', () => {
        isDown = false;
        galleryScroller.style.cursor = 'grab';
    });
    
    galleryScroller.addEventListener('mouseup', () => {
        isDown = false;
        galleryScroller.style.cursor = 'grab';
    });
    
    galleryScroller.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - galleryScroller.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        galleryScroller.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events for mobile
    galleryScroller.addEventListener('touchstart', (e) => {
        isDown = true;
        const touch = e.touches[0];
        startX = touch.pageX - galleryScroller.offsetLeft;
        scrollLeft = galleryScroller.scrollLeft;
    }, { passive: true });
    
    galleryScroller.addEventListener('touchend', () => {
        isDown = false;
    }, { passive: true });
    
    galleryScroller.addEventListener('touchcancel', () => {
        isDown = false;
    }, { passive: true });
    
    galleryScroller.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const touch = e.touches[0];
        const x = touch.pageX - galleryScroller.offsetLeft;
        const walk = (x - startX) * 2;
        galleryScroller.scrollLeft = scrollLeft - walk;
    }, { passive: true });
    
    // Show scroll indicator when user hasn't scrolled for a while
    let scrollTimeout;
    galleryScroller.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollIndicator.classList.remove('visible');
        
        scrollTimeout = setTimeout(() => {
            // Only show indicator if not scrolled to the end
            const isAtEnd = galleryScroller.scrollLeft + galleryScroller.clientWidth >= galleryScroller.scrollWidth - 20;
            if (!isAtEnd && galleryScroller.scrollWidth > galleryScroller.clientWidth) {
                scrollIndicator.classList.add('visible');
                setTimeout(() => {
                    scrollIndicator.classList.remove('visible');
                }, 2000);
            }
        }, 1000);
    });
    
    // Smooth wheel event handling with velocity-based scrolling for a more natural feel
    let wheelTimeout;
    let wheelDelta = 0;
    
    galleryScroller.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        // Add to accumulated delta for smoother scrolling
        wheelDelta += e.deltaY;
        
        // Clear previous timeout
        clearTimeout(wheelTimeout);
        
        // Set timeout to apply scrolling with inertia
        wheelTimeout = setTimeout(() => {
            // Apply smooth scrolling with the accumulated delta
            galleryScroller.scrollBy({
                left: wheelDelta,
                behavior: 'smooth'
            });
            
            // Reset delta
            wheelDelta = 0;
        }, 10);
    });
    
    // Preload images for smoother experience
    function preloadBackgroundImages() {
        const images = document.querySelectorAll('.timelineImage_image');
        images.forEach(img => {
            const style = getComputedStyle(img);
            const bgImage = style.backgroundImage;
            if (bgImage && bgImage !== 'none') {
                const url = bgImage.slice(4, -1).replace(/['"]/g, '');
                const newImg = new Image();
                newImg.src = url;
            }
        });
    }
    
    preloadBackgroundImages();
    
    // Initial setup
    updateSpacingAndScaling();
    
    // Continuous scaling with resize - use debounced function for performance
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSpacingAndScaling();
        }, 100); // Debounce resize events
    });
    
    // Handle window resize during load
    window.addEventListener('load', updateSpacingAndScaling);
});