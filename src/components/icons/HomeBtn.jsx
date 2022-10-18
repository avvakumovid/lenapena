import * as React from 'react';
import Svg, { Rect, Path, Stop, Defs, LinearGradient } from 'react-native-svg';

const HomeBtn = ({
  style,
  externalBorderColor,
  internalBorderColor,
  contentColor,
  ...props
}) => (
  <Svg
    width={22}
    height={23}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      d='M21 19.249v-7.826a3.999 3.999 0 0 0-1.253-2.908l-7.373-6.968a2 2 0 0 0-2.748 0L2.253 8.515A4 4 0 0 0 1 11.423v7.826a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z'
      stroke='url(#a)'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <Defs>
      <LinearGradient
        id='a'
        x1={11}
        y1={1}
        x2={11}
        y2={21.249}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor={externalBorderColor} />
        <Stop offset={1} stopColor={internalBorderColor} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default HomeBtn;
