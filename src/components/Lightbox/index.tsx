import { Dispatch, SetStateAction } from "react";
import ReactImageLightbox from "react-image-lightbox";

export type LightboxProps = {
  images: string[];
  photoIndex: number;
  setPhotoIndex: Dispatch<SetStateAction<number | undefined>>;
};

function Lightbox({
  images,
  photoIndex,
  setPhotoIndex,
}: LightboxProps): JSX.Element {
  return (
    <ReactImageLightbox
      enableZoom={false}
      mainSrc={images[photoIndex]}
      nextSrc={images[(photoIndex + 1) % images.length]}
      onCloseRequest={(): void => {
        setPhotoIndex(undefined);
      }}
      onMoveNextRequest={(): void =>
        setPhotoIndex((photoIndex + 1) % images.length)
      }
      onMovePrevRequest={(): void =>
        setPhotoIndex((photoIndex + images.length - 1) % images.length)
      }
      prevSrc={images[(photoIndex + images.length - 1) % images.length]}
    />
  );
}

export default Lightbox;
