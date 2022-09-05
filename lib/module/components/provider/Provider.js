import React, { memo, useEffect, useMemo } from "react";
import { PortalProvider } from "@gorhom/portal";
import Animated, { useSharedValue } from "react-native-reanimated"; // Components

import { Backdrop } from "../backdrop"; // Utils

import { InternalContext } from "../../context/internal";
import { CONTEXT_MENU_STATE } from "../../constants";
import Menu from "../menu";
export let AnimatedIcon;

const ProviderComponent = ({
  children,
  theme: selectedTheme,
  iconComponent,
  safeAreaInsets,
  ...backdropProps
}) => {
  if (iconComponent) {
    AnimatedIcon = Animated.createAnimatedComponent(iconComponent);
  }

  const state = useSharedValue(CONTEXT_MENU_STATE.UNDETERMINED);
  const theme = useSharedValue(selectedTheme || "light");
  const menuProps = useSharedValue({
    itemHeight: 0,
    itemWidth: 0,
    itemX: 0,
    itemY: 0,
    items: [],
    anchorPosition: "top-center",
    menuHeight: 0,
    transformValue: 0,
    actionParams: {}
  });
  useEffect(() => {
    theme.value = selectedTheme || "light";
  }, [selectedTheme]);
  const internalContextVariables = useMemo(() => ({
    state,
    theme,
    menuProps,
    safeAreaInsets: safeAreaInsets || {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  }), [state, theme, menuProps, safeAreaInsets]);
  return /*#__PURE__*/React.createElement(InternalContext.Provider, {
    value: internalContextVariables
  }, /*#__PURE__*/React.createElement(PortalProvider, null, children, /*#__PURE__*/React.createElement(Backdrop, backdropProps), /*#__PURE__*/React.createElement(Menu, null)));
};

const Provider = /*#__PURE__*/memo(ProviderComponent);
export default Provider;
//# sourceMappingURL=Provider.js.map