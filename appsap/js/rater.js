export function Rater(containerElement){

    const createRater = (element) => {
        const div = document.createElement('div');
        div.id = element.getAttribute('id');
        div.classList.add('star-rater');

        const defaultRating = element.getAttribute('data-default');;

        div.setAttribute('data-rating', defaultRating ? defaultRating : 1 );
        div.setAttribute('role', 'rater');
        
        const allRates = [1, 2, 3, 4, 5];
        allRates.forEach(idx => {
            const span = document.createElement('span');
            span.classList.add('star');
            span.setAttribute('data-value', idx);
            span.innerHTML = '&#9733;'
            div.appendChild(span);
        });

        return div;
    
    };

    const newElement = createRater(containerElement);
    containerElement.replaceWith(newElement);
    const ratingElement = document.querySelector('div#' + newElement.id);

    const stars = ratingElement.querySelectorAll('.star');

    const setRating = ev => {
        ratingElement.setAttribute(
            'data-rating',
            ev.currentTarget.getAttribute('data-value')
        );
    };

    const ratingHover = ev => {
        const currentHover = ev.currentTarget.getAttribute('data-value');
        highlightRating(currentHover);

    };

    const resetRating = ev => {
        const currentRating = ratingElement.getAttribute('data-rating');
        highlightRating(currentRating);
    }

    const highlightRating = (rating) => {
        stars.forEach(star => {
            
            star.style.color = 
                rating >= star.getAttribute('data-value') ? 'yellow' : 'gray';
        });
    };

    resetRating();




    stars.forEach(star => {
        star.addEventListener('click', setRating);
        star.addEventListener('mouseover', ratingHover);
    });

    ratingElement.addEventListener('mouseout', resetRating);

}