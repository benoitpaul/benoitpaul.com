import { BasicsSchema } from "./types";

import styles from "./Contact.module.css";

interface ContactProps {
  basics: BasicsSchema;
}

const Contact = ({ basics }: ContactProps) => {
  const { location, phone, email, url } = basics;
  return (
    <section className={styles.contact}>
      <h2 className="sr">Contact</h2>
      <dl>
        <dt>address</dt>
        <dd>
          <address>
            <p>{location.address}</p>
            <p>
              {location.city} {location.postalCode}
            </p>
            <p>{location.region}</p>
          </address>
        </dd>
        <dt>phone</dt>
        <dd>
          <a href={`tel:${phone}`}>{phone}</a>
        </dd>
        <dt>email</dt>
        <dd>
          <a href={`mailto:${email}`}>{email}</a>
        </dd>
        <dt>website</dt>
        <dd>
          <a href={url}>{url}</a>
        </dd>
      </dl>
    </section>
  );
};

export default Contact;
