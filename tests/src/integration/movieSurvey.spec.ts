import {
    closeInitialSurveyModal,
    navigateToHomepage,
    openInitialSurveyModal,
    selectRatings,
} from '../models/homepage/homepage';

describe('movie survey', () => {
    before(() => navigateToHomepage());

    const movieTitles: string[] = [
        'Wedding Crashers',
        'Toy Story',
        'The Social Network',
        'Whiplash',
        'What Happened to Monday?',
    ];

    it('can open initial survey modal', () => {
        openInitialSurveyModal();
    });

    it('can select ratings', () => {
        selectRatings();
    });

    it('can open initial survey modal', () => {
        closeInitialSurveyModal();
    });
});
