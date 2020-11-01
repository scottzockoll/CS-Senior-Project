export interface Tag {
    id: number;
    name: string;
    movieId: number;
}

export interface Recommendations {
    movieIds: Array<number>;
}

export const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS';

export interface GetRecommendationAction {
    type: typeof GET_RECOMMENDATIONS;
    userId: number;
}
