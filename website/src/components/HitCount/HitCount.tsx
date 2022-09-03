interface HitCountProps {
  hits?: number;
}
const HitCount = ({ hits }: HitCountProps) => {
  return <span>{`${hits ? hits.toLocaleString() : "----"} views`}</span>;
};

export default HitCount;
