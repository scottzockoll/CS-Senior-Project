
export function validateContains(selector: string, text: string): void {
    cy.get(selector).should('contain', text);
}