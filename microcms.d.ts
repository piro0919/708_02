declare module Microcms {
  type About = {
    createdAt: string;
    profile: string;
    publishedAt: string;
    revisedAt: string;
    updatedAt: string;
  };

  type Illustrations = {
    contents: {
      createdAt: string;
      description?: string;
      id: string;
      image: {
        height: number;
        url: string;
        width: number;
      };
      publishedAt: string;
      revisedAt: string;
      title: string;
      updatedAt: string;
    }[];
    limit: number;
    offset: number;
    totalCount: number;
  };

  type Works = {
    contents: {
      createdAt: string;
      description?: string;
      id: string;
      images: {
        fieldId: string;
        image: {
          height: number;
          url: string;
          width: number;
        };
      }[];
      publishedAt: string;
      revisedAt: string;
      title: string;
      updatedAt: string;
    }[];
    limit: number;
    offset: number;
    totalCount: number;
  };
}
