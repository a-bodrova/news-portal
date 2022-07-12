import './alphabet.css';
import { IAlphabet } from '../../../common/interfaces';
import { sourcesStore } from '../../../stores/sourcesStore';

export default class Alphabet implements IAlphabet {
  container: HTMLElement | null;

  constructor() {
    this.container = document.querySelector('.alphabet');
  }
  draw(data: string[]): void {
    if (this.container) {
      this.container.innerHTML = '';
      data.forEach((letter) => {
        const button = document.createElement('span');
        if (sourcesStore.sortedSources[letter.toLowerCase()].length) {
          button.className = 'letter-btn';
        } else {
          button.className = 'letter-btn disabled';
        }
        button.id = letter;
        button.textContent = letter;
        (this.container as HTMLElement).append(button);
      });
    }
  }
}
