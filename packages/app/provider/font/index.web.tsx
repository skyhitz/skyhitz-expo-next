// on Web, we skip loading fonts

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}
