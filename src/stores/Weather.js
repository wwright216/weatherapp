import { observable, makeObservable, toJS } from 'mobx';

class WeatherStore {
    constructor() {
        this.items = [];

        makeObservable(this, {
            items: observable,
        });
    }

    get allItems() {
        return toJS( this.items );
    };

    addItem(item) {
        this.items.push(item);
    }
}

export default WeatherStore;
