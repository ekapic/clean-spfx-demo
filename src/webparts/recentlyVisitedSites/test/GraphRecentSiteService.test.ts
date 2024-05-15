import GraphRecentSiteService from "../services/business/GraphRecentSiteService";
import { IGraphService } from "../services/core/IGraphService";
import MockGraphService from "../services/core/MockGraphService";

describe("GraphRecentSiteService should", () => {
  const mockedGraphService: IGraphService = new MockGraphService();

  beforeEach(() => {});

  it("return 2 sites if only 2 are present", async () => {
    const service = new GraphRecentSiteService(mockedGraphService);
    const result = await service.getRecentVisitedSites();
    expect(result).toStrictEqual([
      {
        id: "1",
        path: "https://my.site/sites/1",
        title: "My site 1",
      },
      {
        id: "2",
        path: "https://my.site/sites/other",
        title: "Other site",
      },
    ]);
  });
});
