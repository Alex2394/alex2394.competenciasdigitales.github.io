document.addEventListener('DOMContentLoaded', () => {

    const buttons_start = document.querySelectorAll('.button_start');
    
    const modal_container = document.querySelector('.modal')

    const close_modal = document.getElementsByClassName('close')[0];

    let section_active = 'N';

    let fila = '';
    let carousel_items = '';
    let indicator_active = '';
    let carousel_controls_container = '';
    let carousel_controls_buttons = '';
    let next = '';
    let prev = '';

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
            
            section_active = e.target.getAttribute('data-device');

            if(section_active === 'L'){
                
                phone.classList.add('ocultar')

                const system_container = document.querySelector('.laptop .system-container');
                system_container.classList.add('l');

                laptop.classList.remove('ocultar');
                instructions = document.querySelector('.laptop .instructions');
                instructions.classList.add('active');
                
                fila = document.querySelector('.laptop .carousel-container');
                carousel_items = document.querySelectorAll('.laptop .carousel-item');
                next = document.querySelector('.laptop .next');
                prev = document.querySelector('.laptop .prev');
                
                document.querySelector('.laptop .system-container').scrollIntoView({ behavior: 'smooth' });
            }
            else{

                laptop.classList.add('ocultar')

                const system_container = document.querySelector('.phone .system-container');
                system_container.classList.add('p');

                phone.classList.remove('ocultar');
                instructions = document.querySelector('.phone .instructions');
                instructions.classList.add('active');

                fila = document.querySelector('.phone .carousel-container');
                carousel_items = document.querySelectorAll('.phone .carousel-item');
                next = document.querySelector('.phone .next');
                prev = document.querySelector('.phone .prev');

                document.querySelector('.phone .system-container').scrollIntoView({ behavior: 'smooth' });
            }

            prev.addEventListener('click', () => {
                
                fila.scrollLeft -= fila.offsetWidth;
                
                if(section_active === 'L'){
                    indicator_active = document.querySelector('.laptop .carousel-controls .active');
                }
                else{
                    indicator_active = document.querySelector('.phone .carousel-controls .active');
                }

                if(indicator_active.nextPreviousSibling){
                    indicator_active.nextPreviousSibling.classList.add('active');
                    indicator_active.classList.remove('active');
                }
            });

            next.addEventListener('click', () => {
                
                fila.scrollLeft += fila.offsetWidth;
                
                if(section_active === 'L'){
                    indicator_active = document.querySelector('.laptop .carousel-controls .active');
                }
                else{
                    indicator_active = document.querySelector('.phone .carousel-controls .active');
                }

                if(indicator_active.nextSibling){
                    indicator_active.nextSibling.classList.add('active');
                    indicator_active.classList.remove('active');
                }
            });

            const number_pages = Math.ceil(carousel_items.length / 5);

            for(let i = 0; i < number_pages; i++){
                
                const indicator = document.createElement('button');
                indicator.setAttribute('data-number', i);
                
                if( i === 0 ){
                    indicator.classList.add('active');
                }

                if(section_active === 'L'){
                    carousel_controls_container = document.querySelector('.laptop .carousel-controls');
                }
                else{
                    carousel_controls_container = document.querySelector('.phone .carousel-controls');
                }
                
                carousel_controls_container.appendChild(indicator);
            }

            let seq = 1;

            if(section_active === 'L'){
                carousel_controls_buttons = document.querySelectorAll('.laptop .carousel-controls button');
            }
            else{
                carousel_controls_buttons = document.querySelectorAll('.phone .carousel-controls button');
            }

            carousel_controls_buttons.forEach((button) => {
                button.addEventListener('click', () => {
                    const alreadyHasClass = button.classList.contains('active');
                    carousel_controls_buttons.forEach((button_item_active) => {
                        button_item_active.classList.remove('active');
                    });
                    if(!alreadyHasClass){
                        console.log(seq);
                        fila.scrollLeft = seq * fila.offsetWidth;
                        button.classList.add('active');
                        seq++;
                    }
                });
            });

            /* console.log(carousel_controls_buttons);
            for(let button of carousel_controls_buttons){
                console.log(button);
            } */

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
    });
});