import Head from "next/head";
import Meta from "../components/Meta";
import {
  Container,
  SingleColumn,
  Section,
  IntraNav,
} from "@urbit/foundation-design-system";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TrialOver(props) {
  const post = {
    title: "Trial Over",
  };


  return (
    <Container>
      <Head>
        <title>Trial Over • urbit.org</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={props.search} />
      <SingleColumn>
        <Header />
        <Section className="pt-8">
          <h1>Trial Over</h1>
          <p className="mt-12">Your trial has ended.</p>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}
