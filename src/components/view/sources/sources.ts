import './sources.css';
import { IDataDrawer, DataSources } from '../../../common/interfaces';

class Source implements IDataDrawer<ReadonlyArray<DataSources>> {
  draw(data: ReadonlyArray<DataSources>) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp');

    if (sourceItemTemp) {
      data.forEach((item) => {
        const sourceClone = (sourceItemTemp as HTMLTemplateElement).content.cloneNode(
          true
        ) as HTMLElement;

        const itemName = sourceClone.querySelector('.source__item-name');
        if (itemName) itemName.textContent = item.name;

        const sourceItem = sourceClone.querySelector('.source__item');
        if (sourceItem) sourceItem.setAttribute('data-source-id', `${item.id}`);

        fragment.append(sourceClone);
      });
    }

    const sources = document.querySelector('.sources');
    if (sources) {
      sources.innerHTML = '';
      sources.append(fragment);
    }
  }
}

export default Source;
