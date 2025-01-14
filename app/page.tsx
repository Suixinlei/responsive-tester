'use client';
import React from 'react';
import Image from 'next/image';
import normalizeUrl from 'normalize-url';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();
  const [url, setUrl] = React.useState('');

  // 处理预览
  const handlePreview = async () => {
    let newUrl = url;
    if (!url) {
      router.push('/preview');
      return;
    }

    try {
      newUrl = normalizeUrl(newUrl);
      new URL(newUrl);
      router.push(`/preview?url=${encodeURIComponent(newUrl)}`);
    } catch (e) {
      console.error(e);
      toast({
        title: '请输入有效的网址',
        variant: 'destructive',
      });
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold text-center">响应式布局测试工具</h1>

      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <Image 
          src="https://img.alicdn.com/imgextra/i1/O1CN01M5mWmc1MgYrsxh89M_!!6000000001464-0-tps-3860-1798.jpg"
          fill
          alt="响应式布局测试工具"
          className="object-contain"
        />
      </div>
      
      <div className="max-w-2xl text-center space-y-4">
        <p className="text-lg text-gray-600">
          一个简单易用的响应式布局测试工具，帮助你同时预览网页在不同设备宽度下的显示效果
        </p>
        <p className="text-gray-500">
          支持常见设备尺寸，包括桌面端、平板和移动设备
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8 items-center">
        <Input
          type="text"
          placeholder="输入要测试的网址"
          className="w-full sm:w-96"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handlePreview();
            }
          }}
        />
        <Button 
          size="lg"
          onClick={() => handlePreview()}
          className="text-lg w-full sm:w-auto"
        >
          开始测试
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="text-center p-6 rounded-lg border">
          <h3 className="font-semibold mb-2">多设备预览</h3>
          <p className="text-sm text-gray-500">同时查看多个设备尺寸下的显示效果</p>
        </div>
        <div className="text-center p-6 rounded-lg border">
          <h3 className="font-semibold mb-2">灵活布局</h3>
          <p className="text-sm text-gray-500">自由调整预览窗口的大小和位置</p>
        </div>
        <div className="text-center p-6 rounded-lg border">
          <h3 className="font-semibold mb-2">实时响应</h3>
          <p className="text-sm text-gray-500">即时查看布局变化效果</p>
        </div>
      </div>
    </div>
  );
}
