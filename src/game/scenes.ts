const SCENES = {
  teaShop: 'teaShop',
  elmWorkshopByHazel: 'elmWorkshopByHazel',
  hazelWorkshopByHazel: 'hazelWorkshopByHazel',
} as const;

export type ISceneId = keyof typeof SCENES;
export default SCENES;
