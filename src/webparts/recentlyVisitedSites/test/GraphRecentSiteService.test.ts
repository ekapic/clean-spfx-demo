import GraphRecentSiteService from "../services/business/GraphRecentSiteService";
import { IGraphService } from "../services/core/IGraphService";
import MockGraphService from "../services/core/MockGraphService";
import { generateNFakeSitesResponse } from "./FakeGraphData";
import { it, vi, describe, expect, beforeEach } from "vitest";
describe("GraphRecentSiteService should", () => {
  let mockedGraphService: IGraphService;

  beforeEach(() => {
    mockedGraphService = new MockGraphService();
  });

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

  it("return 10 sites if 15 are present", async () => {
    mockedGraphService.getRecentVisitedSites = vi
      .fn()
      .mockReturnValue(generateNFakeSitesResponse(15));
    const service = new GraphRecentSiteService(mockedGraphService);
    const result = await service.getRecentVisitedSites();
    expect(result.length).toBe(10);
    expect(result[0].id).toBe("1");
    expect(result[9].id).toBe("10");
  });
});
