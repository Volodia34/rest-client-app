import GeneratedCode from '../_components/GeneratedCode';

const ResponseBlock = () => {
  return (
    <section className="container rest-client-wrapper">
      <p className="rest-title">Status: {'code'}</p>
      <GeneratedCode title={'Body:'} />
    </section>
  );
};

export default ResponseBlock;
