import { useEffect, useState } from "react";
import "./App.css";
import BookList from "./components/BookList";
import { motion } from "framer-motion";
import image from "./Images/read.png";
import confusedload from "./Images/confused-unga.gif";


function App() {
  const [loading, setLoading] = useState(true);
  const [bestSellers, setBestSellers] = useState([]);
  

 

  useEffect(() => {
    getBookList();
  }, []);

  const getBookList = async () => {
    setLoading(true);
    const response = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=DDGQr9b5raQslRqKrxrYH3GHSEVMPA2w`
    );

    const list = await response.json();

    setBestSellers(list.results.books);
    setLoading(false);
    
  };

  return (
    <div>
      {loading && (
        <img
          src={confusedload}
          alt="Reload"
          width={400}
          height={400}
          className="loader"
        />
      )}
      {!loading && (
        <div>
          <motion.header
            animate={{
              opacity: 1,
            }}
            initial={{
              opacity: 0,
            }}
            transition={{
              duration: 2,
            }}
          >
            <img src={image} alt="Book" width={100} height={100} />
          </motion.header>

          <motion.h1
            animate={{
              opacity: 1,
            }}
            initial={{
              opacity: 0,
            }}
            transition={{
              duration: 2,
            }}
          >
            New York Times BestSellers
          </motion.h1>

          <motion.h2
            animate={{
              opacity: 1,
            }}
            initial={{
              opacity: 0,
            }}
            transition={{
              duration: 2,
            }}
          >
            (Hardcover Fiction)
          </motion.h2>

          <div
            className="booklist"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {bestSellers.map((item) => (
              
              <motion.div>
                <BookList
                  key={item.rank}
                  link={item.amazon_product_url}
                  image={item.book_image}
                  ranking={item.rank}
                  name={item.title}
                  writer={item.author}
                  //data={item.description}
                ></BookList>

              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
