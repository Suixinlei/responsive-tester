// components/GridItem.tsx
"use client"

import React from 'react'
import { Loader2 } from 'lucide-react'

import { cn } from "@/lib/utils"
import { GridItemTitle } from './GridItemTitle'

interface GridItemChildrenHolderProps extends React.HTMLAttributes<HTMLDivElement> {
  height: number
  width: number
  zoom: number
}

const GridItemChildrenHolder = React.forwardRef<HTMLDivElement, GridItemChildrenHolderProps>(
  ({ height, width, zoom, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("origin-top-left", className)}
      style={{
        height: `${height}px`,
        width: `${width}px`,
        transform: `scale(${zoom})`,
        minHeight: `${height}px`,
        maxHeight: `${height}px`,
        minWidth: `${width}px`,
        maxWidth: `${width}px`,
      }}
      {...props}
    />
  )
)
GridItemChildrenHolder.displayName = "GridItemChildrenHolder"

interface WebViewProps {
  url: string | null
  errorView?: React.ReactNode
  shouldShowLoadingSpinner?: boolean
  onLoadingChanged?: (isLoading: boolean) => void
}

const WebView = ({ url, onLoadingChanged, errorView }: WebViewProps) => {
  const handleLoad = () => onLoadingChanged?.(false)
  const handleError = () => onLoadingChanged?.(false)

  if (!url) return null

  return (
    <iframe
      src={url}
      className="w-full h-full border-0"
      onLoad={handleLoad}
      onError={handleError}
    />
  )
}

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
  onSizeChanged: (itemId: string, width: number, height: number, zoom: number, deviceCode: string | null) => void
}

export const GridItem = ({
  itemId,
  url,
  initialHeight = 100,
  initialWidth = 100,
  initialZoom = 1,
  initialDeviceCode,
  minimumWidth = 100,
  dragHandleClass,
  isIframeBlocked,
  onCloseClicked,
  onSizeChanged,
}: GridItemProps) => {
  const [height, setHeight] = React.useState<number>(initialHeight)
  const [width, setWidth] = React.useState<number>(initialWidth)
  const [zoom, setZoom] = React.useState<number>(initialZoom)
  const [isWebViewLoaded, setIsWebViewLoaded] = React.useState<boolean>(false)

  const handleSizeChange = React.useCallback((height: number, width: number, zoom: number, deviceCode: string | null) => {
    setHeight(height)
    setWidth(width)
    setZoom(zoom)
    onSizeChanged(itemId, width, height, zoom, deviceCode)
  }, [itemId, onSizeChanged])

  const handleClose = () => {
    onCloseClicked(itemId)
  }

  const handleWebViewLoad = (isLoading: boolean) => {
    setIsWebViewLoaded(!isLoading)
  }

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
        
        <div className="flex-1 flex items-center justify-center w-full">
          {isIframeBlocked ? (
            <div className="max-w-md px-6 text-center">
              <h3 className="text-lg font-semibold text-destructive mb-4">Oh no!</h3>
              <p className="text-sm text-muted-foreground">
                {url} doesn't support iframes, which we use to ensure your privacy 🔒
                <br />
                If you're developing it, use localhost and everything should work 👌
              </p>
            </div>
          ) : (
            <>
              {!isWebViewLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
                </div>
              )}
              <div 
                className={cn(
                  "w-full overflow-hidden transition-all duration-200",
                  isWebViewLoaded ? "opacity-100" : "opacity-0"
                )}
                style={{
                  width: `calc(${width}px * 1.0 / ${zoom})`,
                  height: isWebViewLoaded ? `calc(${height}px * 1.0 / ${zoom})` : '0',
                }}
              >
                <GridItemChildrenHolder
                  width={width}
                  height={height}
                  zoom={1.0 / zoom}
                >
                  <WebView
                    url={url}
                    errorView={<div className="p-4 text-sm text-destructive">Error loading content</div>}
                    onLoadingChanged={handleWebViewLoad}
                  />
                </GridItemChildrenHolder>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
