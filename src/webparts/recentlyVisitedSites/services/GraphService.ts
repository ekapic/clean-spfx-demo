import { MSGraphClientV3 } from "@microsoft/sp-http";
import { IRecentWeb, IRecentWebs, IWebs } from "../components";
import { IGraphService } from "./IGraphService";
import { uniqBy } from "@microsoft/sp-lodash-subset";
import * as strings from "RecentlyVisitedSitesWebPartStrings";

export default class GraphService implements IGraphService {
  constructor(graphClient: MSGraphClientV3) {
    this._graphClient = graphClient;
  }

  private _graphClient: MSGraphClientV3;

  public getRecentVisitedSites(): Promise<IWebs[]> {
    return new Promise<IWebs[]>((resolve, reject) => {
      if (this._graphClient) {
        // Calling: v1.0/me/insights/used?$filter=ResourceVisualization/Type eq 'Web'
        this._graphClient
          .api("me/insights/used")
          .filter(`ResourceVisualization/Type eq 'Web'`)
          .top(30)
          .get((err: { message: string }, res: IRecentWebs) => {
            if (err) {
              // Something failed calling the MS Graph
              reject(new Error(err.message ? err.message : strings.Error));
              return;
            }

            // Check if a response was retrieved
            if (res && res.value && res.value.length > 0) {
              resolve(this._processRecentSites(res.value));
            } else {
              // No sites retrieved
              resolve([]);
            }
          })
          .catch((reason) => {
            reject(new Error(reason));
          });
      } else {
        reject(new Error("Graph client not initialized"));
      }
    });
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
