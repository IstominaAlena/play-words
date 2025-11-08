import { Metadata } from "next";

import { createMeta } from "@repo/common/utils/seo";

import { HomePage } from "@/components/pages/home-page";

export const generateMetadata = async (): Promise<Metadata> => createMeta("home_page", "/");

const Home = () => <HomePage />;

export default Home;
