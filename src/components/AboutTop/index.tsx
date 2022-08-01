import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import Article from "components/Article";

export type AboutTopProps = {
  about: Document;
};

function AboutTop({ about }: AboutTopProps): JSX.Element {
  return <Article heading="ABOUT">{documentToReactComponents(about)}</Article>;
}

export default AboutTop;
