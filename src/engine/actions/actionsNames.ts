export const ACTIONS_NAMES = {
  GOTO_SCENE: 'GOTO_SCENE',
  RESUME_SCENE: 'RESUME_SCENE',
  LOOK_CLOSER: 'LOOK_CLOSER',
  CLOSE_CLOSEUP: 'CLOSE_CLOSEUP',
  SET_GLOBAL_STATE: 'SET_GLOBAL_STATE',
  SET_SCENE_STATE: 'SET_SCENE_STATE',
  // SET_CURRENT_SCENE_STATE: 'SET_CURRENT_SCENE_STATE',
  SHOW_TEXT: 'SHOW_TEXT',
  TALK: 'TALK',
  TALK_OPTIONS: 'TALK_OPTIONS',
  END_TALK: 'END_TALK',
  WAIT: 'WAIT',
  USE_WITH: 'USE_WITH',
  END_USE_WITH: 'END_USE_WITH',
  ADD_ITEMS: 'ADD_ITEMS',
  REMOVE_ITEMS: 'REMOVE_ITEMS',
  REPLACE_ITEMS: 'REPLACE_ITEMS',
  ADD_NOTES: 'ADD_NOTES',
  PLAY_SOUND: 'PLAY_SOUND',
  SWITCH_LIGHT_OFF: 'SWITCH_LIGHT_OFF',
  SWITCH_LIGHT_ON: 'SWITCH_LIGHT_ON',
  SHAKE_CAMERA: 'SHAKE_CAMERA',
  SWITCH_ACTOR: 'SWITCH_ACTOR',
  SHOW_CREDITS: 'SHOW_CREDITS',
  SHOW_IMAGE: 'SHOW_IMAGE',
  HIDE_IMAGE: 'HIDE_IMAGE',
  HIDE_ALL_IMAGES: 'HIDE_ALL_IMAGES',
  CUSTOM: 'CUSTOM',
  SHOW_HUD: 'SHOW_HUD',
  HIDE_HUD: 'HIDE_HUD',
} as const;

export type IActionName = keyof typeof ACTIONS_NAMES;
