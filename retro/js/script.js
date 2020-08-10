// burger-menu
let burgerMenu = document.querySelectorAll('.burger-menu');


burgerMenu.forEach(element => {
  element.addEventListener('click', () => {
    let aim = element.getAttribute('data-call'),
        toShow = document.querySelector(`.${aim}`);

    if (toShow) toShow.classList.toggle('active');
  })
});

window.addEventListener('click', (e) => {
  if (!e.target.classList.contains('active') && !e.target.classList.contains('burger-menu') ) {
    let activeElements = document.querySelectorAll('.active');

    activeElements.forEach( activeElement => activeElement.classList.remove('active'));
  }
})