import { IWebs } from "../../components/IWebs";

export interface IRecentSiteService {
  /**
   * Fetch the recent sites
   */
  getRecentVisitedSites(): Promise<IWebs[]>;
}
