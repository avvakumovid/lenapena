import * as React from 'react';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';

const TaskTitle1 = ({
  style,
  externalBorderColor,
  internalBorderColor,
  contentColor,
  ...props
}) => (
  <Svg
    width={216}
    height={34}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      d='m.902 20.598 3.047-.684c.456 3.958 2.767 5.938 6.934 5.938 2.252 0 3.965-.58 5.137-1.739 1.184-1.172 1.777-2.571 1.777-4.199 0-1.471-.482-2.572-1.445-3.3-.964-.743-2.611-1.114-4.942-1.114H9.867l.469-2.813h2.246c1.758 0 3.177-.475 4.258-1.425 1.08-.964 1.62-2.2 1.62-3.711 0-1.29-.461-2.285-1.386-2.989-.924-.716-2.246-1.074-3.965-1.074-2.07 0-3.62.417-4.648 1.25-1.029.82-1.79 2.103-2.285 3.848l-3.106-.39c.769-2.761 1.98-4.682 3.633-5.762C8.37 1.34 10.544.793 13.227.793c2.773 0 4.921.58 6.445 1.738 1.523 1.146 2.285 2.709 2.285 4.688 0 3.411-2.044 5.638-6.133 6.68 3.646.481 5.469 2.356 5.469 5.624 0 2.605-.918 4.76-2.754 6.465-1.823 1.693-4.427 2.54-7.812 2.54-6.068 0-9.343-2.644-9.825-7.93Zm39.676-.41h-9.726L27.023 28h-3.027L37.063 1.34h3.69L45.404 28h-3.438l-1.387-7.813Zm-.39-2.676L38.136 5.266 32.12 17.512h8.066Zm10.906 7.656L62.207 1.34h5.352l3.398 23.828h1.992l-1.406 8.438h-2.617L69.473 28H51.64l-1.328 5.605h-2.598l1.406-8.437h1.973Zm3.203 0h13.398L65 4.035h-1.387l-9.316 21.133Zm37.508-4.98h-9.727L78.25 28h-3.027L88.289 1.34h3.692L96.629 28H93.19l-1.386-7.813Zm-.39-2.676L89.362 5.266l-6.015 12.246h8.066Zm29.616-2.13h-13.066L105.855 28h-3.261l4.453-26.66h3.262l-1.875 11.21H121.5l1.875-11.21h3.262L122.164 28h-3.242l2.109-12.617Zm13.426 10.411L134.105 28h-3.261l4.453-26.66h3.262l-2.618 15.664a78.725 78.725 0 0 1-1.113 5.332c1.589-2.305 3.047-4.167 4.375-5.586l12.149-12.832.429-2.578h3.242L150.57 28h-3.261l2.558-15.293c.365-2.11.736-3.887 1.113-5.332-1.614 2.344-3.072 4.206-4.375 5.586l-12.148 12.832ZM159.25 28l4.453-26.66h16.621l-.449 2.656h-13.359l-1.465 8.75h11.445l-.449 2.637h-11.426l-1.641 9.785h14.415L176.926 28H159.25Zm55.836 0h-19.102l.43-2.578h7.774l3.457-20.488c-.717 1.002-1.856 1.796-3.418 2.382-1.563.586-3.054.886-4.473.899l.43-2.656c4.349-.6 7.363-2.22 9.043-4.864h2.265l-4.14 24.727h8.164l-.43 2.578Z'
      fill='url(#a)'
    />
    <Defs>
      <LinearGradient
        id='a'
        x1={109.5}
        y1={4}
        x2={109.5}
        y2={24}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor={externalBorderColor} />
        <Stop offset={1} stopColor={internalBorderColor} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default TaskTitle1;
