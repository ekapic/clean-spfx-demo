import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { RecentlyVisitedSites, IRecentlyVisitedSitesProps } from './components';
import { MSGraphClientV3 } from '@microsoft/sp-http';

import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';
import { IGraphService } from "./services/core/IGraphService";
import { IRecentSiteService } from "./services/business/IRecentSiteService";
import GraphRecentSiteService from "./services/business/GraphRecentSiteService";
import GraphService from "./services/core/GraphService";
//import MockGraphService from "./services/MockGraphService";

export interface IRecentlyVisitedSitesWebPartProps {
  title: string;
}

export default class RecentlyVisitedSitesWebPart extends BaseClientSideWebPart<IRecentlyVisitedSitesWebPartProps> {
  private _graphService: IGraphService;
  private _siteService: IRecentSiteService;
  // theme provider
  private _themeProvider: ThemeProvider;
  // current theme
  private _themeVariant: IReadonlyTheme | undefined;

  public onInit(): Promise<void> {
    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(
      ThemeProvider.serviceKey
    );

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(
      this,
      this._handleThemeChangedEvent
    );

    return new Promise<void>(
      (resolve: () => void, reject: (error: any) => void): void => {
        this.context.msGraphClientFactory.getClient("3").then(
          (client: MSGraphClientV3): void => {
            //this._graphService = new MockGraphService();
            this._graphService = new GraphService(client);
            this._siteService = new GraphRecentSiteService(this._graphService);
            resolve();
          },
          (err) => reject(err)
        );
      }
    );
  }

  public render(): void {
    const element: React.ReactElement<IRecentlyVisitedSitesProps> =
      React.createElement(RecentlyVisitedSites, {
        title: this.properties.title,
        siteService: this._siteService,
        displayMode: this.displayMode,
        themeVariant: this._themeVariant,
        updateProperty: (value: string) => {
          this.properties.title = value;
        },
      });

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [],
    };
  }

  protected _handleThemeChangedEvent = (args: ThemeChangedEventArgs): void => {
    this._themeVariant = args.theme;
    this.render();
  };
}