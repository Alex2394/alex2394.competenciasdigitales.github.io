document.addEventListener('DOMContentLoaded', () => {

    const buttons_start = document.querySelectorAll('.button_start');
    
    const fila = document.querySelector('.carousel-container');
    const carousel_items = document.querySelectorAll('.carousel-item');
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');

    const modal_container = document.querySelector('.modal')

    const close_modal = document.getElementsByClassName('close')[0];

    buttons_start.forEach((button_start) => {

        button_start.addEventListener('mouseenter', () => {

            button_start.classList.add('animate__animated');
            button_start.classList.add('animate__rubberBand');
            button_start.style.setProperty('--animate-duration', '3s');
        });

        button_start.addEventListener('mouseleave', () => {

            setTimeout(() => {
                button_start.classList.remove('animate__animated');
                button_start.classList.remove('animate__rubberBand');
                button_start.removeAttribute('style');
            }, 5000);
        });

        button_start.addEventListener('click', (e) => {
            
            button_start.classList.add('animate__animated');
            button_start.classList.add('animate__heartBeat');
            button_start.style.setProperty('--animate-duration', '3s');

            /* const start_sound = new Audio('./sounds/start.mp3');
            start_sound.play(); */

            const laptop = document.querySelector('.laptop');
            const phone = document.querySelector('.phone');

            if(e.target.getAttribute('data-device') === 'L'){
                
                phone.classList.add('ocultar')

                const system_container = document.querySelector('.laptop .system-container');
                system_container.classList.add('l');

                laptop.classList.remove('ocultar');
                instructions = document.querySelector('.laptop .instructions');
                instructions.classList.add('active');
                document.querySelector('.laptop .system-container').scrollIntoView({ behavior: 'smooth' });
            }
            else{

                laptop.classList.add('ocultar')

                const system_container = document.querySelector('.phone .system-container');
                system_container.classList.add('p');

                phone.classList.remove('ocultar');
                instructions = document.querySelector('.phone .instructions');
                instructions.classList.add('active');
                document.querySelector('.phone .system-container').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    prev.addEventListener('click', () => {
        fila.scrollLeft -= fila.offsetWidth;
        const indicator_active = document.querySelector('.carousel-controls .active');
        if(indicator_active.nextPreviousSibling){
            indicator_active.nextPreviousSibling.classList.add('active');
            indicator_active.classList.remove('active');
        }
    });

    next.addEventListener('click', () => {
        fila.scrollLeft += fila.offsetWidth;
        const indicator_active = document.querySelector('.carousel-controls .active');
        if(indicator_active.nextSibling){
            indicator_active.nextSibling.classList.add('active');
            indicator_active.classList.remove('active');
        }
    });

    const number_pages = Math.ceil(carousel_items.length / 5);

    for(let i = 0; i < number_pages; i++){
        
        const indicator = document.createElement('button');
        
        if( i === 0 ){
            indicator.classList.add('active');
        }
        
        const carousel_controls = document.querySelector('.carousel-controls');
        const carousel_controls_active = document.querySelector('.carousel-controls .active');
        carousel_controls.appendChild(indicator);
        
        indicator.addEventListener('click', (e) => {
            fila.scrollLeft = i * fila.offsetWidth;
            carousel_controls_active.classList.remove('active');
            e.target.classList.add('active');
        });
    }

    carousel_items.forEach((carousel_item) => {
        carousel_item.addEventListener('mouseenter', (e) => {
            const element = e.currentTarget;
            setTimeout(() => {
                carousel_items.forEach(carousel_item_remove_hover => carousel_item_remove_hover.classList.remove('hover'));
                element.classList.add('hover');
            }, 300);
        });
    });

    fila.addEventListener('mouseleave', (e) => {
        setTimeout(() => {
            carousel_items.forEach(carousel_item_remove_hover => carousel_item_remove_hover.classList.remove('hover'));
        }, 300);
    });

    const videos = document.querySelectorAll('.carousel-item video');

    videos.forEach((video) => {

        video.addEventListener('click', () => {

            let vid = document.createElement('video');

            vid.src = video.getAttribute("src");
            vid.autoplay = true;

            let modal__content = document.querySelector('.modal__content');

            modal__content.innerHTML = "";

            modal__content.appendChild(vid);

            const modal__content__video = document.querySelector('.modal__content video');

            if(vid.src.includes('laptop')){
                modal__content__video.classList.add('laptop');
            }
            else{
                modal__content__video.classList.add('phone');
            }
            
            modal_container.classList.add('open');

            modal__content__video.addEventListener('ended', () => {
                modal_container.classList.remove('open');
            });

            document.querySelector('.modal').scrollIntoView({ behavior: 'smooth' });
        });
    });

    close_modal.onclick = function() {
        modal_container.classList.remove('open');
    }

    window.onclick = function(event) {
        if (event.target == modal_container) {
            modal_container.classList.remove('open');
        }
    }
});