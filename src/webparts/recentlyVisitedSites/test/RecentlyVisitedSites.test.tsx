/**
 * @vitest-environment jsdom
 */

import * as React from "react";
// import { assert } from "chai";
import { screen, render, act } from "@testing-library/react";
import { RecentlyVisitedSites } from "../components/RecentlyVisitedSites";
import { IRecentlyVisitedSitesProps } from "../components/IRecentlyVisitedSitesProps";
import { DisplayMode } from "@microsoft/sp-core-library";
import { IRecentSiteService } from "../services/business/IRecentSiteService";
import { noop } from "@microsoft/sp-lodash-subset";
import { it, vi, describe, expect } from "vitest";

const fakeSiteService: IRecentSiteService = {
  getRecentVisitedSites: vi.fn().mockResolvedValue([
    {
      id: "1",
      title: "My site 1",
      path: "https://my.site/sites/1",
    },
    {
      id: "2",
      title: "Other site",
      path: "https://my.site/sites/other",
    },
  ]),
};
const props: IRecentlyVisitedSitesProps = {
  displayMode: DisplayMode.Read,
  siteService: fakeSiteService,
  title: "Recent Sites",
  themeVariant: undefined,
  updateProperty: () => noop,
};

describe("RecentlyVisitesSites should", () => {
  it("render title correctly", () => {
    act(() => {
      render(<RecentlyVisitedSites {...props} />);
    });
    const element = screen.getAllByRole("heading");
    expect(element[0].innerHTML).toBe("Recent Sites");
  });
  it("render site list correctly", async () => {
    act(() => {
      render(<RecentlyVisitedSites {...props} />);
    });
    const element = await screen.findAllByRole("listitem");
    expect(element.length === 2);
    expect(element[0].innerHTML).toBe(
      '<a href="https://my.site/sites/1" title="My site 1" class="ms-Link root-106">My site 1</a>'
    );
    expect(element[1].innerHTML).toBe(
      '<a href="https://my.site/sites/other" title="Other site" class="ms-Link root-106">Other site</a>'
    );
  });
});
