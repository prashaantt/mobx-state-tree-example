import { types, process } from "mobx-state-tree";

export const Story = types.model({
    id: types.string,
    domain: types.string,
    subreddit: types.string,
    title: types.string,
    permalink: types.string,
    url: types.string,
    author: types.string,
    num_comments: types.number
});

const StoryModel = types.model({
    data: types.late(() => Story)
})

const SubredditData = types.model({
    children: types.array(StoryModel)
})

const RedditResponse = types.model({
    data: types.reference(SubredditData)
});

export const SubredditStore = types.model({
    subs: types.optional(types.map(types.array(StoryModel)), {}),
}).actions(self => {
    function* fetchSub(subreddit: string, doFetch = fetch) {
        if (self.subs.get(subreddit)) {
            return;
        }

        try {
            const sub: typeof RedditResponse.Type = yield doFetch(`https://www.reddit.com/r/${subreddit}.json`)
                .then(res => res.json());
            self.subs.set(subreddit, sub.data.children)
        } catch (e) {
            console.error(e);
        }
    }

    return { fetchSub: process(fetchSub) };
});

export const subredditStore = SubredditStore.create({
    subs: {}
});
