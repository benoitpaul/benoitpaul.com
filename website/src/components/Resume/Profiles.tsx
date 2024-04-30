import { RiGithubLine, RiLinkedinBoxLine } from "react-icons/ri";

import { ProfileSchema } from "./types";

import styles from "./Profiles.module.css";

interface ProfilesProps {
  profiles: ProfileSchema[];
}

const Profiles = ({ profiles }: ProfilesProps) => {
  return (
    <section className={styles.profiles}>
      <h2 className="sr">Profiles</h2>
      <ul className="nobullet">
        {profiles.map((profile, index) => (
          <li key={index}>
            <a href={profile.url}>
              {profile.network?.toLowerCase() === "linkedin" ? (
                <RiLinkedinBoxLine title={profile.network} />
              ) : (
                <RiGithubLine title={profile.network} />
              )}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Profiles;
