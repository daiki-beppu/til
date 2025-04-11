/* eslint-disable react/prop-types */
import styles from 'src/components/Links/Links.module.css';

export const Links = (props) => {
  return (
    <div className={styles.ctas}>
      {props.items.map((item) => {
        return (
          <a
            key={item.description}
            className={`${styles[item.style]}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.description}
          </a>
        );
      })}
    </div>
  );
};
