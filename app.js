const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animation');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden-animation');
hiddenElements.forEach((el) => observer.observe(el));