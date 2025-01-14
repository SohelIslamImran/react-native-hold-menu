"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AnimatedIcon = void 0;

var _react = _interopRequireWildcard(require("react"));

var _portal = require("@gorhom/portal");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _backdrop = require("../backdrop");

var _internal = require("../../context/internal");

var _constants = require("../../constants");

var _menu = _interopRequireDefault(require("../menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Components
// Utils
let AnimatedIcon;
exports.AnimatedIcon = AnimatedIcon;

const ProviderComponent = _ref => {
  let {
    children,
    theme: selectedTheme,
    iconComponent,
    safeAreaInsets,
    ...backdropProps
  } = _ref;

  if (iconComponent) {
    exports.AnimatedIcon = AnimatedIcon = _reactNativeReanimated.default.createAnimatedComponent(iconComponent);
  }

  const state = (0, _reactNativeReanimated.useSharedValue)(_constants.CONTEXT_MENU_STATE.UNDETERMINED);
  const theme = (0, _reactNativeReanimated.useSharedValue)(selectedTheme || "light");
  const menuProps = (0, _reactNativeReanimated.useSharedValue)({
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
  (0, _react.useEffect)(() => {
    theme.value = selectedTheme || "light";
  }, [selectedTheme]);
  const internalContextVariables = (0, _react.useMemo)(() => ({
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
  return /*#__PURE__*/_react.default.createElement(_internal.InternalContext.Provider, {
    value: internalContextVariables
  }, /*#__PURE__*/_react.default.createElement(_portal.PortalProvider, null, children, /*#__PURE__*/_react.default.createElement(_backdrop.Backdrop, backdropProps), /*#__PURE__*/_react.default.createElement(_menu.default, null)));
};

const Provider = /*#__PURE__*/(0, _react.memo)(ProviderComponent);
var _default = Provider;
exports.default = _default;
//# sourceMappingURL=Provider.js.map