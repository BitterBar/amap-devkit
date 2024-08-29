import icon from '@/assets/images/logo.png'

export interface LogoIconProps {
  size?: [number, number]
}

export default function LogoIcon(props = {} as LogoIconProps, options = false) {
  const size = props.size ?? [64, 64]

  const opts = {
    image: icon,
    size: size,
    imageSize: size
  }

  return options ? opts : new AMap.Icon(opts)
}
