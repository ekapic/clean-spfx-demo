import { IRecentWeb } from "../../components";
import { IGraphService } from "./IGraphService";

export default class MockGraphService implements IGraphService {
  getRecentVisitedSites(): Promise<IRecentWeb[]> {
    return Promise.resolve<IRecentWeb[]>([
      {
        id: "1",
        lastUsed: {
          lastAccessedDateTime: "",
          lastModifiedDateTime: "",
        },
        resourceReference: {},
        resourceVisualization: {
          title: "",
          containerWebUrl:
            "https://my.site/sites/1/Documents/Forms/AllItems.aspx",
          containerDisplayName: "My site 1",
          mediaType: "",
          previewImageUrl: "",
          previewText: "",
          type: "",
        },
      },
      {
        id: "2",
        lastUsed: {
          lastAccessedDateTime: "",
          lastModifiedDateTime: "",
        },
        resourceReference: {},
        resourceVisualization: {
          title: "",
          containerWebUrl:
            "https://my.site/sites/other/Documents/Forms/AllItems.aspx",
          containerDisplayName: "Other site",
          mediaType: "",
          previewImageUrl: "",
          previewText: "",
          type: "",
        },
      },
    ]);
  }
}
