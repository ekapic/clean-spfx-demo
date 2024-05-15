import * as React from 'react';
import { useState, useEffect } from "react";
import styles from "./RecentlyVisitedSites.module.scss";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import * as strings from "RecentlyVisitedSitesWebPartStrings";
import { Link } from "@fluentui/react/lib/Link";
import { IRecentlyVisitedSitesProps } from ".";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";

export const RecentlyVisitedSites: React.FC<IRecentlyVisitedSitesProps> = (
  props: IRecentlyVisitedSitesProps
) => {
  const [loading, setLoading] = useState(true);
  const [usedSites, setUsedSites] = useState([]);
  const [error, setError] = useState(null);

  /**
   * componentDidMount lifecycle hook
   */
  useEffect(() => {
    props.siteService
      .getRecentVisitedSites()
      .then((sites) => {
        setUsedSites(sites);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        setUsedSites([]);
      });
  }, []);

  const color: string | null =
    (!!props.themeVariant && props.themeVariant.semanticColors.bodyText) ||
    null;
  const backgroundColor: string | null =
    (!!props.themeVariant &&
      props.themeVariant.semanticColors.bodyBackground) ||
    null;

  return (
    <div className={styles.recentlyVisitedSites}>
      <WebPartTitle
        displayMode={props.displayMode}
        title={props.title}
        updateProperty={props.updateProperty}
        themeVariant={props.themeVariant}
      />

      {loading && <Spinner label={strings.Loading} size={SpinnerSize.large} />}

      {usedSites && usedSites.length > 0 ? (
        <div
          className={styles.list}
          style={{ backgroundColor: backgroundColor }}
        >
          <ul>
            {usedSites.map((site) => (
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
        !loading &&
        (error ? (
          <span className={styles.error}>{error}</span>
        ) : (
          <span className={styles.noSites}>{strings.NoRecentSitesMsg}</span>
        ))
      )}
    </div>
  );
};
