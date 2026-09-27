document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalType = document.getElementById('modalType');
    const modalDesc = document.getElementById('modalDesc');
    const modalPrice = document.getElementById('modalPrice');
    const modalTime = document.getElementById('modalTime');
    const modalWorkflow = document.getElementById('modalWorkflow');
    const closeModalBtn = document.getElementById('closeModalBtn');

    document.querySelectorAll('[data-carousel]').forEach(carousel => {
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const indicators = Array.from(carousel.querySelectorAll('.carousel-indicators button'));
        let activeIndex = 0;
        let touchStartX = null;

        function showSlide(index) {
            activeIndex = (index + slides.length) % slides.length;
            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle('is-active', slideIndex === activeIndex);
            });
            indicators.forEach((indicator, indicatorIndex) => {
                const isActive = indicatorIndex === activeIndex;
                indicator.classList.toggle('is-active', isActive);
                if (isActive) {
                    indicator.setAttribute('aria-current', 'true');
                } else {
                    indicator.removeAttribute('aria-current');
                }
            });
        }

        carousel.querySelector('.carousel-previous').addEventListener('click', event => {
            event.stopPropagation();
            showSlide(activeIndex - 1);
        });
        carousel.querySelector('.carousel-next').addEventListener('click', event => {
            event.stopPropagation();
            showSlide(activeIndex + 1);
        });
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', event => {
                event.stopPropagation();
                showSlide(index);
            });
        });
        carousel.addEventListener('touchstart', event => {
            touchStartX = event.changedTouches[0].clientX;
        }, { passive: true });
        carousel.addEventListener('touchend', event => {
            if (touchStartX === null) return;
            const swipeDistance = event.changedTouches[0].clientX - touchStartX;
            if (Math.abs(swipeDistance) > 40) {
                showSlide(activeIndex + (swipeDistance < 0 ? 1 : -1));
            }
            touchStartX = null;
        }, { passive: true });
    });

    document.querySelectorAll('.gallery-card').forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('.carousel-slide.is-active') || card.querySelector('img');
            modal.style.display = 'flex';
            modalImg.src = img.src;
            modalTitle.textContent = card.dataset.title || 'Artwork Details';
            modalType.textContent = card.dataset.type || 'Commission Work';
            modalDesc.textContent = card.dataset.desc || 'No description available.';
            modalPrice.textContent = card.dataset.price || 'Contact for quote';
            modalTime.textContent = card.dataset.time || 'Varies';
            modalWorkflow.innerHTML = card.dataset.workflow || 'Standard workflow: Sketch -> Revision -> Final Render.';
        });
    });

    function closeModal() {
        modal.style.display = 'none';
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});