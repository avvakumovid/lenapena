import * as React from 'react';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';

const PlayBtn = ({
  style,
  externalBorderColor,
  internalBorderColor,
  contentColor,
  ...props
}) => (
  <Svg
    style={style}
    width={70}
    height={70}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      d='M29 21.857 46.189 35 29 48.143V21.857Z'
      stroke={contentColor}
      strokeWidth={2}
    />
    <Circle cx={35} cy={35} r={33.5} stroke='url(#a)' strokeWidth={3} />
    <Defs>
      <LinearGradient
        id='a'
        x1={35}
        y1={0}
        x2={35}
        y2={70}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor={externalBorderColor} />
        <Stop offset={1} stopColor={internalBorderColor} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default PlayBtn;
