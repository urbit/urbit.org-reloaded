import { useState, useEffect } from 'react';
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

const postReq = (path, params, method='post') => {
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}



export default function Trial(props) {
  const post = {
    title: "Trial",
  };

  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('https://api.shore.arvo.network/count', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => res.json())
      .then(data => {
        setCount(data.count);
      });
  }, []);

  const available = count > 0;

  const buttonBg = available ? '' : 'pink';

  return (
    <Container>
      <Head>
        <title>Trial • urbit.org</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={props.search} />
      <SingleColumn>
        <Header />
        <Section className="pt-8">
          <h1>Trial</h1>
          <p className="mt-12">There are currently {count} trial comets left.</p>
        </Section>
        <div className="layout px-4 md:px-8">
          <a className="p-8 button-lg bg-green-400 text-white"
             style={{"backgroundColor": buttonBg}}
             onClick={(e) => {
               e.stopPropagation();

               if (!available) {
                 return
               }

               fetch('https://api.shore.arvo.network/enter', {
                 method: 'GET',
                 headers: {'Content-Type': 'application/json'}
               })
                 .then(res =>{
                   if (!res.ok) {
                     throw 'Error response from shore api.';
                   }
                   return res.json();
                 })
                 .then(data => {
                   postReq(data.url + '/~/login', {password: data.code, redirect: '/'});
                 })
                 .catch(e => setCount(0));
             }}
          >
            {available ? 'Try now' : 'No trial comets available, try again later'}
          </a>
        </div>
      </SingleColumn>
      <Footer />
    </Container>
  );
}
