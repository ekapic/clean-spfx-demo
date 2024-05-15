import { IRecentlyVisitedSitesWebPartProps } from '../RecentlyVisitedSitesWebPart';
import { DisplayMode } from "@microsoft/sp-core-library";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { IRecentSiteService } from "../services/business/IRecentSiteService";

export interface IRecentlyVisitedSitesProps extends IRecentlyVisitedSitesWebPartProps {
  siteService: IRecentSiteService;
  displayMode: DisplayMode;
  themeVariant: IReadonlyTheme | undefined;
  updateProperty: (value: string) => void;
}
