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
const slides = document.querySelectorAll(".slider__item");
const paginationButtons = document.querySelectorAll(".pagination__button");
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
};

const slide = () => {
  const currentSlide = $(`.${SHOWING_CLASS}`);
  const currentPaginationButton = $(`.${CURRENT_CLASS}`);

  if (currentSlide) {
    currentSlide.classList.remove(SHOWING_CLASS);
    const nextSlide = currentSlide.nextElementSibling;
    const flag = nextSlide?.classList.contains("slider__item");

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

let autoSlide = setInterval(slide, 3000);

// events
const initEvents = () => {
  pagination.addEventListener("click", handlePaginationClick);
  slider.addEventListener("mouseover", handleMouseOver);
  slider.addEventListener("mouseout", handleMouseOut);
  prevButton.addEventListener("click", handleImageControlButtonClick);
  nextButton.addEventListener("click", handleImageControlButtonClick);
};

const handlePaginationClick = (e) => {
  const { target } = e;
  if (target.tagName !== "BUTTON") return;

  const currentSlide = $(`.${SHOWING_CLASS}`);
  const currentPaginationButton = $(`.${CURRENT_CLASS}`);
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

const handleMouseOver = () => {
  clearInterval(autoSlide);
};

const handleMouseOut = () => {
  autoSlide = setInterval(slide, 3000);
};

const handleImageControlButtonClick = (e) => {
  const mode = e.target.classList[0];
  const currentSlide = $(`.${SHOWING_CLASS}`);
  const currentPaginationButton = $(`.${CURRENT_CLASS}`);
  const currentDataIndex = Number(currentSlide.dataset.index);
  let nextDataIndex = 0;

  switch (mode) {
    case "slider__prev":
      if (currentDataIndex === 1) {
        nextDataIndex = lastSlide.dataset.index;
      } else {
        nextDataIndex = (currentDataIndex - 1).toString();
      }
      break;
    case "slider__next":
      if (currentDataIndex === 5) {
        nextDataIndex = firstSlide.dataset.index;
      } else {
        nextDataIndex = (currentDataIndex + 1).toString();
      }
      break;
    default:
      break;
  }

  currentSlide.classList.remove(SHOWING_CLASS);
  currentPaginationButton.classList.remove(CURRENT_CLASS);

  slides.forEach((slide) => {
    const searchCurrentSlideDataIndex = slide.dataset.index;
    if (searchCurrentSlideDataIndex === nextDataIndex) {
      slide.classList.add(SHOWING_CLASS);
    }
  });

  paginationButtons.forEach((button) => {
    const searchCurrentPaginationButtonDataIndex = button.dataset.index;

    if (searchCurrentPaginationButtonDataIndex === nextDataIndex) {
      button.classList.add(CURRENT_CLASS);
    }
  });
};

render();
