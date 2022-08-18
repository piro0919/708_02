import Link from "next/link";
import { ReactNode } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useWindowSize } from "usehooks-ts";
import styles from "./style.module.scss";

export type AdminLayoutProps = {
  children: ReactNode;
};

function AdminLayout({ children }: AdminLayoutProps): JSX.Element {
  const { height } = useWindowSize();

  return (
    <div className={styles.wrapper}>
      <ProSidebar className={styles.proSidebar} style={{ height }}>
        <Menu>
          <MenuItem>
            <Link href="/admin/gallery">
              <a>GALLERY</a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/admin/works">
              <a>WORKS</a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/admin/about">
              <a>ABOUT</a>
            </Link>
          </MenuItem>
        </Menu>
        <hr className={styles.hr} />
        <Menu>
          <MenuItem>
            <Link href="/admin/assets">
              <a>ASSETS</a>
            </Link>
          </MenuItem>
        </Menu>
      </ProSidebar>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default AdminLayout;
