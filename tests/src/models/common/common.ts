
export function validateContains(selector: string, text: string): void {
    cy.get(selector).should('contain', text);
}

export function validateHaveValue(selector: string, text: string): void {
    cy.get(selector).should('have.value', text);
}

export function fillTextInput(selector: string, text: string): void {
    cy.get(`${selector}:input`).clear().type(text);
    validateHaveValue(selector, text);
}