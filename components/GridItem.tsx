// components/GridItem.tsx
"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';

import { cn } from "@/lib/utils";
import { GridItemTitle } from './GridItemTitle';
import { IBox } from '@/lib/model';
import { WebView } from './WebView';

interface GridItemChildrenHolderProps extends React.HTMLAttributes<HTMLDivElement> {
  height: number
  width: number
  zoom: number
}

const GridItemChildrenHolder = React.forwardRef<HTMLDivElement, GridItemChildrenHolderProps>(
  ({ height, width, zoom, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("origin-top-left absolute top-0 left-0", className)} // 添加绝对定位
      style={{
        height: `${height}px`,
        width: `${width}px`,
        transform: `scale(${zoom})`,
        padding: '1px',
      }}
      {...props}
    />
  )
);
GridItemChildrenHolder.displayName = "GridItemChildrenHolder";



interface GridItemProps {
  itemId: string
  url: string | null
  initialHeight: number
  initialWidth: number
  initialZoom: number
  initialDeviceCode: string | null
  minimumWidth: number
  columnWidth: number
  rowHeight: number
  paddingSize: number
  dragHandleClass?: string
  isIframeBlocked: boolean
  onCloseClicked: (itemId: string) => void
  onSizeChanged: (itemId: string, width: number, height: number, zoom: number, deviceCode: string | null) => void;
  box: IBox;
}

export const GridItem = ({
  itemId,
  url,
  initialHeight = 100,
  initialWidth = 100,
  initialZoom = 1,
  initialDeviceCode,
  dragHandleClass,
  isIframeBlocked,
  onCloseClicked,
  onSizeChanged,
  box,
}: GridItemProps) => {
  const [height, setHeight] = React.useState<number>(initialHeight);
  const [width, setWidth] = React.useState<number>(initialWidth);
  const [zoom, setZoom] = React.useState<number>(initialZoom);
  const [isWebViewLoaded, setIsWebViewLoaded] = React.useState<boolean>(false);

  const handleSizeChange = React.useCallback((height: number, width: number, zoom: number, deviceCode: string | null) => {
    setHeight(height);
    setWidth(width);
    setZoom(zoom);
    onSizeChanged(itemId, width, height, zoom, deviceCode);
  }, [itemId, onSizeChanged]);

  const handleClose = () => {
    onCloseClicked(itemId);
  };

  const handleWebViewLoad = (isLoading: boolean) => {
    setIsWebViewLoaded(!isLoading);
  };

  return (
    <div className="bg-background text-foreground h-full w-full rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col h-full w-full items-center">
        <GridItemTitle
          initialHeight={initialHeight}
          initialWidth={initialWidth}
          initialDeviceCode={initialDeviceCode}
          initialZoom={initialZoom}
          onSizeChanged={handleSizeChange}
          onCloseClicked={handleClose}
          dragHandleClass={dragHandleClass}
        />
        
        <div className="flex-1 flex items-center justify-center w-full relative">
          {isIframeBlocked ? (
            <div className="max-w-md px-6 text-center">
              <h3 className="text-lg font-semibold text-destructive mb-4">Oh no!</h3>
              <p className="text-sm text-muted-foreground">
                {`${url} 不支持 iframe，我们使用 iframe 来确保您的隐私安全 🔒`}
                <br />
                {"如果您正在开发中，请使用 localhost，这样就可以正常工作了 👌"}
              </p>
            </div>
          ) : (
            <div className="relative w-full h-full">
              {!isWebViewLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
                </div>
              )}
              <div 
                className={cn(
                  "relative w-full h-full overflow-hidden transition-all duration-200 bg-white",
                  isWebViewLoaded ? "opacity-100" : "opacity-0"
                )}
                style={{
                  width: `${width / zoom}px`,
                  height: isWebViewLoaded ? `${height / zoom}px` : '0',
                }}
              >
                <GridItemChildrenHolder
                  width={width}
                  height={height}
                  zoom={1.0 / zoom}
                >
                  <WebView
                    url={url}
                    box={box}
                    errorView={<div className="p-4 text-sm text-destructive">Error loading content</div>}
                    onLoadingChanged={handleWebViewLoad}
                  />
                </GridItemChildrenHolder>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
