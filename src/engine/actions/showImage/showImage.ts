import {CSSProperties} from 'react';
import {IActionPayload, ISpecifiedAction} from '../types';
import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';

export interface IShowImageActionPayload extends IActionPayload {
  image: string;
  style: CSSProperties;
  border?: boolean;
  dimmedBackdrop?: boolean;
  hideInstantly?: boolean;
}

const defaultPayload: Partial<IShowImageActionPayload> = {
  border: true,
  dimmedBackdrop: true,
  hideInstantly: false,
};

export type IShowImageAction = (payload?: IShowImageActionPayload) => ISpecifiedAction<IShowImageActionPayload>;

/**
 * show specific image in specific place, styled as you like
 */
export const showImage = (payload: IShowImageActionPayload): ISpecifiedAction<IShowImageActionPayload> =>
  getSpecificAction(ACTIONS_NAMES.SHOW_IMAGE, payload, defaultPayload);

// -----

export interface IHideImageActionPayload extends IActionPayload {
  image: string;
}

export type IHideImageAction = (payload?: IHideImageActionPayload) => ISpecifiedAction<IHideImageActionPayload>;

/**
 * hide specific image
 */
export const hideImage = (payload: IHideImageActionPayload): ISpecifiedAction<IHideImageActionPayload> =>
  getSpecificAction(ACTIONS_NAMES.HIDE_IMAGE, payload);

// -----

export interface IHideAllImagesPayload extends IActionPayload {}

export type IHideAllImagesAction = (payload?: IHideAllImagesPayload) => ISpecifiedAction<IHideAllImagesPayload>;

/**
 * hide all images
 */
export const hideAllImages = (payload?: IHideAllImagesPayload): ISpecifiedAction<IHideAllImagesPayload> =>
  getSpecificAction(ACTIONS_NAMES.HIDE_ALL_IMAGES, payload);
