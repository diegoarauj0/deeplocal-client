import type { InterfaceTheme } from "../features/styles/themes";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme extends InterfaceTheme {}
}
