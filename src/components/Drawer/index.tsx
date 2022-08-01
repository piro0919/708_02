import Link from "next/link";
import { ComponentProps, useMemo } from "react";
import ReactModernDrawer from "react-modern-drawer";
import { SocialIcon } from "react-social-icons";
import styles from "./style.module.scss";
import useNavigations from "hooks/useNavigations";

export type DrawerProps = Pick<
  ComponentProps<typeof ReactModernDrawer>,
  "onClose" | "open"
>;

function Drawer({ onClose, open }: DrawerProps): JSX.Element {
  const navigations = useNavigations();
  const items = useMemo(
    () =>
      navigations.map(({ href, title }) => (
        <li key={href}>
          <Link href={href}>
            <a onClick={onClose}>{title}</a>
          </Link>
        </li>
      )),
    [navigations, onClose]
  );

  return (
    <ReactModernDrawer
      className={styles.drawer}
      direction="left"
      onClose={onClose}
      open={open}
    >
      <ul className={styles.list}>{items}</ul>
      <div>
        <div className={styles.iconsWrapper}>
          <SocialIcon
            className={styles.icon}
            target="_blank"
            url="https://www.pixiv.net/users/18209835"
          />
          <SocialIcon
            className={styles.icon}
            target="_blank"
            url="https://twitter.com/708_nhh"
          />
        </div>
        <footer className={styles.footer}>&copy; 2022 7:08</footer>
      </div>
    </ReactModernDrawer>
  );
}

export default Drawer;
