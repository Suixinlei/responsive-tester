"use client";

import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NavBarProps {
  url: string;
  onUrlChanged: (url: string) => void;
}

export const NavBar = ({
  url: initialUrl,
  onUrlChanged,
}: NavBarProps) => {
  const [url, setUrl] = React.useState<string>(initialUrl);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let newUrl = url;
    if (!newUrl.startsWith("http")) {
      newUrl = newUrl.startsWith("localhost")
        ? `http://${url}`
        : `https://${url}`;
      setUrl(newUrl);
    }
    onUrlChanged(newUrl);
  };

  return (
    <div className="w-full bg-background border-b">
      <div className="container mx-auto">
        <div className="h-16 flex items-center justify-between px-6">
          {/* Logo Section */}
          <div className="flex items-center h-[30px] shrink-1">
            <div className="flex items-center">
              <Image
                src="https://img.alicdn.com/tfs/TB1gOVov.OWBKNjSZKzXXXfWFXa-64-64.png"
                alt="kouka"
                width={32}
                height={32}
                priority
              />
              <p className="ml-2 text-2xl font-bold">Responsive Tester</p>
            </div>
          </div>

          {/* URL Input Form */}
          <div className="flex-grow max-w-[500px] mx-6">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="text"
                value={url}
                onChange={handleUrlChange}
                className="flex-grow"
                placeholder="Enter URL"
              />
              <Button type="submit" variant="secondary">
                GO
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
