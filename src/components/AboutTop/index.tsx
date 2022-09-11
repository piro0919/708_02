import Article from "components/Article";

export type AboutTopProps = {
  about: string;
};

function AboutTop({ about }: AboutTopProps): JSX.Element {
  return <Article heading="ABOUT">{about}</Article>;
}

export default AboutTop;
