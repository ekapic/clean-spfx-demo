import { IRecentlyVisitedSitesWebPartProps } from '../RecentlyVisitedSitesWebPart';
import { DisplayMode } from "@microsoft/sp-core-library";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { IGraphService } from "../services/IGraphService";

export interface IRecentlyVisitedSitesProps
  extends IRecentlyVisitedSitesWebPartProps {
  graphService: IGraphService;
  displayMode: DisplayMode;
  themeVariant: IReadonlyTheme | undefined;
  updateProperty: (value: string) => void;
}
