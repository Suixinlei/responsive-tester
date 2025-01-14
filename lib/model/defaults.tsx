import { v4 as uuidv4 } from 'uuid';

import { IBox } from './box';

export const defaultLayout: IBox[] = [
  {
    "itemId": "default-1",
    "deviceCode": "dp-1080",
    "width": 1920,
    "height": 1080,
    "zoom": 2,
    "positionX": 0,
    "positionY": 0
  },
  {
    "itemId": "default-2",
    "deviceCode": "bs-xl",
    "width": 1200,
    "height": 1080,
    "zoom": 2,
    "positionX": 33,
    "positionY": 0
  },
  {
    "itemId": "default-3",
    "deviceCode": "ip-12pm",
    "width": 428,
    "height": 926,
    "zoom": 1.5,
    "positionX": 54,
    "positionY": 0
  }
];

export const createDefaultDevice = (): IBox => {
  return {
    itemId: uuidv4(),
    deviceCode: 'bs-md',
    height: 0,
    width: 0,
    zoom: 2,
    positionX: 0,
    positionY: 0,
  };
};
