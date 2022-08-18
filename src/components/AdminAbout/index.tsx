import dynamic from "next/dynamic";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./style.module.scss";

const MarkdownEditor = dynamic(() => import("@uiw/react-markdown-editor"), {
  ssr: false,
});

type FieldValues = {
  profile: string;
};

export type AdminAboutProps = {
  defaultValues: FieldValues;
  onSubmit: SubmitHandler<FieldValues>;
};

function AdminAbout({ defaultValues, onSubmit }: AdminAboutProps): JSX.Element {
  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="profile"
        render={({ field: { onBlur, onChange, value } }): JSX.Element => (
          <MarkdownEditor onBlur={onBlur} onChange={onChange} value={value} />
        )}
      />
      <div className={styles.buttonWrapper}>
        <button className={styles.button} type="submit">
          保存する
        </button>
      </div>
    </form>
  );
}

export default AdminAbout;
