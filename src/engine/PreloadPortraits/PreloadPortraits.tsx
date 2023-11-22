import React from 'react';
import PreloadImages from '../Preload/PreloadImages';
import portraits from '../../game/actors/portraits';

const imagesToPreload = Object.values(portraits);
const PreloadPortraits: React.FC = () => <PreloadImages images={imagesToPreload} />;

export default PreloadPortraits;
