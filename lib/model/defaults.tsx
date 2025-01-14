import { v4 as uuidv4 } from 'uuid';

import { IBox } from './box';

export const defaultLayout: IBox[] = [{
  itemId: 'default-1',
  deviceCode: 'bs-lg',
  width: 992,
  height: 1080,
  zoom: 2.5,
  positionX: 0,
  positionY: 0,
}, {
  itemId: 'default-2',
  deviceCode: 'bs-md',
  width: 768,
  height: 1080,
  zoom: 2.5,
  positionX: 14,
  positionY: 0,
}, {
  itemId: 'default-3',
  deviceCode: 'bs-sm',
  width: 576,
  height: 1080,
  zoom: 2.5,
  positionX: 25,
  positionY: 0,
}, {
  itemId: 'default-4',
  deviceCode: 'bs-xs',
  width: 575,
  height: 1080,
  zoom: 2.5,
  positionX: 0,
  positionY: 0,
}];

export const createDefaultDevice = (): IBox => {
  return {
    itemId: uuidv4(),
    deviceCode: 'bs-md',
    height: 0,
    width: 0,
    zoom: 2,
    positionX: 0,
    positionY: 0,
  }
}
