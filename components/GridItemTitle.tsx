// components/GridItemTitle.tsx
"use client";

import React from 'react';
import { GripVertical, X } from 'lucide-react';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IDevice, devices, getDeviceByCode } from '@/lib/model/devices';

interface GridItemTitleProps {
  initialHeight: number
  initialWidth: number
  initialDeviceCode: string | null
  initialZoom: number
  dragHandleClass?: string
  onSizeChanged: (height: number, width: number, zoom: number, deviceCode: string | null) => void
  onCloseClicked: () => void
}

const zoomOptions = [
  { value: "1", label: "100%" },
  { value: "1.5", label: "66%" },
  { value: "2", label: "50%" },
  { value: "2.5", label: "40%" },
  { value: "5", label: "20%" },
];

export const GridItemTitle = ({
  initialHeight,
  initialWidth,
  initialDeviceCode,
  initialZoom,
  dragHandleClass,
  onSizeChanged,
  onCloseClicked,
}: GridItemTitleProps) => {
  const initialDevice = getDeviceByCode(initialDeviceCode);
  const [device, setDevice] = React.useState<IDevice | null>(initialDevice);
  const [heightInput, setHeightInput] = React.useState<string>(
    String(initialDevice ? initialDevice.height : initialHeight)
  );
  const [widthInput, setWidthInput] = React.useState<string>(
    String(initialDevice ? initialDevice.width : initialWidth)
  );
  const [zoomInput, setZoomInput] = React.useState<string>(String(initialZoom));

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (Number(value) || value === '') {
      setHeightInput(value);
      if (device && Number(value) !== device.height) {
        setDevice(null);
      }
    }
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (Number(value) || value === '') {
      setWidthInput(value);
      if (device && Number(value) !== device.width) {
        setDevice(null);
      }
    }
  };

  const handleZoomChange = (value: string) => {
    setZoomInput(value);
  };

  const handleDeviceChange = (value: string) => {
    if (device?.name === value) {
      return;
    }
    const matchedDevice = devices.find((d) => d.name === value);
    if (matchedDevice) {
      setDevice(matchedDevice);
      setHeightInput(String(matchedDevice.height));
      setWidthInput(String(matchedDevice.width));
    } else {
      setDevice(null);
    }
  };

  React.useEffect(() => {
    onSizeChanged(
      Number(heightInput), 
      Number(widthInput), 
      Number(zoomInput), 
      device?.code || null
    );
  }, [heightInput, widthInput, zoomInput, device, onSizeChanged]);

  return (
    <div className="flex items-center w-full px-4 py-2 bg-primary text-primary-foreground">
      <div className={cn("w-8 flex items-center justify-center", dragHandleClass)}>
        <GripVertical className="h-4 w-4 text-muted" />
      </div>
      
      <div className="flex-1 flex flex-col gap-2">
        <Select 
          value={device ? device.name : "manual"} 
          onValueChange={handleDeviceChange}
        >
          <SelectTrigger className="h-8 bg-transparent border-dashed border-muted/25 border-b-[1px] border-x-0 border-t-0 rounded-none text-sm">
            <SelectValue placeholder="Manual" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manual">Manual</SelectItem>
            {devices.map((device) => (
              <SelectItem key={device.name} value={device.name}>
                {device.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center justify-between gap-2">
          <Select value={zoomInput} onValueChange={handleZoomChange}>
            <SelectTrigger className="h-7 bg-transparent border-dashed border-muted/25 border-b-[1px] border-x-0 border-t-0 rounded-none text-xs w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {zoomOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={widthInput}
              onChange={handleWidthChange}
              className="h-7 w-16 bg-transparent border-dashed border-muted/25 border-b-[1px] border-x-0 border-t-0 rounded-none text-xs text-center"
            />
            <X className="h-3 w-3 text-muted" />
            <Input
              type="text"
              value={heightInput}
              onChange={handleHeightChange}
              className="h-7 w-16 bg-transparent border-dashed border-muted/25 border-b-[1px] border-x-0 border-t-0 rounded-none text-xs text-center"
            />
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onCloseClicked}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
