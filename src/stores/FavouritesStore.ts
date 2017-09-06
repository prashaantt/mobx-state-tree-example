import { types } from "mobx-state-tree";

const SubredditStars = types.model({
    starredPostIds: types.array(types.string)
});

export const FavouritesStore = types.model({
    starredInSub: types.map(SubredditStars)
}).actions(self => ({
    toggleStar(subreddit: string, postId: string) {
        const favourites = self.starredInSub.get(subreddit);
        if (favourites) {
            const found = favourites.starredPostIds.find(pId => pId === postId);
            if (found) {
                favourites.starredPostIds.remove(postId);
            } else {
                favourites.starredPostIds.push(postId);
            }
        } else {
            self.starredInSub.set(subreddit, { starredPostIds: [postId] } as any);
        }
    }
}));


export const favouritesStore = FavouritesStore.create({
    starredInSub: {}
});