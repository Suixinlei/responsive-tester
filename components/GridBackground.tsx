'use client';

interface GridBackgroundProps {
  paddingSize: number
  rowHeight: number
  columnWidth: number
}

export const GridBackground = ({
  paddingSize,
  rowHeight,
  columnWidth,
}: GridBackgroundProps) => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none bg-grid-pattern"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            to right,
            rgba(0, 0, 0, 0.1) 0px,
            rgba(0, 0, 0, 0.1) ${columnWidth}px,
            transparent ${columnWidth}px,
            transparent ${columnWidth + paddingSize}px
          ),
          repeating-linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.1) 0px,
            rgba(0, 0, 0, 0.1) ${rowHeight}px,
            transparent ${rowHeight}px,
            transparent ${rowHeight + paddingSize}px
          )
        `
      }}
    />
  )
}
