document.addEventListener("DOMContentLoaded", () => {
    
    document.addEventListener('keydown', (event) => {
        const { key } = event;
        switch (key) {
            case 'ArrowUp':
                onArrowUp();
                break;
            case 'ArrowDown':
                onArrowDown();
                break;
            case 'Enter':
                onEnter();
                break;
            default: break;
        }
        return;
    });

})

const toSelect = Array.from(document.querySelectorAll('.to-select'));
let selected = 0;

function onArrowUp() {
    if (toSelect[selected - 1]) {
        toSelect[selected].classList.remove('selected');
        toSelect[selected - 1].classList.add('selected');
        selected -= 1;
    }
}

function onArrowDown() {
    toSelect[selected].classList.remove('selected');
    if (toSelect[selected + 1]) {
        toSelect[selected + 1].classList.add('selected');
        selected += 1;
    } else {
        toSelect[0].classList.add('selected');
        selected = 0;
    }   
}

function onEnter() {
    const link = toSelect[selected].querySelector('a').getAttribute('href');
    window.open(link, '_blank');
}