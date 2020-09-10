const template  = document.createElement('template');
template.innerHTML = `
    <style>
    .star-rater .star {
    font-size: 5rem;
    color: gray;
    }
    </style>
    <div class="star-rater" data-rating="" role="rater">
        <span class="star" data-value="1">★</span>
        <span class="star" data-value="2">★</span>
        <span class="star" data-value="3">★</span>
        <span class="star" data-value="4">★</span>
        <span class="star" data-value="5">★</span>
    </div>

`;

class UserRater extends HTMLElement {
    starRater = 'div.star-rater';
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});    
    }

    render() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const stars = this.shadowRoot.querySelectorAll('.star');
        
        const divRater = this.shadowRoot.querySelector(this.starRater);

        divRater.id = this.getAttribute('id');
        divRater.setAttribute('data-rating', this.getAttribute('data-default'));

        this.resetRating();

    }

    highlightRating(rating) {
        const stars = this.shadowRoot.querySelectorAll('.star');
        stars.forEach(star => {
            star.style.color = 
                rating >= star.getAttribute('data-value') ? 'yellow' : 'gray';
        });
    };

    setRating(ev) {
        this.shadowRoot.querySelector(this.starRater).setAttribute(
            'data-rating',
            ev.currentTarget.getAttribute('data-value')
        );
    };

    ratingHover(ev) {
        const currentHover = ev.currentTarget.getAttribute('data-value');
        this.highlightRating(currentHover);

    };

    resetRating() {
        const currentRating = this.shadowRoot.querySelector(this.starRater).getAttribute('data-rating');
        this.highlightRating(currentRating);
    };

    connectedCallback() {
        this.render();

        this.shadowRoot.addEventListener('mouseout', () => this.resetRating());

        const stars = this.shadowRoot.querySelectorAll('.star');

        stars.forEach(star => {
            star.addEventListener('click', (ev) => this.setRating(ev));
            star.addEventListener('mouseover', (ev) => this.ratingHover());
        });
    }
}

window.customElements.define('user-rater', UserRater);