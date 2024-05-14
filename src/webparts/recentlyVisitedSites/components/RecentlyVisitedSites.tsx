import * as React from 'react';
import styles from './RecentlyVisitedSites.module.scss';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import * as strings from "RecentlyVisitedSitesWebPartStrings";
import { Link } from "@fluentui/react/lib/Link";
import { IRecentlyVisitedSitesProps, IRecentlyVisitedSitesState } from ".";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";

export class RecentlyVisitedSites extends React.Component<
  IRecentlyVisitedSitesProps,
  IRecentlyVisitedSitesState
> {
  /**
   * Constructor
   * @param props
   */
  constructor(props: IRecentlyVisitedSitesProps) {
    super(props);

    this.state = {
      usedSites: [],
      error: null,
      loading: true,
    };
  }

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount(): void {
    this.props.graphService
      .getRecentVisitedSites()
      .then((sites) => this.setState({ usedSites: sites, loading: false }))
      .catch((err) =>
        this.setState({ error: err, loading: false, usedSites: [] })
      );
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IRecentlyVisitedSitesProps> {
    //
    // supporting different themes for page's section
    //
    const color: string | null =
      (!!this.props.themeVariant &&
        this.props.themeVariant.semanticColors.bodyText) ||
      null;
    const backgroundColor: string | null =
      (!!this.props.themeVariant &&
        this.props.themeVariant.semanticColors.bodyBackground) ||
      null;

    return (
      <div className={styles.recentlyVisitedSites}>
        <WebPartTitle
          displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty}
          themeVariant={this.props.themeVariant}
        />

        {this.state.loading && (
          <Spinner label={strings.Loading} size={SpinnerSize.large} />
        )}

        {this.state.usedSites && this.state.usedSites.length > 0 ? (
          <div
            className={styles.list}
            style={{ backgroundColor: backgroundColor }}
          >
            <ul>
              {this.state.usedSites.map((site) => (
                <li
                  key={site.id}
                  className={styles.site}
                  style={{ background: backgroundColor }}
                >
                  <Link
                    href={site.path}
                    title={site.title}
                    style={{ color: color }}
                  >
                    {site.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          !this.state.loading &&
          (this.state.error ? (
            <span className={styles.error}>{this.state.error}</span>
          ) : (
            <span className={styles.noSites}>{strings.NoRecentSitesMsg}</span>
          ))
        )}
      </div>
    );
  }
}
