export class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(fn) {
        this.observers.push(fn);
    }

    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}