// components/Grid.tsx
"use client";

import React from 'react';
import { Layout } from 'react-grid-layout';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';

import { cn } from "@/lib/utils";
import { GridItem } from '@/components/GridItem';
import { GridBackground } from '@/components/GridBackground';
import { IBox } from '@/lib/model';

import './Grid.css';

const DRAG_HANDLE_CLASS = 'drag-handle';

interface GridProps {
  rowHeight: number
  columnWidth: number
  paddingSize: number
  totalWidth: number
  columnCount: number
  minimumGridItemWidth: number
  url: string
  boxes: IBox[]
  onBoxCloseClicked: (itemId: string) => void
  onBoxSizeChanged: (itemId: string, width: number, height: number, zoom: number, deviceCode: string | null) => void
  onBoxPositionChanged: (itemId: string, positionX: number, positionY: number) => void
}

async function checkIframeBlocking(url: string): Promise<boolean> {
  try {
    const response = await fetch('https://api.kiba.dev/v1/retrieve-headers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    const frameHeaders = data.headers.filter((header: {key: string, value: string}) => 
      header.key === 'x-frame-options'
    );
    return frameHeaders.length > 0 && !frameHeaders[0].value.includes('https://everysize-app.kibalabs.com');
  } catch (error) {
    console.error('Error checking iframe headers:', error);
    return false;
  }
}

export const Grid = ({
  rowHeight,
  columnWidth,
  paddingSize,
  totalWidth,
  columnCount,
  minimumGridItemWidth,
  url,
  boxes,
  onBoxCloseClicked,
  onBoxSizeChanged,
  onBoxPositionChanged,
}: GridProps) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [isIframeBlocked, setIsIframeBlocked] = React.useState(false);

  const getColumnCount = (width: number): number => {
    const estimate = Math.ceil(width / (columnWidth + paddingSize));
    return (estimate * columnWidth) + ((estimate - 1) * paddingSize) >= width 
      ? estimate 
      : estimate + 1;
  };

  const getRowCount = (height: number): number => {
    const estimate = Math.ceil(height / (rowHeight + paddingSize));
    return (estimate * rowHeight) + ((estimate - 1) * paddingSize) >= height 
      ? estimate 
      : estimate + 1;
  };

  const getLayout = (): Layout[] => {
    return boxes.map((box: IBox): Layout => ({
      i: box.itemId,
      x: box.positionX,
      y: box.positionY,
      w: getColumnCount(Math.max(box.width / box.zoom, minimumGridItemWidth)),
      h: getRowCount((box.height / box.zoom) + 75),
      isResizable: false,
    }));
  };

  const handleLayoutChange = (layouts: Layout[]): void => {
    layouts.forEach((layout: Layout): void => {
      const currentBox = boxes.find((box: IBox) => box.itemId === layout.i);
      if (currentBox && (currentBox.positionX !== layout.x || currentBox.positionY !== layout.y)) {
        onBoxPositionChanged(currentBox.itemId, layout.x, layout.y);
      }
    });
  };

  React.useEffect(() => {
    checkIframeBlocking(url).then(setIsIframeBlocked);
  }, [url]);

  return (
    <div className={cn(
      "relative w-full h-full",
      "max-w-[var(--total-width)]"
    )}
      style={{ '--total-width': `${totalWidth}px` } as React.CSSProperties}
    >
      {isDragging && (
        <GridBackground 
          paddingSize={paddingSize} 
          rowHeight={rowHeight} 
          columnWidth={columnWidth} 
        />
      )}
      
      {/* @ts-expect-error react-grid-layout types are not compatible with latest React types */}
      <GridLayout
        className="layout"
        cols={columnCount}
        width={totalWidth}
        rowHeight={rowHeight}
        margin={[paddingSize, paddingSize]}
        layout={getLayout()}
        onLayoutChange={handleLayoutChange}
        onDragStart={() => setIsDragging(true)}
        onDragStop={() => setIsDragging(false)}
        draggableHandle={`.${DRAG_HANDLE_CLASS}`}
      >
        {boxes.map((box: IBox) => (
          <div key={box.itemId}>
            <GridItem
              itemId={box.itemId}
              url={url}
              isIframeBlocked={isIframeBlocked}
              columnWidth={columnWidth}
              rowHeight={rowHeight}
              paddingSize={paddingSize}
              initialHeight={box.height}
              initialWidth={box.width}
              initialZoom={box.zoom}
              initialDeviceCode={box.deviceCode}
              minimumWidth={minimumGridItemWidth}
              onCloseClicked={onBoxCloseClicked}
              onSizeChanged={onBoxSizeChanged}
              dragHandleClass={DRAG_HANDLE_CLASS}
            />
          </div>
        ))}
      </GridLayout>
    </div>
  );
};
