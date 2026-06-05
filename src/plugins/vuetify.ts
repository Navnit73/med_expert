import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import { icons } from "./mdi-icon"; // Import icons from separate file
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { PurpleTheme } from "@/theme/LightTheme";

export default createVuetify({
  display: {
    thresholds: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1266,
      xl: 1440,
    },
  },
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...aliases,
      ...icons,
    },
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "PurpleTheme",
    themes: {
      PurpleTheme,
    },
  },
  defaults: {
    VField: {
      variant: "outlined",
      baseColor: "inputBorder",
      color: "primary",
      rounded: "sm",
    },
    VTextField: {
      rounded: "sm",
      variant: "outlined",
      baseColor: "inputBorder",
      color: "primary",
    },
    VAutocomplete: {
      color: "primary",
      variant: "outlined",
      rounded: "md",
      density: "compact",
      hideDetails: "auto",
    },
    VSelect: {
      color: "primary",
      variant: "outlined",
      rounded: "md",
      density: "compact",
      hideDetails: "auto",
    },
    VFileInput: {
      color: "primary",
      variant: "outlined",
      rounded: "md",
      density: "compact",
      hideDetails: "auto",
    },
    VCheckbox: {
      color: "primary",
      trueValue: "1",
      falseValue: "0",
      density: "compact",
      hideDetails: "auto",
    },
    VBtn: {
      color: "primary",
      rounded: "md",
      flat: true,
      fontWeight: "400",
      letterSpacing: "0",
    },
    VCard: {
      flat: true,
      elevation: 0,
      rounded: "md",
    },
    VTooltip: {
      // set v-tooltip default location to top
      location: "top",
      scrollStrategy: "close",
    },
  },
});
