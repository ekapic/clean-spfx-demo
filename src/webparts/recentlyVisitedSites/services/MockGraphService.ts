import { IWebs } from "../components";
import { IGraphService } from "./IGraphService";

export default class MockGraphService implements IGraphService {
  getRecentVisitedSites(): Promise<IWebs[]> {
    return Promise.resolve([
      {
        id: "1",
        title: "My site 1",
        path: "https//my.site/1",
      },
      {
        id: "2",
        title: "Other site",
        path: "https//my.site/other",
      },
    ]);
  }
}
