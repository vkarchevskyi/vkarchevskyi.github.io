function hover(element) {
    const image = element.querySelector('img');
    image.setAttribute('src', './img/arrow-right.png');
    image.setAttribute('alt', '-->');
}

function unhover(element) {
    const image = element.querySelector('img');
    image.setAttribute('src', './img/navigate-right.png');
    image.setAttribute('alt', '>');
}