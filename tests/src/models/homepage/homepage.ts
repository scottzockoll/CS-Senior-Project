import { validateContains } from "../common/validation";

export const selectors = {
    header: ".StyledHeading-sc-1rdh4aw-0",
}

export const messages = {
    headerMessage: "Welcome to FlickPick!"
}

const homepageUrl = 'http://localhost:3000/';

export function navigateToHomepage(): void {
    cy.visit(homepageUrl);
    validateContains(selectors.header, messages.headerMessage);
}