import { IRecentWeb } from "../../components/IRecentWebs";

export interface IGraphService {
  /**
   * Fetch the recent sites via the Microsoft Graph client
   */
  getRecentVisitedSites(): Promise<IRecentWeb[]>;
}
