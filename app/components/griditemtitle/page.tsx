// app/demo/page.tsx
"use client"

import React from 'react'
import { GridItemTitle } from '@/components/GridItemTitle'

// === Demo Page ===
export default function GridItemTitleDemoPage() {
  const [sizes, setSizes] = React.useState({
    height: 600,
    width: 375,
    zoom: 1,
    deviceCode: null as string | null
  })

  // 注意，一定要使用 useCallback，否则会出现每次渲染时，handleSizeChanged 都会被重新创建，导致 onSizeChanged 被多次调用
  const handleSizeChanged = React.useCallback(
    (height: number, width: number, zoom: number, deviceCode: string | null) => {
      setSizes({ height, width, zoom, deviceCode })
    },
    []
  )

  const handleClose = () => {
    console.log('Close clicked')
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          <GridItemTitle
            initialHeight={600}
            initialWidth={375}
            initialDeviceCode={null}
            initialZoom={1}
            onSizeChanged={handleSizeChanged}
            onCloseClicked={handleClose}
          />
        </div>

        <div className="bg-gray-800 rounded-lg p-4 text-white">
          <h2 className="text-lg font-semibold mb-2">Current State:</h2>
          <pre className="bg-gray-900 p-4 rounded">
            {JSON.stringify(sizes, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
