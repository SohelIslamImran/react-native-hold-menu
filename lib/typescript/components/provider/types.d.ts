import React from "react";

export interface HoldMenuProviderProps extends BackdropProps {
  /**
   * Theme of hold menu. Effects to backdrop and context menu styles. Optional.
   * @type "light" | "dark"
   * @default "light"
   * @examples
   * theme="light"
   */
  theme?: "dark" | "light";
  iconComponent?: any;
  children: React.ReactElement | React.ReactElement[] | React.ReactNode;

  /**
   * Set this to prevent the menu to be opened under the unsafe area.
   * @type object
   * @default
   * { top: 0, bottom: 0, right: 0, left: 0 }
   * @examples
   * ```
   * const insets = useSafeAreaInsets();
   * safeAreaInsets={insets}
   * ```
   */
  safeAreaInsets: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export type BackdropProps = {
  blurViewIntensity?: number;
  backdropDarkBackgroundColor?: string;
  backdropLightBackgroundColor?: string;
};
