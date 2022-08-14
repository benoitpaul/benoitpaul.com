import { BsLinkedin, BsGithub } from "react-icons/bs";
import { ProfileSchema } from "./types";

interface ProfilesProps {
  profiles: ProfileSchema[];
}

const Profiles = ({ profiles }: ProfilesProps) => {
  return (
    <section>
      <h2 className="sr">Profiles</h2>
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
