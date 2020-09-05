import { Rater } from './rater.js';

document.addEventListener('DOMContentLoaded', function(){
    const raters = document.querySelectorAll('Rater');
    raters.forEach(rater => {
        new Rater(rater);
    });
});