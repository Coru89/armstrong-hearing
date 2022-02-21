const handleClick = () => {
    el.classList.toggle('nav__button--active');
}

const el = document.querySelector('.nav__button');
el.addEventListener('click', handleClick);

document.onclick = (e) => {
    if (e.target.className !== 'nav__list' && !e.target.classList.contains('nav__button')) {
        el.classList.remove('nav__button--active');
    }
}

window.addEventListener('resize', function(event){
    const newWidth = window.innerWidth;

    newWidth > 768 ? el.classList.remove('nav__button--active') : '';

    console.log(newWidth);
});