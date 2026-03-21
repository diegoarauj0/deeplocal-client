import type { InterfaceTheme } from "../features/styles/themes";
import "styled-components";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends InterfaceTheme {}
}
