const SCENES = {
  teaShop: 'teaShop',
  elmWorkshopByHazel: 'elmWorkshopByHazel',
  elmWorkshopByElm: 'elmWorkshopByElm',
  hazelWorkshopByHazel: 'hazelWorkshopByHazel',
  hazelWorkshopByElm: 'hazelWorkshopByElm',
  hazelTableByHazel: 'hazelTableByHazel',
} as const;

// export const CLOSEUPS = {
//   hazelTableByHazel: 'hazelTableByHazel',
// } as const;

export type ISceneId = keyof typeof SCENES;
export default SCENES;
