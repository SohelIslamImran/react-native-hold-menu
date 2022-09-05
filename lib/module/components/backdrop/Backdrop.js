import React, { memo } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedGestureHandler, useAnimatedProps, useAnimatedStyle, withDelay, withTiming } from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler"; // Components

import { BlurView } from "expo-blur"; // Utils

import { styles } from "./styles";
import { CONTEXT_MENU_STATE, HOLD_ITEM_TRANSFORM_DURATION, WINDOW_HEIGHT } from "../../constants";
import { BACKDROP_LIGHT_BACKGROUND_COLOR, BACKDROP_DARK_BACKGROUND_COLOR } from "./constants";
import { useInternal } from "../../hooks";
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const BackdropComponent = _ref => {
  let {
    blurViewIntensity = 100,
    backdropDarkBackgroundColor = BACKDROP_DARK_BACKGROUND_COLOR,
    backdropLightBackgroundColor = BACKDROP_LIGHT_BACKGROUND_COLOR
  } = _ref;
  const {
    state,
    theme
  } = useInternal();
  const tapGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startPosition = {
        x: event.x,
        y: event.y
      };
    },
    onCancel: () => {
      state.value = CONTEXT_MENU_STATE.END;
    },
    onEnd: (event, context) => {
      const distance = Math.hypot(event.x - context.startPosition.x, event.y - context.startPosition.y);
      const shouldClose = distance < 10;
      const isStateActive = state.value === CONTEXT_MENU_STATE.ACTIVE;

      if (shouldClose && isStateActive) {
        state.value = CONTEXT_MENU_STATE.END;
      }
    }
  }, [state]);
  const animatedContainerStyle = useAnimatedStyle(() => {
    const topValueAnimation = () => state.value === CONTEXT_MENU_STATE.ACTIVE ? 0 : withDelay(HOLD_ITEM_TRANSFORM_DURATION, withTiming(WINDOW_HEIGHT, {
      duration: 0
    }));

    const opacityValueAnimation = () => withTiming(state.value === CONTEXT_MENU_STATE.ACTIVE ? 1 : 0, {
      duration: HOLD_ITEM_TRANSFORM_DURATION
    });

    return {
      top: topValueAnimation(),
      opacity: opacityValueAnimation()
    };
  });
  const animatedContainerProps = useAnimatedProps(() => {
    return {
      intensity: withTiming(state.value === CONTEXT_MENU_STATE.ACTIVE ? blurViewIntensity : 0, {
        duration: HOLD_ITEM_TRANSFORM_DURATION
      })
    };
  });
  const animatedInnerContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = theme.value === "light" ? backdropLightBackgroundColor : backdropDarkBackgroundColor;
    return {
      backgroundColor
    };
  }, [theme]);
  return /*#__PURE__*/React.createElement(TapGestureHandler, {
    onHandlerStateChange: tapGestureEvent
  }, /*#__PURE__*/React.createElement(AnimatedBlurView // @ts-ignore
  , {
    tint: "default",
    animatedProps: animatedContainerProps,
    style: [styles.container, animatedContainerStyle]
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [{ ...StyleSheet.absoluteFillObject
    }, animatedInnerContainerStyle]
  })));
};

const Backdrop = /*#__PURE__*/memo(BackdropComponent);
export default Backdrop;
//# sourceMappingURL=Backdrop.js.map