import { useState } from "react";
import Container from "../components/Container";
import SingleColumn from "../components/SingleColumn";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";

export default function NotFound() {
  const [showSearch, toggleSearch] = useState(false);
  return (
    <Container toggleSearch={() => toggleSearch((state) => !state)}>
      {showSearch && <Search toggleSearch={() => toggleSearch(false)} />}
      <SingleColumn>
        <Header toggleSearch={() => toggleSearch(true)} />
        <section className="layout-wide pt-48">
          <h1>404</h1>
          <p className="mt-12">It looks like nothing is here.</p>
        </section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}
