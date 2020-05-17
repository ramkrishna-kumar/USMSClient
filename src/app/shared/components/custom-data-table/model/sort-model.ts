import { SortSequence } from '../enum/sort-sequentce';

export class SortModel {

    constructor(sortColumnName: string, sortSequence: SortSequence) {
        this.sortColumnName = sortColumnName;
        this.sortSequence = sortSequence;
    }
    sortColumnName: string;
    sortSequence: SortSequence;
}