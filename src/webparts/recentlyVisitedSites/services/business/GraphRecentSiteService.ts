import { IRecentWeb, IWebs } from "../../components";
import { IGraphService } from "../core/IGraphService";
import { uniqBy } from "@microsoft/sp-lodash-subset";
import { IRecentSiteService } from "./IRecentSiteService";

export default class GraphRecentSiteService implements IRecentSiteService {
  constructor(graphService: IGraphService) {
    this._graphService = graphService;
  }

  private _graphService: IGraphService;

  public async getRecentVisitedSites(): Promise<IWebs[]> {
    const graphReturnedSites = await this._graphService.getRecentVisitedSites();
    const processedSites = this._processRecentSites(graphReturnedSites);
    return processedSites;
  }

  /**
   * Processes the retrieved web results from the Microsoft Graph
   * @param recentWebs
   */
  private _processRecentSites(recentWebs: IRecentWeb[]): IWebs[] {
    // Map the MS Graph result
    const rWebs: IWebs[] = recentWebs.map((w) => {
      return {
        id: w.id,
        title: w.resourceVisualization.containerDisplayName,
        path: this._updateSitePath(w.resourceVisualization.containerWebUrl),
      };
    });

    // Only retrieve the unique sites
    const uWeb = uniqBy(rWebs, "path");

    // Get the latest 10 results
    return uWeb.slice(0, 10);
  }

  /**
   * Parse the retrieve URLs to return the site collection URLs
   * @param path
   */
  private _updateSitePath(path: string): string {
    if (path) {
      // Split the site on the sites path
      const pathSplit = path.split("/sites/");
      if (pathSplit.length === 2) {
        const siteUrlPath = pathSplit[1].substring(
          0,
          pathSplit[1].indexOf("/")
        );
        // Concatinate the URL
        return `${pathSplit[0]}/sites/${siteUrlPath}`;
      } else {
        // Return the root site
        const matches = path.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        if (matches && matches.length > 0) {
          return matches[0];
        }
      }
    }
    return path;
  }
}
