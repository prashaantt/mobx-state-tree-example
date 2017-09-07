import { ISnapshottable, onSnapshot, applySnapshot } from "mobx-state-tree";

export class TimeTraveller<S, T> {
    states: S[] = [];
    currentFrame = 0;
    store: T & ISnapshottable<S>;

    constructor(store: T & ISnapshottable<S>, initialState: S) {
        this.store = store;
        this.states = [initialState];

        this.setOnShapshot(store);
    }

    previousState() {
        if (this.currentFrame >= 0) {
            this.currentFrame = this.currentFrame - 1;
            applySnapshot(this.store, this.states[this.currentFrame]);
        }
    }

    nextState() {
        if (this.states.length - 1 > this.currentFrame) {
            applySnapshot(this.store, this.states[this.currentFrame + 1]);
            this.currentFrame += 1;
        }
    }

    hasPrevious() {
        return this.currentFrame > 0;
    }

    hasNext() {
        return this.states.length - 1 > this.currentFrame;
    }

    private setOnShapshot(store: T & ISnapshottable<S>) {
        onSnapshot(store, snapshot => {
            if (this.currentFrame === this.states.length - 1) {
                this.currentFrame++;
                this.states[this.currentFrame] = snapshot;
            }
        });
    }
}
