import { MouseEventHandler } from "react";
import usePortal from "react-cool-portal";
import { IoMdClose } from "react-icons/io";
import ImageUploading, {
  ImageUploadingPropsType,
} from "react-images-uploading";
import styles from "./style.module.scss";

export type NewAssetPortalProps = Pick<
  ImageUploadingPropsType,
  "onChange" | "value"
> & {
  onClose: MouseEventHandler<HTMLButtonElement>;
};

function NewAssetPortal({
  onChange,
  onClose,
  value,
}: NewAssetPortalProps): JSX.Element {
  const { Portal } = usePortal();

  return (
    <Portal>
      <div className={styles.wrapper}>
        <ImageUploading multiple={false} onChange={onChange} value={value}>
          {({ dragProps, onImageUpload }): JSX.Element => (
            <button
              {...dragProps}
              className={styles.button}
              onClick={onImageUpload}
            >
              {value.length ? "追加中" : "Click or Drop here"}
            </button>
          )}
        </ImageUploading>
        <div className={styles.buttonWrapper}>
          <button onClick={onClose}>
            <IoMdClose size={36} />
          </button>
        </div>
      </div>
    </Portal>
  );
}

export default NewAssetPortal;
