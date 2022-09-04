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
      <dl>
        {profiles.map((profile, index) => (
          <div key={index}>
            <dt>
              {profile.network?.toLowerCase() === "linkedin" ? (
                <RiLinkedinBoxLine title={profile.network} />
              ) : (
                <RiGithubLine title={profile.network} />
              )}
              {/* <Icon 
                    name={`carbon:logo-${profile.network.toLowerCase()}`}
                    title={profile.network}
                    width="24"
                 /> */}
            </dt>
            <dd>
              <a href={profile.url}>{profile.url}</a>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Profiles;
