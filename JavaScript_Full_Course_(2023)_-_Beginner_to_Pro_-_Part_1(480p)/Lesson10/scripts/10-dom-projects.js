
        function handleEnterKey(){
            if (event.key === 'Enter'){
                CalculateTotal()
            }
        }


        function CalculateTotal(){
            const btnElement = document.querySelector('.js-btn');

            let cost = Number(btnElement.value);

            if (cost < 40){
                cost = cost + 10;
            }

            document.querySelector('.js-total-cost')
                .innerHTML = `$${cost}`;
        }

        // NOTE: innerHTML: baya amfani idan suna na da space etc.
        // SAI DAI innerText: Shine Zai iya mana wnn aikin.

        function subscribe(){
            const buttonElement = document.querySelector('.js-class');

            if (buttonElement.innerText === 'Subscribe') {
                buttonElement.innerHTML = 'Subscribed';
                buttonElement.classList.add('is-subscribed');
            }else {
                buttonElement.innerHTML = 'Subscribe';
                buttonElement.classList.remove('is-subscribed');
            }
        }