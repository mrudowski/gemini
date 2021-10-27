import React, {FC} from 'react';
import './styles/Spinner.scss';

const speedSwitch = (speed: ISpinner['speed']) => {
  if (speed === 'fast') return 600;
  if (speed === 'slow') return 900;
  return 750;
};

interface ISpinner {
  color?: string;
  thickness?: number;
  gap?: number;
  speed?: 'fast' | 'slow';
  size?: number | string;
}

const Spinner: FC<ISpinner> = ({color = '#ba1c16', gap = 4, thickness = 1, size = 32, speed, ...restProps}) => (
  <svg
    height={size}
    width={size}
    {...restProps}
    style={{animationDuration: `${speedSwitch(speed)}ms`}}
    className="gemSpinner"
    viewBox="0 0 32 32"
  >
    <circle
      cx={16}
      cy={16}
      r={14 - thickness / 2}
      stroke={color}
      fill="none"
      strokeWidth={thickness}
      strokeDasharray={Math.PI * 2 * (11 - gap)}
      strokeLinecap="round"
    />
  </svg>
);

export default Spinner;
