import axios, { AxiosResponse } from "axios";
import { ReactElement, useCallback } from "react";
import toast from "react-hot-toast";
import ContactTop, { ContactTopProps } from "components/ContactTop";
import Layout from "components/Layout";
import NestedLayout from "components/NestedLayout";
import Seo from "components/Seo";
import { PostEmailData, PostEmailBody } from "pages/api/email";

function Contact(): JSX.Element {
  const handleSubmit = useCallback<ContactTopProps["onSubmit"]>(
    async ({ budget, companyName, deadline, email, name, subject, text }) => {
      await axios.post<
        PostEmailData,
        AxiosResponse<PostEmailData>,
        PostEmailBody
      >("/api/email", {
        subject,
        from: `"${name}${companyName ? ` - ${companyName}` : ""}" <${email}>`,
        replyTo: email,
        text: `${text}\n\n予算：${budget}円\n納期：${deadline}`,
      });

      toast.success("メールを送信しました！");
    },
    []
  );

  return (
    <>
      <Seo title="CONTACT" />
      <ContactTop onSubmit={handleSubmit} />
    </>
  );
}

Contact.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

export default Contact;
