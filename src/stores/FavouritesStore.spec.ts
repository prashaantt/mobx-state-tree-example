import tape = require("tape");
import { FavouritesStore } from "./FavouritesStore";

tape("FavouritesStore", t => {
    t.test("initialises correctly", assert => {
        const store = FavouritesStore.create({
            starredInSub: {
                "javascript": {
                    starredPostIds: ["123"]
                }
            }
        });
        assert.equal(store.starredInSub.get("javascript")!.starredPostIds[0], "123");
        assert.end();
    });

    t.test("toggles starred posts", assert => {
        const store = FavouritesStore.create({
            starredInSub: {
                "javascript": {
                    starredPostIds: ["123"]
                }
            }
        });
        store.toggleStar("javascript", "123")
        assert.equal(store.starredInSub.get("javascript")!.starredPostIds.length, 0);
        store.toggleStar("javascript", "123")
        assert.equal(store.starredInSub.get("javascript")!.starredPostIds[0], "123");
        assert.end();
    });

    t.test("reports if any posts across any subs are starred", assert => {
        const store = FavouritesStore.create({
            starredInSub: {}
        });
        assert.false(store.anyStarred);
        store.toggleStar("javascript", "123")
        assert.true(store.anyStarred);
        assert.end();
    });
});
