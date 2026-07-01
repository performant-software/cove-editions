export type Link = {
  linkText: string;
  url: string;
  active?: boolean;
};

type TagVocabulary = {
  tagName: string;
  tagColor: string;
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
  tagVocabulary?: TagVocabulary[];
  metadata?: EditionsMetaData
};
