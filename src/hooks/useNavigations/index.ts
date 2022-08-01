import { useMemo } from "react";

type Navigation = {
  href: string;
  title: string;
};

export type NavigationsData = Navigation[];

function useNavigations(): NavigationsData {
  const navigations = useMemo<NavigationsData>(
    () => [
      {
        href: "/",
        title: "TOP",
      },
      {
        href: "/gallery",
        title: "GALLERY",
      },
      {
        href: "/works",
        title: "WORKS",
      },
      {
        href: "/about",
        title: "ABOUT",
      },
      {
        href: "/contact",
        title: "CONTACT",
      },
    ],
    []
  );

  return navigations;
}

export default useNavigations;
