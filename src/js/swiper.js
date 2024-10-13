document.addEventListener('DOMContentLoaded', () => {
    const swiperInstance = new Swiper('.mySwiper', {
        effect: 'slide',
        navigation: {
            nextEl: '.custom-button-next',
            prevEl: '.custom-button-prev',
        },
        spaceBetween: 30,
        slidesPerView: 3,
        loop: true,
        speed: 500,
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
    });
});