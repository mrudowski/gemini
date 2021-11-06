const SCENES = {
  teaShop: 'teaShop',
  elmWorkshopByHazel: 'elmWorkshopByHazel',
  elmWorkshopByElm: 'elmWorkshopByElm',
  hazelWorkshopByHazel: 'hazelWorkshopByHazel',
  hazelWorkshopByElm: 'hazelWorkshopByElm',
} as const;

export type ISceneId = keyof typeof SCENES;
export default SCENES;
