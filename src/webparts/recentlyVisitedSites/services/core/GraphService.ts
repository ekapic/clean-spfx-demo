import { MSGraphClientV3 } from "@microsoft/sp-http";
import { IRecentWeb, IRecentWebs } from "../../components";
import { IGraphService } from "./IGraphService";
import * as strings from "RecentlyVisitedSitesWebPartStrings";

export default class GraphService implements IGraphService {
  constructor(graphClient: MSGraphClientV3) {
    this._graphClient = graphClient;
  }

  private _graphClient: MSGraphClientV3;

  public getRecentVisitedSites(): Promise<IRecentWeb[]> {
    return new Promise<IRecentWeb[]>((resolve, reject) => {
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
              resolve(res.value);
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
}
