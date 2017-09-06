import { types, process } from "mobx-state-tree";

// interface RedditStoryData {
//     domain: string;
//     subreddit: string;
//     title: string;
//     permalink: string;
//     url: string;
//     author: string;
//     num_comments: number;
// }

interface RedditStory {
    kind: string;
    data: typeof Subreddit.Type;
}

interface RedditResponseData {
    children: RedditStory[];
}

interface RedditResponse {
    kind: string;
    data: RedditResponseData;
}

const Subreddit = types.model({
    domain: types.string,
    subreddit: types.string,
    title: types.string,
    permalink: types.string,
    url: types.string,
    author: types.string,
    num_comments: types.number
});

const SubredditStore = types.model({
    subs: types.map(Subreddit),
    count: types.number
}).actions((self) => {
    const addData = (sub: string, data: typeof Subreddit.Type) => {
        self.subs.set(sub, data)
    }

    function* fetchSub(subreddit: string) {
        if (self.subs.get(subreddit)) {
            return;
        }

        try {
            const sub: RedditResponse = yield fetch(`https://www.reddit.com/r/${subreddit}.json`)
                .then(res => res.json());
            self.subs.set(subreddit, sub.data.children[0].data);
        } catch (e) {
            console.error(e);
        }
    }

    return { addData, fetchSub: process(fetchSub) };
});

export const subredditStore = SubredditStore.create({
    subs: {},
    count: 0
});
