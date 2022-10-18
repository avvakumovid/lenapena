import * as React from 'react';
import Svg, { Rect, Path, LinearGradient, Defs, Stop } from 'react-native-svg';

const XBtn = ({
  style,
  externalBorderColor,
  internalBorderColor,
  contentColor,
  ...props
}) => (
  <Svg
    width={116}
    height={116}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      d='M112.17 11.49a5.416 5.416 0 1 0-7.661-7.66L63.657 44.682a8 8 0 0 1-11.314 0L11.491 3.83a5.417 5.417 0 1 0-7.66 7.66l40.852 40.853a8 8 0 0 1 0 11.313L3.83 104.51a5.416 5.416 0 0 0 0 7.66 5.416 5.416 0 0 0 7.661 0l40.852-40.852a8 8 0 0 1 11.314 0l40.852 40.852a5.415 5.415 0 0 0 7.66 0 5.416 5.416 0 0 0 .001-7.66L71.317 63.657a8 8 0 0 1 0-11.314L112.17 11.49Z'
      fill='url(#a)'
    />
    <Defs>
      <LinearGradient
        id='a'
        x1={58}
        y1={0}
        x2={58}
        y2={115.999}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor={externalBorderColor} />
        <Stop offset={1} stopColor={internalBorderColor} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default XBtn;
