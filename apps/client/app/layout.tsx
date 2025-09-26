import type { Metadata } from "next";

import "@repo/ui/styles";

export const metadata: Metadata = {
    title: "CLIENT",
    description: "",
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <body>
                <header></header>
                <main>{children}</main>
                <footer></footer>
            </body>
        </html>
    );
};

export default RootLayout;
