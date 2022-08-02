import classes from "./BookList.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";


function BookList({ name, image, writer, data, ranking, link }, props) {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const movieAnimations = {
    hidden: { opacity: 0, y: 200 },
    visible: { opacity: 1, y: 0 },
    tap: { scale: 0.9 },
  };

 

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      variants={movieAnimations}
      ref={ref}
      initial="hidden"
      animate={controls}
      whileTap="tap"
      transition={{
        duration: 2,
      }}
      
    >
      <div className={classes.card}>
        <motion.img className={classes.card_image} src={image} alt={name} />

        <div className={classes.container}>
          <motion.h2 className={classes.card_title}>{name}</motion.h2>

          <motion.h3 className={classes.card_author}>{writer}</motion.h3>
          <motion.p className={classes.card_description}>{data}</motion.p>
        </div>
      </div>
    </motion.a>
  );
}

export default BookList;
