import { contains } from 'cypress/types/jquery';
import { validateContains } from './common';

export const selectors = {
    menuButton: '.StyledBox-sc-13pk1d4-0 > .StyledIcon-ofa7kd-0:first',
    closeMenuButton: ':nth-child(1) > .StyledButton-sc-323bzc-0 > .StyledBox-sc-13pk1d4-0 > .StyledIcon-ofa7kd-0',
    navigationMenuItems: '.eSaWHE > .hrGwMH > .StyledButton-sc-323bzc-0 > .StyledBox-sc-13pk1d4-0',
};

export const navigationItems = ['Admin', 'Client', 'Home'];

export function toggleNavigationMenu(visible = false): void {
    if (visible) {
        cy.get(selectors.menuButton).click();
        cy.get(selectors.navigationMenuItems).should('exist');
    } else {
        cy.get(selectors.closeMenuButton).click();
        cy.get(selectors.navigationMenuItems).should('not.exist');
    }
}

export function verifyNavigationContent(): void {
    navigationItems.forEach((item) => {
        cy.get(`${selectors.navigationMenuItems}:contains(${item})`).should('exist');
    });
}

export function selectNavigationMenuItem(item: string): void {
    cy.get(`${selectors.navigationMenuItems}:contains(${item})`).click();
}
