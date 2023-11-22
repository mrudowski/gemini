import React from 'react';
import './styles/HerbariumPage.scss';
import classNames from 'classnames';
import PreloadImage from '../../../Preload/PreloadImage';
import {IImage} from '../../../Preload/types';
import {IHerbariumPageId} from '../../types';

interface IHerbariumPage {
  image: IImage;
  id: IHerbariumPageId;
}

const HerbariumPage: React.FC<IHerbariumPage> = ({id, image, children}) => {
  const styles = {
    backgroundImage: `url(${image})`,
  };

  return (
    <div className={classNames('HerbariumPage', `HerbariumPage--${id}`)}>
      <PreloadImage image={image} />
      <div className="HerbariumPage__image" style={styles} />
      <div className="HerbariumPage__description">{children}</div>
    </div>
  );
};

export default HerbariumPage;
