import Svg, { LinearGradient, Path, Stop } from 'react-native-svg'

const SvgComponent = ({ size = 30 }) => {
  return (
    <Svg
      viewBox="0 0 140 130"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid"
    >
      <LinearGradient
        id="a"
        gradientUnits="userSpaceOnUse"
        x1={69.6}
        y1={106.8}
        x2={69.6}
      >
        <Stop offset={-0.3} stopColor="#042c43" />
        <Stop offset={-0.2} stopColor="#042c43" />
        <Stop offset={0.5} stopColor="#19aafe" />
        <Stop offset={1.3} stopColor="#fff" />
      </LinearGradient>
      <Path
        d="M76 67c-6 1-3-66-3-66s21 72 62 103c25 18-54-37-59-37zm-11 0c-5 0-84 55-59 37C48 73 69 1 69 1s2 67-4 66z"
        fill="url(#a)"
      />
    </Svg>
  )
}

export default SvgComponent
