const menu = document.querySelector('.menu');

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.querySelector('.scroller').classList.add('scroller-transit')
    } else {
        document.querySelector('.scroller').classList.remove('scroller-transit')
    }
}

window.onscroll = () => {
    scrollFunction();
}

function headToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

function openMenu() {
    if (menu.classList.contains('close-menu')) {
        menu.classList.add('open-menu');

        menu.classList.remove('close-menu');
    } else {
        menu.classList.add('close-menu');
        
        menu.classList.remove('open-menu');
    }
}