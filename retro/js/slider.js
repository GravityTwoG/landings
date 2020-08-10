(function () {
  const sliders = document.querySelectorAll('.slider');


  sliders.forEach((slider) => {
    const sliderCont = slider.querySelector('.slider__cont');
    const sliderImages = slider.getElementsByClassName('slider__item');
    const sliderPrev = slider.querySelector('.slider-arrow.prev');
    const sliderNext = slider.querySelector('.slider-arrow.next');


    // Creating sliderDots
    const sliderDotsCont = document.createElement('div');

    sliderDotsCont.classList.add('slider__dots');
    slider.appendChild(sliderDotsCont);
    for (let i = 1; i <= sliderImages.length; i++) {
      let sliderDot = document.createElement('div');

      sliderDot.classList.add('slider__dot');
      sliderDot.setAttribute('data-order', i);
      sliderDotsCont.appendChild(sliderDot);
    }
    const sliderDots = slider.querySelectorAll('.slider__dot');
    sliderDots[0].classList.add('active');


    // Things for infinite scrolling
    const lastClone = sliderImages[sliderImages.length - 1].cloneNode(true);
    const firstClone = sliderImages[0].cloneNode(true);
    sliderCont.appendChild(firstClone);
    sliderCont.prepend(lastClone);

    // Counter for sliderCont
    function getSize() {
      let width = slider.clientWidth;
      let style = getComputedStyle(slider);
      width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width;
    }
    let width = getSize();
    let counter = 1;
    sliderCont.style.transform = `translateX(${-width*counter}px)`;

    // Auto sliding
    function slideNext() {
      width = getSize();
      sliderCont.style.transition = 'transform .5s ease-in-out';
      counter++;
      sliderCont.style.transform = `translateX(${-width*counter}px)`;
    };
    const autoSlide = setInterval(slideNext, 5000);

    // EventListeners
    if (sliderPrev !== null) {
      sliderPrev.addEventListener('click', () => {
        if (counter <= 0) return;
        width = getSize();
        sliderCont.style.transition = 'transform .5s ease-in-out';
        counter--;
        sliderCont.style.transform = `translateX(${-width*counter}px)`;
      });
    };
    if (sliderNext !== null) {
      sliderNext.addEventListener('click', () => {
        if (counter >= sliderImages.length - 1) return;
        width = getSize();
        sliderCont.style.transition = 'transform .5s ease-in-out';
        counter++;
        sliderCont.style.transform = `translateX(${-width*counter}px)`;
      });
    };
    sliderCont.addEventListener('transitionend', () => {
      sliderCont.style.transition = 'none';
      if (counter <= 0) {
        width = getSize();
        counter = sliderImages.length - 2;
        sliderCont.style.transform = `translateX(${-width*counter}px)`;
      }
      if (counter >= sliderImages.length - 1) {
        counter = 1;
        width = getSize();
        sliderCont.style.transform = `translateX(${-width*counter}px)`;
      }
      sliderDots.forEach((sliderDot) => sliderDot.classList.remove('active'));
      sliderDots[counter - 1].classList.add('active');
    });
    sliderDotsCont.addEventListener('click', (e) => {
      if (e.target.classList.contains('slider__dot')) {
        const order = e.target.getAttribute('data-order');
        width = getSize();
        sliderCont.style.transition = 'transform .5s ease-in-out';
        sliderCont.style.transform = `translateX(${-width*order}px)`;
        counter = order;
        sliderDots.forEach((sliderDot) => sliderDot.classList.remove('active'));
        e.target.classList.add('active');
      }
    });
  });
})();