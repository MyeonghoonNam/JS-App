// utils
const $ = (selector) => {
  const element = document.querySelector(selector);

  return element;
};

// constants
const SHOWING_CLASS = "showing";
const CURRENT_CLASS = "current";

// dom
const slider = $("#slider");
const firstSlide = $(".slider__item:first-child");
const lastSlide = $(".slider__item:last-child");
const prevButton = $(".slider__prev");
const nextButton = $(".slider__next");
const pagination = $("#slider__pagination");
const firstPaginationButton = $(".pagination__button:first-child");
const lastPaginationButton = $(".pagination__button:last-child");

// methods
const render = () => {
  slide();
  initEvents();
  setInterval(slide, 3000);
};

const slide = () => {
  const currentSlide = $(`.${SHOWING_CLASS}`);
  const currentPaginationButton = $(`.${CURRENT_CLASS}`);

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

  if (currentPaginationButton) {
    currentPaginationButton.classList.remove(CURRENT_CLASS);
    const nextPaginationButton = currentPaginationButton.nextElementSibling;
    const flag = nextPaginationButton?.classList.contains("pagination__button");

    if (flag && nextPaginationButton) {
      nextPaginationButton.classList.add(CURRENT_CLASS);
    } else {
      firstPaginationButton.classList.add(CURRENT_CLASS);
    }
  } else {
    firstPaginationButton.classList.add(CURRENT_CLASS);
  }
};

// events
const initEvents = () => {
  pagination.addEventListener("click", handlePaginationClick);
};

const handlePaginationClick = (e) => {
  const { target } = e;
  if (target.tagName !== "BUTTON") return;

  const currentSlide = $(`.${SHOWING_CLASS}`);
  const currentPaginationButton = $(`.${CURRENT_CLASS}`);
  const slides = document.querySelectorAll(".slider__item");
  const paginationButtons = document.querySelectorAll(".pagination__button");
  const dataIndex = target.dataset.index;

  currentSlide.classList.remove(SHOWING_CLASS);
  currentPaginationButton.classList.remove(CURRENT_CLASS);

  slides.forEach((slide) => {
    const currentDataIndex = slide.dataset.index;

    if (currentDataIndex === dataIndex) {
      slide.classList.add(SHOWING_CLASS);
    }
  });

  paginationButtons.forEach((button) => {
    const currentDataIndex = button.dataset.index;

    if (currentDataIndex === dataIndex) {
      button.classList.add(CURRENT_CLASS);
    }
  });
};

render();