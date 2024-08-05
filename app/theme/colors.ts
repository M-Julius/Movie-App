// TODO: write documentation for colors and palette in own markdown file and add links from here

export const palette = {
  black: "#1d1d1d",
  white: "#ffffff",
  offWhite: "#e6e6e6",
  orange: "#FBA928",
  orangeDarker: "#EB9918",
  lightGrey: "#939AA4",
  lighterGrey: "#CDD4DA",
  angry: "#dd3333",
  deepPurple: "#5D2555",
  yellow: "#FFE922",
  blue: "#0FEFFD",
  blueHex: "rgba(15, 239, 253, 0.1)",
  blackWhiteGradient: ["rgba(29, 29, 29, 0)", "rgba(29, 29, 29, 0.8)"],
  verifiedBlack: "#242424",
  blackTransparent: 'rgba(29, 29, 29, 0.8)',
  blackTransparent05: 'rgba(29, 29, 29, 0.5)',
} as const;

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.white,
  /**
   * Secondary text information.
   */
  textDim: palette.lightGrey,
  /**
   * The default color of the screen background.
   */
  background: palette.white,
  /**
   * The default border color.
   */
  border: palette.lightGrey,
  /**
   * The main tinting color.
   */
  tint: palette.orange,
  /**
   * A subtle color used for lines.
   */
  separator: palette.lightGrey,
  /**
   * Error messages.
   */
  primaryDarker: palette.orangeDarker,
  
  error: palette.angry,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.lighterGrey,
}
