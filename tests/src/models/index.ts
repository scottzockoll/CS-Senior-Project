//imports

const selectors = {
  toolbar: '[data-test=toolbar]',
}

enum ToolbarItems {
  Home = 'home',
  SignIn = 'signIn',
  SignUp = 'signUp',
}

export function clickToolbarItem(toolbarItem: ToolbarItems) {
  cy
    .get(`${selectors.toolbar} [data-test=${toolbarItem}]`)
    .should('exist')
    .click();
}
