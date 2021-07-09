import Container from "../components/Container";
import SingleColumn from "../components/SingleColumn";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NotFound(props) {
  return (
    <Container>
      <SingleColumn>
        <Header search={props.search} />
        <section className="layout-wide pt-48">
          <h1>404</h1>
          <p className="mt-12">It looks like nothing is here.</p>
        </section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}
