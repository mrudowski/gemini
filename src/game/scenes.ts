const SCENES = {
  teaShop: 'teaShop',
  elmWorkshopByHazel: 'elmWorkshopByHazel'
} as const;

export type ISceneId = keyof typeof SCENES;
export default SCENES;
