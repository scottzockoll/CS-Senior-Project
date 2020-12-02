import { fillTextInput, validateContains } from '../common/common';

export const messages = {
    headerMessage: 'Welcome to FlickPick!',
    movieModalHeader: 'Movie Information',
    takeAMovieSurvey: 'Take a Movie Survey',
    go: 'Go',
    close: 'Close',
    submit: 'Submit',
    movieSurvey: 'Movie Survey',
    description: 'We want to provide you with the best possible content and recommendations',
};

export const selectors = {
    header: `.StyledHeading-sc-1rdh4aw-0:contains(${messages.headerMessage})`,
    movieSearch: '.StyledTextInput-sc-1x30a0s-0',
    goButton: `.gHIFjI > .StyledButton-sc-323bzc-0:contains(${messages.go})`,
    takeAMovieSurveyButton: `.gjLUkY:contains(${messages.takeAMovieSurvey})`,
    movieModalSelectors: {
        header: `.Exrhr > .ApBkK > h1:contains(${messages.movieModalHeader})`,
        closeButton: `.gwuqRp:contains(${messages.close})`,
    },
    initialSurveyModalSelectors: {
        header: `.hctKMK > h1:contains(${messages.movieSurvey})`,
        description: 'text',
        submitButton: `.eywOwc:contains(${messages.submit})`,
    },
};

const homepageUrl = 'http://localhost:3000/';

export function navigateToHomepage(): void {
    cy.visit(homepageUrl);
    validateContains(selectors.header, messages.headerMessage);
}

export function searchForMovie(movieTitle: string): void {
    fillTextInput(selectors.movieSearch, movieTitle);
    clickGoButton();
}

export function clickGoButton(): void {
    cy.get(selectors.goButton).click();
}

export function closeMovieModal(): void {
    cy.get(selectors.movieModalSelectors.closeButton).click();
    cy.get(selectors.movieModalSelectors.closeButton).should('not.exist');
    cy.get(selectors.header).should('exist');
}

export function openInitialSurveyModal(): void {
    cy.get(selectors.takeAMovieSurveyButton).click();
    cy.get(selectors.initialSurveyModalSelectors.header).should('exist');
    validateContains(selectors.initialSurveyModalSelectors.description, messages.description);
}

export function fillInitialSurvey(titles: string[]): void {
    let child: number = 3;
    titles.forEach((title) => {
        cy.get(
            `:nth-child(${child}) > .eBeIbe > .StyledBox-sc-13pk1d4-0 > .StyledTextInput__StyledTextInputContainer-sc-1x30a0s-1 > .StyledTextInput-sc-1x30a0s-0`
        )
            .clear()
            .type(title);
            child++;
    });
    cy.get(selectors.initialSurveyModalSelectors.submitButton).click();
    cy.get(selectors.initialSurveyModalSelectors.header).should('not.exist');
}
