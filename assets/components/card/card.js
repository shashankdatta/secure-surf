import styles from './card.module.css'

const Card = ({ text }) => {
  return (
    <div className={styles.card}>
      {text}
    </div>
  );
};

export default Card;