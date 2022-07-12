import { ALPHABET } from '../common/constants';
import { DataSources, SortedSource } from '../common/interfaces';

class SourcesStore {
  private _alphabet: string[] = [];
  private _sortedSources: SortedSource = {};
  private _data: DataSources[] = [];

  set alphabet(arr: string[]) {
    this._alphabet = arr;
  }

  get alphabet() {
    // return Object.keys(this.sortedSources) || ALPHABET.split('');
    return ALPHABET.split('');
  }

  set data(data: DataSources[]) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  get sortedSources() {
    // const sours = this.data.reduce((sources: SortedSource, source) => {
    //   const firstLetter = source.name[0].toLowerCase();
    //   if (sources[firstLetter]) {
    //     sources[firstLetter].push(source);
    //   } else {
    //     sources[firstLetter] = [];
    //     sources[firstLetter].push(source);
    //   }

    //   return sources;
    // }, {});

    const sours = this.alphabet.reduce((acc: SortedSource, item) => {
      const currentLetterData = this.data.filter(
        (data) => data.name[0].toLowerCase() === item.toLowerCase()
      );

      acc[item.toLowerCase()] = [...currentLetterData];

      return acc;
    }, {});
    return sours;
  }
}

export const sourcesStore = new SourcesStore();
