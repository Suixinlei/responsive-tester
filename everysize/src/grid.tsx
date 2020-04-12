import React from 'react';
import styled from 'styled-components';
import GridLayout, { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { WebView } from './webView';
import { GridItem } from './gridItem';
import { GridBackground } from './gridBackground';
import { IBox } from './model';


const GridItemWrapper = styled.div`
  overflow: hidden;
  border-radius: 4px;
  background-color: #333333;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

interface IGridProps {
  rowHeight: number;
  columnWidth: number;
  paddingSize: number;
  totalWidth: number;
  columnCount: number;
  url: string;
  boxes: IBox[];
  onBoxCloseClicked: (itemId: string) => void;
  onBoxSizeChanged: (itemId: string, width: number, height: number) => void;
  onBoxPositionChanged: (itemId: string, positionX: number, positionY: number) => void;
}

export const Grid = (props: IGridProps): React.ReactElement => {
  const [isDragging, setIsDragging] = React.useState(false);

  const onBoxCloseClicked = (itemId: string): void => {
    props.onBoxCloseClicked(itemId);
  }

  const onBoxSizeChanged = (itemId: string, width: number, height: number) => {
    props.onBoxSizeChanged(itemId, width, height);
  };

  const onLayoutChanged = (layouts: Layout[]): void => {
    layouts.forEach((layout: Layout): void => {
      const currentBox = props.boxes.filter((box: IBox): boolean => box.itemId === layout.i)[0];
      if (currentBox.positionX !== layout.x || currentBox.positionY !== layout.y) {
        props.onBoxPositionChanged(currentBox.itemId, layout.x, layout.y);
      }
    });
  };

  const getColumnCount = (width: number): number => {
    // TODO(krish): the 0.00001 is because if the division lands on a whole number
    // it will be wrong because there is an extra padding taken into account which wont be there
    return Math.ceil(width / (props.rowHeight + props.paddingSize) + 0.000001);
  }

  const getRowCount = (height: number): number => {
    return Math.ceil(height / (props.columnWidth + props.paddingSize) + 0.00001);
  }

  const getLayout = (): Layout[] => {
    return props.boxes.map((box: IBox): Layout => {
      return {
        i: box.itemId,
        x: box.positionX,
        y: box.positionY,
        w: getColumnCount(box.width),
        h: getRowCount(box.height),
        isResizable: false,
      };
    });
  };

  const onDragStarted = (): void => {
    setIsDragging(true);
  };

  const onDragStopped = (): void => {
    setIsDragging(false);
  };

  return (
    <div style={{position: 'relative', maxWidth: `${props.totalWidth}px`}}>
      {isDragging && (
        <GridBackground paddingSize={props.paddingSize} rowHeight={props.rowHeight} columnWidth={props.columnWidth} />
      )}
      <GridLayout
        className="layout"
        cols={props.columnCount}
        width={props.totalWidth}
        rowHeight={props.rowHeight}
        margin={[props.paddingSize, props.paddingSize]}
        layout={getLayout()}
        onLayoutChange={onLayoutChanged}
        onDragStart={onDragStarted}
        onDragStop={onDragStopped}
      >
        { props.boxes.map((box: IBox): React.ReactElement => (
          <GridItemWrapper key={box.itemId}>
            <GridItem
              itemId={box.itemId}
              columnWidth={props.columnWidth}
              rowHeight={props.rowHeight}
              paddingSize={props.paddingSize}
              initialHeight={box.initialHeight}
              initialWidth={box.initialWidth}
              initialZoom={box.zoom}
              onCloseClicked={onBoxCloseClicked}
              onSizeChanged={onBoxSizeChanged}
            >
              <WebView
                url={props.url}
                errorView={<div>Error</div>}
              />
            </GridItem>
          </GridItemWrapper>
        ))}
      </GridLayout>
    </div>
  );
};