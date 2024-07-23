"use client";

import { Link } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { GithubIcon } from "../ui/icons";

import { ThemeSwitch } from "@/components/ui/theme-switch";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <NextUINavbar  isBordered maxWidth="xl" position="sticky">
      <NavbarBrand>
        <Link color="foreground">
          <p className="text-[#07B3D8] font-extrabold text-[21px]">{"<"}</p>
          <img
            alt="Navbar Icon"
            className="w-[28px] h-[28px]"
            loading="eager"
            src="nav-icon.png"
          />
          <p className="text-[#3686F4] font-extrabold text-[21px]">{"/>"}</p>
        </Link>
      </NavbarBrand>
      <NavbarContent>
        <ul className="hidden md:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href} className="font-semibold">
              <NextLink
                className={clsx(linkStyles({ color: "foreground" }), {
                  "text-primary font-medium": pathname === item.href,
                })}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden md:flex basis-1/5 md:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex gap-2">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color="foreground" href={item.href} size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
