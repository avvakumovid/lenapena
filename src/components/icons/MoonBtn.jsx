import * as React from 'react';
import Svg, { Rect, Path, Stop, Defs, LinearGradient } from 'react-native-svg';

const MoonBtn = ({
  style,
  externalBorderColor,
  internalBorderColor,
  contentColor,
  ...props
}) => (
  <Svg
    style={style}
    width={24}
    height={24}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      d='M12.614 24c-3.379 0-6.549-1.31-8.927-3.687A12.537 12.537 0 0 1 0 11.386 12.613 12.613 0 0 1 6.91.133a1.222 1.222 0 0 1 1.722 1.448 11.006 11.006 0 0 0 2.74 11.047 10.937 10.937 0 0 0 7.783 3.232c1.106 0 2.207-.165 3.264-.492a1.221 1.221 0 0 1 1.448 1.723A12.613 12.613 0 0 1 12.614 24ZM6.866 1.99A10.965 10.965 0 0 0 1.6 11.386C1.6 17.459 6.54 22.4 12.614 22.4a10.966 10.966 0 0 0 9.397-5.266c-.936.217-1.895.326-2.856.326a12.53 12.53 0 0 1-8.914-3.7A12.608 12.608 0 0 1 6.866 1.988Z'
      fill='url(#a)'
    />
    <Defs>
      <LinearGradient
        id='a'
        x1={12}
        y1={0}
        x2={12}
        y2={24}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor={externalBorderColor} />
        <Stop offset={1} stopColor={internalBorderColor} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default MoonBtn;
