export const INVENTORY_HERBS_FLOWERS = {
  dziergamotkaFlower: 'dziergamotkaFlower',
  kopietaFlower: 'kopietaFlower',
  ostokrzywFlower: 'ostokrzywFlower',
  rabapetkaFlower: 'rabapetkaFlower',
  szczamianekFlower: 'szczamianekFlower',
  tymkolaFlower: 'tymkolaFlower',
} as const;

export const INVENTORY_HERBS_LEAFS = {
  dziergamotkaLeaf: 'dziergamotkaLeaf',
  kopietaLeaf: 'kopietaLeaf',
  ostokrzywLeaf: 'ostokrzywLeaf',
  rabapetkaLeaf: 'rabapetkaLeaf',
  szczamianekLeaf: 'szczamianekLeaf',
  tymkolaLeaf: 'tymkolaLeaf',
} as const;

export const INVENTORY_HERBS_STALKS = {
  dziergamotkaStalk: 'dziergamotkaStalk',
  kopietaStalk: 'kopietaStalk',
  ostokrzywStalk: 'ostokrzywStalk',
  rabapetkaStalk: 'rabapetkaStalk',
  szczamianekStalk: 'szczamianekStalk',
  tymkolaStalk: 'tymkolaStalk',
} as const;

export const INVENTORY_HERBS = {
  ...INVENTORY_HERBS_FLOWERS,
  ...INVENTORY_HERBS_LEAFS,
  ...INVENTORY_HERBS_STALKS,
} as const;

const INVENTORY_ITEMS = {
  bottleWine: 'bottleWine',
  ...INVENTORY_HERBS,
} as const;

export default INVENTORY_ITEMS;
