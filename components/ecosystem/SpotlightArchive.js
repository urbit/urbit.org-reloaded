import { Container, IntraNav, SingleColumn, Section } from "@urbit/foundation-design-system";
import Header from "../Header";
import Footer from "../Footer";
import Meta from "../Meta";
import Head from "next/head";
import Link from "next/link";
import EcosystemSidebar from "./EcosystemSidebar";
import Sidebar from "../Sidebar";

export default function SpotlightArchive({ posts, search }) {
    const post = {
        title: "Spotlight Archive",
        description: "The archive of ecosystem spotlights.",
    };
    return (
        <Container>
            <Head>
                <title>Archive • Spotlight • Urbit</title>
                {Meta(post)}
            </Head>
            <IntraNav ourSite="https://urbit.org" search={search} />
            <SingleColumn>
                <Header search={search} />
                <Section>
                    <div className="measure">
                        <h1>Ecosystem</h1>
                    </div>
                </Section>
                <Section className="flex">
                    <Sidebar>
                        <EcosystemSidebar />
                    </Sidebar>
                    <div>
                        <h3 className="mb-12">Spotlight Archive</h3>
                        {posts.map((post) => {
                            return (
                                <div key={post.slug} className="mb-24 cursor-pointer">
                                    <Link href={`/ecosystem/spotlight/${post.slug}`}>
                                        <div>
                                            <h3 className="text-green-400">{post.title}</h3>
                                            <div className="type-ui mt-2">
                                                {["featured-1", "featured-2", "featured-3"].map(
                                                    (feat, i) => {
                                                        if (post?.[feat]) {
                                                            return (
                                                                <>
                                                                    {i ? ", " : ""}
                                                                    <span>{post[feat].title}</span>
                                                                </>
                                                            );
                                                        }
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </Section>
            </SingleColumn>
            <Footer />
        </Container>
    );
}
