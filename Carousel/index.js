// utils
const $ = (selector) => {
  const element = document.querySelector(selector);

  return element;
};

// constants
const SHOWING_CLASS = "showing";
const CURRENT_CLASS = "current";

// dom
const firstSlide = $(".slider__item:first-child");
const lastSlide = $(".slider__item:last-child");
const prevButton = $(".slider__prev");
const nextButton = $(".slider__next");
const pagination = $("#slider__pagination");
const firstPaginationButton = $(".pagination__button:first-child");
const lastPaginationButton = $(".pagination__button:last-child");

// method
const slide = () => {
  const currentSlide = $(`.${SHOWING_CLASS}`);

  if (currentSlide) {
    currentSlide.classList.remove(SHOWING_CLASS);
    const nextSlide = currentSlide.nextElementSibling;
    const flag = nextSlide.classList.contains("slider__item");

    if (flag && nextSlide) {
      nextSlide.classList.add(SHOWING_CLASS);
    } else {
      firstSlide.classList.add(SHOWING_CLASS);
    }
  } else {
    firstSlide.classList.add(SHOWING_CLASS);
  }
};

slide();

let slideInterval = setInterval(slide, 3000);
