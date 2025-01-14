// components/NavBar.tsx
"use client"

import React from 'react'
import Image from 'next/image'
import { FaTwitter } from 'react-icons/fa'


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NavBarProps {
  url: string
  onUrlChanged: (url: string) => void
  onTwitterShareClicked: () => void
}

export const NavBar = ({ url: initialUrl, onUrlChanged, onTwitterShareClicked }: NavBarProps) => {
  const [url, setUrl] = React.useState<string>(initialUrl)

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    let newUrl = url
    if (!newUrl.startsWith('http')) {
      newUrl = newUrl.startsWith('localhost') ? `http://${url}` : `https://${url}`
      setUrl(newUrl)
    }
    onUrlChanged(newUrl)
  }

  return (
    <div className="w-full bg-background border-b">
      <div className="container mx-auto">
        <div className="h-16 flex items-center justify-between px-6">
          {/* Logo Section */}
          <div className="flex items-center h-[30px] shrink-1">
            <div className="flex items-center">
              <div className="w-[30px] relative">
                <Image
                  src="/assets/favicon.svg"
                  alt="logo"
                  width={30}
                  height={30}
                  priority
                />
              </div>
              <div className="max-w-[170px] ml-2">
                <Image
                  src="/assets/everysize-wordmark-dark.svg"
                  alt="everysize"
                  width={170}
                  height={30}
                  priority
                />
              </div>
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

          {/* Twitter Share Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onTwitterShareClicked}
            className="w-10 h-10"
          >
            <FaTwitter className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
