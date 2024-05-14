import { IWebs } from "../components/IWebs";

export interface IGraphService {
  /**
   * Fetch the recent sites via the Microsoft Graph client
   */
  getRecentVisitedSites(): Promise<IWebs[]>;
}
