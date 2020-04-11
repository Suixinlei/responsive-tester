import React from 'react';

import { WebView } from './webView';
import { GridItem } from './gridItem';

interface IBox {
  itemId: string;
  height: number;
  width: number;
  zoom: number;
}

function App() {
  const [nextItemId, setNextItemId] = React.useState<number>(1);
  const [url, setUrl] = React.useState<string>('https://kiwidocs.co');
  const [boxes, setBoxes] = React.useState<IBox[]>([{itemId: String(nextItemId), height: 500, width: 750, zoom: 1}]);

  const onUrlChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(event.target.value);
  };

  const onAddClicked = (): void => {
    setBoxes([...boxes, {itemId: String(nextItemId), height: 500, width: 750, zoom: 1}]);
    setNextItemId(nextItemId + 1);
  };

  const onBoxCloseClicked = (itemId: string): void => {
    setBoxes(boxes.filter((box: IBox): boolean => box.itemId !== itemId));
  }

  return (
    <React.StrictMode>
      <input value={url} onChange={onUrlChanged} />
      <hr />
      <button onClick={onAddClicked}>add</button>
      <hr />
      { boxes.map((box: IBox, index: number): React.ReactElement => (
        <GridItem key={index} itemId={box.itemId} initialHeight={box.height} initialWidth={box.width} initialZoom={box.zoom} onCloseClicked={onBoxCloseClicked}>
          <WebView url={url} errorView={<div>Error</div>}/>
        </GridItem>
      ))}
    </React.StrictMode>
  );
}

export default App;
