const SCENES = {
  teaShop: 'teaShop'
} as const;

export type ISceneId = keyof typeof SCENES;
export default SCENES;
