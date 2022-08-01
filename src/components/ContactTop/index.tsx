import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./style.module.scss";
import Article from "components/Article";

type FieldValues = {
  budget: string;
  companyName: string;
  deadline: string;
  email: string;
  name: string;
  subject: string;
  text: string;
};

export type ContactTopProps = {
  onSubmit: SubmitHandler<FieldValues>;
};

function ContactTop({ onSubmit }: ContactTopProps): JSX.Element {
  const {
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FieldValues>({
    defaultValues: {
      budget: "",
      companyName: "",
      deadline: "",
      email: "",
      name: "",
      subject: "",
      text: "",
    },
  });

  return (
    <Article heading="CONTACT">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInner}>
          <div className={styles.fieldsWrapper}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="companyName">
                貴社名
              </label>
              <input
                {...register("companyName")}
                className={styles.input}
                id="companyName"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                お名前<abbr>*</abbr>
              </label>
              <input
                {...register("name", {
                  required: "お名前を入力してください。",
                })}
                className={styles.input}
                id="name"
              />
              {errors.name?.message ? (
                <span className={styles.errorMessage}>
                  {errors.name.message}
                </span>
              ) : null}
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                メールアドレス<abbr>*</abbr>
              </label>
              <input
                {...register("email", {
                  required: "メールアドレスを入力してください。",
                })}
                className={styles.input}
                id="email"
                type="email"
              />
              {errors.email?.message ? (
                <span className={styles.errorMessage}>
                  {errors.email.message}
                </span>
              ) : null}
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="subject">
                件名<abbr>*</abbr>
              </label>
              <input
                {...register("subject", {
                  required: "件名を入力してください。",
                })}
                className={styles.input}
                id="subject"
              />
              {errors.subject?.message ? (
                <span className={styles.errorMessage}>
                  {errors.subject.message}
                </span>
              ) : null}
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="budget">
                予算<abbr>*</abbr>
              </label>
              <div className={styles.budgetWrapper}>
                <input
                  {...register("budget", {
                    min: {
                      message: "予算は 1 円以上の金額を入力してください。",
                      value: 1,
                    },
                    required: "予算を入力してください。",
                  })}
                  className={styles.input}
                  id="budget"
                  min={1}
                  type="number"
                />
                <span>円</span>
              </div>
              {errors.budget?.message ? (
                <span className={styles.errorMessage}>
                  {errors.budget.message}
                </span>
              ) : null}
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="deadline">
                納期<abbr>*</abbr>
              </label>
              <input
                {...register("deadline", {
                  required: "納期を入力してください。",
                })}
                className={styles.input}
                id="deadline"
                type="date"
              />
              {errors.deadline?.message ? (
                <span className={styles.errorMessage}>
                  {errors.deadline.message}
                </span>
              ) : null}
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="text">
                お問い合わせ内容<abbr>*</abbr>
              </label>
              <textarea
                {...register("text", {
                  required: "お問い合わせ内容を入力してください。",
                })}
                className={styles.textarea}
                id="text"
              />
              {errors.text?.message ? (
                <span className={styles.errorMessage}>
                  {errors.text.message}
                </span>
              ) : null}
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <button
              className={styles.button}
              disabled={!isDirty || isSubmitting}
              type="submit"
            >
              送信する
            </button>
          </div>
        </div>
      </form>
    </Article>
  );
}

export default ContactTop;
