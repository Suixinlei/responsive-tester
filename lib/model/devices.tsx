
export interface IDevice {
  code: string;
  name: string;
  width: number;
  height: number;
  ua?: string;
}

// utils/userAgents.ts
export const MOBILE_USER_AGENTS: Record<string, string> = {
  iPhone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
  Android: 'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36',
  iPad: 'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1'
};

// https://yesviz.com/viewport
export const devices: IDevice[] = [{
  code: 'bs-xl',
  name: 'Bootstrap xl',
  width: 1200,
  height: 1080,
}, {
  code: 'bs-lg', 
  name: 'Bootstrap lg',
  width: 992,
  height: 1080,
}, {
  code: 'bs-md',
  name: 'Bootstrap md',
  width: 768,
  height: 1080,
}, {
  code: 'bs-sm',
  name: 'Bootstrap sm',
  width: 576,
  height: 1080,
}, {
  code: 'bs-xs',
  name: 'Bootstrap xs',
  width: 575,
  height: 1080,
}, {
  code: 'dp-1080',
  name: '1080p Desktop',
  width: 1920,
  height: 1080,
}, {
  code: 'dp-1080-v',
  name: '1080p Desktop (Vertical)',
  width: 1080,
  height: 1920,
}, {
  code: 'ip-12pm',
  name: 'iPhone 12 Pro Max',
  height: 926,
  width: 428,
  ua: 'iPhone'
}, {
  code: 'ip-12',
  name: 'iPhone 12, iPhone 12 Pro',
  height: 844,
  width: 390,
  ua: 'iPhone'
}, {
  code: 'ip-12m',
  name: 'iPhone 12 mini',
  height: 780,
  width: 360,
  ua: 'iPhone'
}, {
  code: 'ip-11p',
  name: 'iPhone 11 Pro Max, Xs Max, 11, Xr',
  height: 896,
  width: 414,
  ua: 'iPhone'
}, {
  code: 'ip-11',
  name: 'iPhone 11 Pro, X, XS',
  height: 812,
  width: 375,
  ua: 'iPhone'
}, {
  code: 'ip-6p',
  name: 'iPhone 6+, 6s+, 7+, 8+',
  height: 736,
  width: 414,
  ua: 'iPhone'
}, {
  code: 'ip-6p',
  name: 'iPhone 6, 6s, 7, 8, SE 2',
  height: 667,
  width: 375,
  ua: 'iPhone'
}, {
  code: 'ip-5',
  name: 'iPhone 5, 5s, 5c, SE',
  height: 568,
  width: 320,
  ua: 'iPhone'
}, {
  code: 'ip-4',
  name: 'iPhone 2G, 3G, 3GS, 4, 4s',
  height: 480,
  width: 320,
  ua: 'iPhone'
}, {
  code: 'ipa-12',
  name: 'iPad Pro 12.9-inch',
  height: 1366,
  width: 1024,
  ua: 'iPad'
}, {
  code: 'ipa-10',
  name: 'iPad Pro 10.5-inch',
  height: 834,
  width: 1112,
  ua: 'iPad'
}, {
  code: 'ipa-9',
  name: 'iPad Pro 9.7-inch, Air 2, mini 4',
  height: 1024,
  width: 768,
  ua: 'iPad'
}, {
  code: 'gs-20',
  name: 'Samsung Galaxy S20, S20+, S20U',
  height: 800,
  width: 360,
  ua: 'Android'
}, {
  code: 'gs-10p',
  name: 'Samsung Galaxy S10, S10+, S10U',
  height: 740,
  width: 360,
  ua: 'Android'
}, {
  code: 'gs-10n',
  name: 'Samsung Galaxy Note 10, 10+',
  height: 718,
  width: 360,
  ua: 'Android'
}, {
  code: 'op-8p',
  name: 'OnePlus 8 Pro',
  height: 906,
  width: 412,
  ua: 'Android'
}, {
  code: 'op-8',
  name: 'OnePlus 8, Nord',
  height: 915,
  width: 412,
  ua: 'Android'
}, {
  code: 'op-7tp',
  name: 'OnePlus 7T Pro',
  height: 892,
  width: 412,
  ua: 'Android'
}, {
  code: 'op-7t',
  name: 'OnePlus 7T, 8T',
  height: 914,
  width: 412,
  ua: 'Android'
}, {
  code: 'px-5',
  name: 'Google Pixel 5, 4a',
  height: 851,
  width: 383,
  ua: 'Android'
}, {
  code: 'px-4',
  name: 'Google Pixel 4, 4 XL',
  height: 869,
  width: 411,
  ua: 'Android'
}];

export const getDeviceByCode = (deviceCode?: string | null): IDevice | null => {
  if (!deviceCode) {
    return null;
  }
  const candidates = devices.filter((device: IDevice): boolean => device.code === deviceCode);
  if (candidates.length === 0) {
    return null;
  }
  return candidates[0];
};
