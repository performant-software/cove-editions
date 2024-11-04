export type Link = {
  linkText: string;
  url: string;
  active?: boolean;
};
export type EditionsMetaData = {
  partOf: {
    imageUrl: string;
    collection: Link;
    author: Link;
  };
  editorInChief: Link;
  editors: Link[];
  annotators: Link[];
  tags: Link[];
  person: Link[];
  navigation: {
    primaryTexts: Link[];
    editorialApparatus: Link[];
    exhibits: Link[];
    supplementalMaterials: Link[];
  };
};

export type Config = {
  teiUrl: string;

  metadata: EditionsMetaData;
};
