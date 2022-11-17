import * as React from 'react';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';

const PauseBtn = ({
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
    <Circle cx={35} cy={35} r={33.5} stroke='url(#a)' strokeWidth={3} />
    <Path
      d='M28 24v21'
      stroke='url(#b)'
      strokeWidth={3}
      strokeLinecap='round'
    />
    <Path
      d='M42 24v21'
      stroke='url(#c)'
      strokeWidth={3}
      strokeLinecap='round'
    />
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
      <LinearGradient
        id='b'
        x1={28.5}
        y1={24}
        x2={28.5}
        y2={45}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor={externalBorderColor} />
        <Stop offset={1} stopColor={internalBorderColor} />
      </LinearGradient>
      <LinearGradient
        id='c'
        x1={42.5}
        y1={24}
        x2={42.5}
        y2={45}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor={externalBorderColor} />
        <Stop offset={1} stopColor={internalBorderColor} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default PauseBtn;
