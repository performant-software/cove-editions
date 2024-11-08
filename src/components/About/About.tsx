import { AboutConfig } from "../../types";

import "./About.css";

export interface AboutProps {
  config: AboutConfig;
}

export const About = (props: AboutProps) => {
  const { config } = props;
  return (
    <div className="about-container">
      <div className="about-title">About This Page</div>
      <div className="about-box about-part-of">
        <div className="about-part-of-text">Part of</div>
        <img src={config.metadata.partOf.imageUrl} alt="Edition Image About" />
        <div className="about-part-of-title-text">
          <a href={config.metadata.partOf.collection.url}>
            {config.metadata.partOf.collection.linkText}
          </a>
        </div>
        <div className="about-part-of-separator" />
        <div className="about-part-of-author-text">
          <a href={config.metadata.partOf.author.url}>
            {config.metadata.partOf.author.linkText}
          </a>
        </div>
      </div>
      <div className="about-box about-other">
        <div className="about-header-text">Editor-In-Chief</div>
        <div className="about-box-link-list">
          <a href={config.metadata.editorInChief.url}>
            {config.metadata.editorInChief.linkText}
          </a>
        </div>
      </div>
      {config.metadata.editors.length > 0 && (
        <div className="about-box about-other">
          <div className="about-header-text">Editor(s)</div>
          <div className="about-box-link-list">
            {config.metadata.editors.map((e) => (
              <a key={e.linkText} href={e.url}>
                {e.linkText}
              </a>
            ))}
          </div>
        </div>
      )}
      {config.metadata.tags.length > 0 && (
        <div className="about-box about-other">
          <div className="about-header-text">Tags</div>
          <div className="about-box-link-list">
            {config.metadata.tags.map((e) => (
              <a key={e.linkText} href={e.url}>
                {e.linkText}
              </a>
            ))}
          </div>
        </div>
      )}
      {config.metadata.person.length > 0 && (
        <div className="about-box about-other">
          <div className="about-header-text">Person</div>
          <div className="about-box-link-list">
            {config.metadata.person.map((e) => (
              <a key={e.linkText} href={e.url}>
                {e.linkText}
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="about-title">Navigation</div>
      {config.metadata.navigation.primaryTexts.length > 0 && (
        <>
          <div className="about-subtitle">Primary Texts</div>
          <div className="about-navigation-link-list">
            <ul>
              {config.metadata.navigation.primaryTexts.map((e) => (
                <li
                  className={e.active ? "active" : undefined}
                  key={e.linkText}
                >
                  <a href={e.url}>{e.linkText}</a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {config.metadata.navigation.editorialApparatus.length > 0 && (
        <>
          <div className="about-subtitle">Editorial Apparatus</div>
          <div className="about-navigation-link-list">
            <ul>
              {config.metadata.navigation.editorialApparatus.map((e) => (
                <li
                  className={e.active ? "active" : undefined}
                  key={e.linkText}
                >
                  <a href={e.url}>{e.linkText}</a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {config.metadata.navigation.exhibits.length > 0 && (
        <>
          <div className="about-subtitle">Exhibits</div>
          <div className="about-navigation-link-list">
            <ul>
              {config.metadata.navigation.exhibits.map((e) => (
                <li
                  className={e.active ? "active" : undefined}
                  key={e.linkText}
                >
                  <a href={e.url}>{e.linkText}</a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {config.metadata.navigation.supplementalMaterials.length > 0 && (
        <>
          <div className="about-subtitle">Supplementary Materials</div>
          <div className="about-navigation-link-list">
            <ul>
              {config.metadata.navigation.supplementalMaterials.map((e) => (
                <li
                  className={e.active ? "active" : undefined}
                  key={e.linkText}
                >
                  <a href={e.url}>{e.linkText}</a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
