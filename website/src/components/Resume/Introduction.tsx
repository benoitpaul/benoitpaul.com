interface IntroductionProps {
  summary: string;
}

const Introduction = ({ summary }: IntroductionProps) => {
  return (
    <section>
      <h2>Introduction</h2>
      <p>{summary}</p>
    </section>
  );
};

export default Introduction;
