import { toggleNavigationMenu, selectNavigationMenuItem, verifyNavigationContent } from '../models/common/navigationBar';
import { navigateToHomepage } from '../models/homepage/homepage';

describe('navigation bar', () => {
    before(() => navigateToHomepage());

    it('can expand navigation menu', () => {
        toggleNavigationMenu(true);
    });

    it('can close navigation menu', () => {
        toggleNavigationMenu();
    });

//     it('can verify navigation items exist', () => {
//         verifyNavigationContent();
//     });

//     it('can navigate to client page', () => {
//         selectNavigationMenuItem('Client');
//     });
});
