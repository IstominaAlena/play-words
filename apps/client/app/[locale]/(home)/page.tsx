import { Metadata } from "next";

import { HomePage } from "@/components/pages/home-page";

export const metadata: Metadata = {
    title: "Home",
    description: "",
    keywords: "",
};

const Home = () => <HomePage />;

export default Home;
