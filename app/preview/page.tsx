'use client';
import React, { useState, Suspense } from 'react';
import { useLocalStorageState } from 'ahooks';
import { useSearchParams, useRouter } from 'next/navigation';

import { ScrollArea } from "@/components/ui/scroll-area";
import { NavBar } from '@/components/NavBar';
import { Grid } from '@/components/Grid';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { IBox, defaultLayout, createDefaultDevice } from '@/lib/model';

const useElementSize = () => {
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const ref = React.useCallback((node: HTMLElement | null) => {
    if (node) {
      const observer = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setSize({ width, height });
      });
      observer.observe(node);
      return () => observer.disconnect();
    }
  }, []);

  return [size, ref] as const;
};

function GridContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [size, gridRef] = useElementSize();
  const [boxes, setBoxes] = useLocalStorageState<IBox[]>('boxes_v2', {
    defaultValue: defaultLayout,
    onError: (error) => {
      console.error('Error loading boxes from localStorage:', error);
      setBoxes(defaultLayout);
    }
  });
  const [storedUrl, setStoredUrl] = useState('https://www.kouka.tech');

  const [totalWidth, setTotalWidth] = React.useState(10000);

  const rowHeight = 20;
  const columnWidth = 20;
  const paddingSize = 10;
  const minimumGridItemWidth = 250;
  const columnCount = Math.floor((totalWidth - paddingSize) / (columnWidth + paddingSize));

  const url = searchParams.get('url') || storedUrl;

  React.useEffect(() => {
    if (size) {
      setTotalWidth(Math.floor((size.width - paddingSize) / (columnWidth + paddingSize)) * (columnWidth + paddingSize) - (2 * paddingSize));
    }
  }, [size]);

  const onUrlChanged = (newUrl: string) => {
    setStoredUrl(newUrl);
    router.push(`?url=${encodeURIComponent(newUrl)}`);
  };

  const onAddClicked = () => {
    if (boxes) {
      setBoxes([...boxes, createDefaultDevice()]);
    }
  };

  const onRemoveBoxClicked = (itemId: string) => {
    if (boxes) {
      setBoxes(boxes.filter((box: IBox) => box.itemId !== itemId));
    }
  };

  const onBoxSizeChanged = React.useCallback((itemId: string, width: number, height: number, zoom: number, deviceCode: string | null) => {
    if (boxes) {
      setBoxes(boxes.map((box: IBox): IBox => (
        box.itemId === itemId ? {...box, width, height, zoom, deviceCode} : box
      )));
    }
  }, [JSON.stringify(boxes)]);

  const onBoxPositionChanged = (itemId: string, positionX: number, positionY: number) => {
    if (boxes) {
      setBoxes(boxes.map((box: IBox): IBox => (
        box.itemId === itemId ? {...box, positionX, positionY} : box
      )));
    }
  };

  if (!boxes) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col">
      <NavBar 
        url={url || ''} 
        onUrlChanged={onUrlChanged}
      />
      <div className="flex-1" ref={gridRef}>
        <ScrollArea className="h-full">
          <Grid
            rowHeight={rowHeight}
            columnWidth={columnWidth}
            paddingSize={paddingSize}
            totalWidth={totalWidth}
            minimumGridItemWidth={minimumGridItemWidth}
            columnCount={columnCount}
            url={url || ''}
            boxes={boxes}
            onBoxCloseClicked={onRemoveBoxClicked}
            onBoxSizeChanged={onBoxSizeChanged}
            onBoxPositionChanged={onBoxPositionChanged}
          />
        </ScrollArea>
      </div>
      <FloatingActionButton onClick={onAddClicked} bottomOffset="30px" />
    </div>
  );
}

export default function GridPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GridContent />
    </Suspense>
  );
}