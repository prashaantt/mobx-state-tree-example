import tape = require("tape");
import { SubredditStore } from "./SubredditStore";

const testData = {
    data: {
        author: "bemmu",
        domain: "jroweboy.github.io",
        id: "6z0dqv",
        num_comments: 144,
        permalink: "/r/programming/comments/6z0dqv/main_is_usually_a_function_so_then_when_is_it_not/",
        subreddit: "programming",
        title: "Main is usually a function. So then when is it not?",
        url: "http://jroweboy.github.io/c/asm/2015/01/26/when-is-main-not-a-function.html"
    }
};

tape("SubredditStore", t => {
    t.test("initialises correctly for the correct data structure", assert => {
        const store = SubredditStore.create({
            subs: {
                programming: [testData]
            }
        })
        assert.deepEqual(store.subs.get("programming")![0], testData);
        assert.end();
    });

    t.test("stores the data fetched from a remote server", async (assert) => {
        const store = SubredditStore.create({ subs: {} });

        const doFetch = (url: string) => Promise.resolve({ json() { return { data: { children: [testData] } } } });
        await (<any>store.fetchSub)("programming", doFetch);
        assert.deepEqual(store.subs.get("programming")![0], testData);
        assert.end();
    });
});
