import { Metadata } from "next";

import { createMeta } from "@repo/common/utils/seo";

import { HomePage } from "@/components/pages/home-page";
import { Routes } from "@/enums/routes";

export const generateMetadata = async (): Promise<Metadata> => createMeta("home_page", Routes.HOME);

const Home = () => <HomePage />;

export default Home;
