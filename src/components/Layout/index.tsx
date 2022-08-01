import NoSSR from "@mpth/react-no-ssr";
import noScroll from "no-scroll";
import { ReactNode, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useBoolean } from "usehooks-ts";
import styles from "./style.module.scss";
import Drawer from "components/Drawer";

export type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps): JSX.Element {
  const {
    setFalse: offIsOpen,
    setTrue: onIsOpen,
    value: isOpen,
  } = useBoolean();

  useEffect(() => {
    if (isOpen) {
      noScroll.on();

      return;
    }

    noScroll.off();
  }, [isOpen, offIsOpen, onIsOpen]);

  return (
    <>
      {children}
      <button className={styles.button} onClick={onIsOpen}>
        <AiOutlineMenu color="#333" size={32} />
      </button>
      <NoSSR>
        <Drawer onClose={offIsOpen} open={isOpen} />
      </NoSSR>
    </>
  );
}

export default Layout;
