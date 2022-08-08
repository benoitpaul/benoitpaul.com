import React from "react";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { ProfileSchema } from "./types";
import styles from "./Resume.module.css";

interface ProfilesProps {
  profiles: ProfileSchema[];
}

const Profiles = ({ profiles }: ProfilesProps) => {
  return (
    <section>
      <h2 className={styles.sr}>Profiles</h2>
      <dl>
        {profiles.map((profile, index) => (
          <div key={index}>
            <dt>
              {profile.network?.toLowerCase() === "linkedin" ? (
                <BsLinkedin title={profile.network} />
              ) : (
                <BsGithub title={profile.network} />
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
