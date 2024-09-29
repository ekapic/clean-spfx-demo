import { IRecentWeb } from "../../components";
import { fake2SitesResponse } from "../../test/FakeGraphData";
import { IGraphService } from "./IGraphService";

export default class MockGraphService implements IGraphService {
  getRecentVisitedSites(): Promise<IRecentWeb[]> {
    return Promise.resolve<IRecentWeb[]>(fake2SitesResponse);
  }
}
