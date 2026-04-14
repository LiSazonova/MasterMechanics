import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".mySwiper", {
    modules: [Navigation],
    effect: "slide",
    navigation: {
      nextEl: ".custom-button-next",
      prevEl: ".custom-button-prev"
    },
    spaceBetween: 30,
    slidesPerView: 3,
    loop: true,
    speed: 500,
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    }
  });
});