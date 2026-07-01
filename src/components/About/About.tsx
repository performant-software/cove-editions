import { type Config, type Link } from "../../types";

import "./About.css";

export interface AboutProps {
  config: Config;
}

export const About = (props: AboutProps) => {
  const { config } = props;
  const metadata = config.metadata;

  if (!metadata) {
    return null;
  }

  return (
    <div className="about-container">
      <div className="about-title">About This Page</div>
      <div className="about-box about-part-of">
        <div className="about-part-of-text">Part of</div>
        <img src={metadata.partOf.imageUrl} alt="Edition Image About" />
        <div className="about-part-of-title-text">
          <a href={metadata.partOf.collection.url}>
            {metadata.partOf.collection.linkText}
          </a>
        </div>
        <div className="about-part-of-separator" />
        <div className="about-part-of-author-text">
          <a href={metadata.partOf.author.url}>
            {metadata.partOf.author.linkText}
          </a>
        </div>
      </div>
      <div className="about-box about-other">
        <div className="about-header-text">Editor-In-Chief</div>
        <div className="about-box-link-list">
          <a href={metadata.editorInChief.url}>
            {metadata.editorInChief.linkText}
          </a>
        </div>
      </div>
      {metadata.editors.length > 0 && (
        <div className="about-box about-other">
          <div className="about-header-text">Editor(s)</div>
          <div className="about-box-link-list">
            {metadata.editors.map((e: Link) => (
              <a key={e.linkText} href={e.url}>
                {e.linkText}
              </a>
            ))}
          </div>
        </div>
      )}
      {metadata.tags.length > 0 && (
        <div className="about-box about-other">
          <div className="about-header-text">Tags</div>
          <div className="about-box-link-list">
            {metadata.tags.map((e: Link) => (
              <a key={e.linkText} href={e.url}>
                {e.linkText}
              </a>
            ))}
          </div>
        </div>
      )}
      {metadata.person.length > 0 && (
        <div className="about-box about-other">
          <div className="about-header-text">Person</div>
          <div className="about-box-link-list">
            {metadata.person.map((e: Link) => (
              <a key={e.linkText} href={e.url}>
                {e.linkText}
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="about-title">Navigation</div>
      {metadata.navigation.primaryTexts.length > 0 && (
        <>
          <div className="about-subtitle">Primary Texts</div>
          <div className="about-navigation-link-list">
            <ul>
              {metadata.navigation.primaryTexts.map((e: Link) => (
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
      {metadata.navigation.editorialApparatus.length > 0 && (
        <>
          <div className="about-subtitle">Editorial Apparatus</div>
          <div className="about-navigation-link-list">
            <ul>
              {metadata.navigation.editorialApparatus.map((e: Link) => (
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
      {metadata.navigation.exhibits.length > 0 && (
        <>
          <div className="about-subtitle">Exhibits</div>
          <div className="about-navigation-link-list">
            <ul>
              {metadata.navigation.exhibits.map((e: Link) => (
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
      {metadata.navigation.supplementalMaterials.length > 0 && (
        <>
          <div className="about-subtitle">Supplementary Materials</div>
          <div className="about-navigation-link-list">
            <ul>
              {metadata.navigation.supplementalMaterials.map((e: Link) => (
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
