import GraphService from "../services/core/GraphService";
import { MSGraphClientV3 } from "@microsoft/sp-http";

jest.mock("@microsoft/sp-http", () => {
  return {
    MSGraphClientV3: jest.fn().mockImplementation(() => {
      return {
        api: jest.fn().mockReturnValue({
          filter: jest.fn().mockReturnValue({
            top: jest.fn().mockReturnValue({
              get: jest.fn().mockResolvedValue({ res: { value: [] } }),
            }),
          }),
        }),
      };
    }),
  };
});

const mockedGraphClient = new MSGraphClientV3();

/*
        this._graphClient
          .api("me/insights/used")
          .filter(`ResourceVisualization/Type eq 'Web'`)
          .top(30)
          .get((err: { message: string }, res: IRecentWebs) => {
*/
describe("GraphService should", () => {
  it.skip("return 2 sites if only 2 are present", async () => {
    const service = new GraphService(mockedGraphClient);
    const result = await service.getRecentVisitedSites();
    expect(result).toBe([]);
  });
});
