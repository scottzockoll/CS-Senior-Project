import { validateContains } from '../models/common/common';
import { closeMovieModal, messages, navigateToHomepage, searchForMovie, selectors } from '../models/homepage/homepage';

describe('movie search', () => {
    before(() => navigateToHomepage());

    const movieTitle = 'Toy Story';

    it('can search for movie', () => {
        searchForMovie(movieTitle);
        cy.get(selectors.movieModalSelectors.title).should('exist');
        closeMovieModal();
    });
});
