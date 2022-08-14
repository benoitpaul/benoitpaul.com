interface IntroductionProps {
  summary: string;
}

const Introduction = ({ summary }: IntroductionProps) => {
  return (
    <section>
      <h2>Introduction</h2>
      {summary}
    </section>
  );
};

export default Introduction;
