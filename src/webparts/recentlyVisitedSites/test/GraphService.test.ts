import { MSGraphClientV3 } from "@microsoft/sp-http-msgraph";
import GraphService from "../services/core/GraphService";
import { fake2SitesResponse } from "./FakeGraphData";
import { IRecentWeb } from "../components";

import { it, describe, expect, vi } from "vitest";

const mockGraphClient = (expectedResponse: IRecentWeb[]): MSGraphClientV3 => {
  const mockedClient = {
    api: vi.fn().mockReturnValue({
      filter: vi.fn().mockReturnValue({
        top: vi.fn().mockReturnValue({
          get: vi.fn().mockImplementation(async (cb: any) => {
            cb(null, { value: expectedResponse });
            Promise.resolve();
          }),
        }),
      }),
    }),
  };
  return mockedClient as unknown as MSGraphClientV3;
};

describe("GraphService should", () => {
  it("returns underlying Graph response with 2 sites", async () => {
    const service = new GraphService(mockGraphClient(fake2SitesResponse));
    const result = await service.getRecentVisitedSites();
    expect(result).toStrictEqual(fake2SitesResponse);
  });

  it("returns an empty site list if the client isn't initialized", async () => {
    const service = new GraphService(undefined as unknown as MSGraphClientV3);
    const result = await service.getRecentVisitedSites();
    expect(result).toStrictEqual([]);
  });
});
