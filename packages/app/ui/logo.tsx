import { View } from "app/design-system"
import Svg, { Circle, Rect } from "react-native-svg"

const SvgComponent = ({ width = 30 }) => {
  return (
    <View tw="w-7 flex-row justify-center items-center">
      <Svg
        preserveAspectRatio="xMidYMid"
        width="100%"
        height="100%"
        viewBox="0 0 139.16 106.812"
      ></Svg>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid"
        width="100%"
        height="100%"
        viewBox="0 0 139.16 106.812"
      >
        <defs>
          <filter id="prefix__a" filterUnits="userSpaceOnUse">
            <feImage
              width={139.16}
              height={106.812}
              preserveAspectRatio="none"
              xlinkHref="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTM5LjE2MDAwMDAwMDAwMDA4IiBoZWlnaHQ9IjEwNi44MTIwMDAwMDAwMDAwMSI+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjY5LjU4IiB5MT0iMTA2LjgxMiIgeDI9IjY5LjU4Ij4KICA8c3RvcCBvZmZzZXQ9Ii0wLjI1IiBzdG9wLWNvbG9yPSIjMDQyYzQzIi8+CiAgPHN0b3Agb2Zmc2V0PSItMC4yMzUiIHN0b3AtY29sb3I9IiMwNDJjNDMiLz4KICA8c3RvcCBvZmZzZXQ9IjAuNDciIHN0b3AtY29sb3I9IiMxOWFhZmUiLz4KICA8c3RvcCBvZmZzZXQ9IjEuMjUiIHN0b3AtY29sb3I9IiNmZmYiLz4KPC9saW5lYXJHcmFkaWVudD4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIvPjwvc3ZnPg=="
            />
            <feComposite operator="in" in2="SourceGraphic" />
            <feBlend in2="SourceGraphic" result="gradientFill" />
          </filter>
        </defs>
        <path
          d="M74.723 66.449C69.141 67.047 71.627 0 71.627 0s21.024 72.022 62.697 103.042c24.899 18.536-54.017-37.194-59.601-36.593zm-10.264 0c-5.584-.601-84.5 55.129-59.601 36.593C46.531 72.022 67.555 0 67.555 0s2.486 67.047-3.096 66.449z"
          fill="#19aafe"
          filter="url(#prefix__a)"
          fillRule="evenodd"
        />
      </svg> */}
    </View>
  )
}

export default SvgComponent
