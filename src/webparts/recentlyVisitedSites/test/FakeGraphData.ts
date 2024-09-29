import { IRecentWeb } from "../components";

export const fake2SitesResponse: IRecentWeb[] = [
  {
    id: "1",
    lastUsed: {
      lastAccessedDateTime: "",
      lastModifiedDateTime: "",
    },
    resourceReference: {},
    resourceVisualization: {
      title: "",
      containerWebUrl: "https://my.site/sites/1/Documents/Forms/AllItems.aspx",
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
];

export const generateNFakeSitesResponse = (n: number): IRecentWeb[] => {
  const sites: IRecentWeb[] = [];
  for (let i = 1; i <= n; i++) {
    sites.push({
      id: i.toString(),
      lastUsed: {
        lastAccessedDateTime: "",
        lastModifiedDateTime: "",
      },
      resourceReference: {},
      resourceVisualization: {
        title: "",
        containerWebUrl: `https://my.site/sites/site${i}/Documents/Forms/AllItems.aspx`,
        containerDisplayName: `Site ${i}`,
        mediaType: "",
        previewImageUrl: "",
        previewText: "",
        type: "",
      },
    });
  }
  return sites;
};
