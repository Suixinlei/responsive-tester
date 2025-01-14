'use client';
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { ScrollArea } from "@/components/ui/scroll-area"
import { NavBar } from '@/components/NavBar'
import { Grid } from '@/components/Grid'
import { FloatingActionButton } from '@/components/FloatingActionButton'
import { IBox, deserializeBox, serializeBox, defaultLayout, createDefaultDevice } from '@/lib/model'

// Helper functions
const boxListFromStringList = (stringList: string[] | null): IBox[] => {
  if (!stringList) {
    return [];
  }
  return stringList?.map((boxString: string): IBox | null => deserializeBox(boxString))
    .filter((box: IBox | null): boolean => box !== null) as IBox[];
}

const boxListToStringList = (boxes: IBox[] | null): string[] | null => {
  if (boxes === null) {
    return null;
  }
  return boxes.map((box: IBox): string => serializeBox(box));
}

// Custom hooks
const useLocalStorage = <T,>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    if (typeof window === "undefined") return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue))
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

const useElementSize = () => {
  const [size, setSize] = React.useState({ width: 0, height: 0 })
  const ref = React.useCallback((node: HTMLElement | null) => {
    if (node) {
      const observer = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect
        setSize({ width, height })
      })
      observer.observe(node)
      return () => observer.disconnect()
    }
  }, [])

  return [size, ref] as const
}

export default function GridPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [size, gridRef] = useElementSize()
  const [boxes, setBoxes] = useLocalStorage<IBox[]>('boxes_v2', [])
  const [storedUrl, setStoredUrl] = useLocalStorage('url_v1', '')
  const [startTime] = React.useState<Date>(new Date())

  const [totalWidth, setTotalWidth] = React.useState(10000)
  const rowHeight = 20
  const columnWidth = 20
  const paddingSize = 10
  const minimumGridItemWidth = 250
  const columnCount = Math.floor((totalWidth - paddingSize) / (columnWidth + paddingSize))

  const url = searchParams.get('url') || storedUrl

  React.useEffect(() => {
    if (!url && !storedUrl) {
      router.push('?url=https://www.everypagehq.com')
    }
    if (boxes.length === 0) {
      setBoxes(defaultLayout)
    }
  }, [url, storedUrl])

  const onUrlChanged = (newUrl: string) => {
    // Track analytics here if needed
    setStoredUrl(newUrl)
    router.push(`?url=${encodeURIComponent(newUrl)}`)
  }

  const onAddClicked = () => {
    // Track analytics here if needed
    setBoxes([...boxes, createDefaultDevice()])
  }

  const onRemoveBoxClicked = (itemId: string) => {
    // Track analytics here if needed
    setBoxes(boxes.filter((box: IBox) => box.itemId !== itemId))
  }

  const onBoxSizeChanged = (itemId: string, width: number, height: number, zoom: number, deviceCode: string | null) => {
    // Analytics tracking logic here
    setBoxes(boxes.map((box: IBox): IBox => (
      box.itemId === itemId ? {...box, width, height, zoom, deviceCode} : box
    )))
  }

  const onBoxPositionChanged = (itemId: string, positionX: number, positionY: number) => {
    setBoxes(boxes.map((box: IBox): IBox => (
      box.itemId === itemId ? {...box, positionX, positionY} : box
    )))
  }

  const onTwitterShareClicked = () => {
    // Track analytics here if needed
    window.open('https://twitter.com/intent/tweet?url=https%3A%2F%2Feverysize.kibalabs.com&related=kibalabs&text=Check%20out%20everysize%20by%20@kibalabs%20to%20test%20your%20responsive%20site%20in%20every%20size%20%20🖥%20💻%20📱', 'Data', 'height=350,width=750')
  }

  React.useEffect(() => {
    if (size) {
      setTotalWidth(Math.floor((size.width - paddingSize) / (columnWidth + paddingSize)) * (columnWidth + paddingSize) - (2 * paddingSize))
    }
  }, [size])

  return (
    <div className="h-screen flex flex-col">
      <NavBar 
        url={url || ''} 
        onUrlChanged={onUrlChanged} 
        onTwitterShareClicked={onTwitterShareClicked} 
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
  )
}