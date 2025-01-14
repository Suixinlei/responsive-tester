"use client";
import React from "react";
import { IBox } from "@/lib/model";

interface WebViewProps {
  url: string | null;
  errorView?: React.ReactNode;
  shouldShowLoadingSpinner?: boolean;
  onLoadingChanged?: (isLoading: boolean) => void;
  box: IBox;
}

export const WebView = ({ url, box, onLoadingChanged }: WebViewProps) => {
  const handleLoad =  () => onLoadingChanged?.(false);

  const handleError = () => onLoadingChanged?.(false);

  if (!url) return null;
  return (
    <iframe
      src={url}
      className="w-full h-full border-0"
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};
