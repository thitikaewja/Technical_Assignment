import "./App.css";
import { Box, Container } from "@mui/material";
import Header from "./component/Header"; // Header
import Body from "./component/Body"; // Body
import movies from "./movie.json"; // movies data
import { useState } from "react";
import Footer from "./component/Footer";
import { MOVIE } from "./type";
import MyList from "./component/MyList";

function App() {
  const [searchValue, setSearchValue] = useState<string>("");

  const [myList, setMyList] = useState<MOVIE[]>([]);
  const [showMyList, setShowMyList] = useState<boolean>(false);

  const handleMyListClick = () => {
    setShowMyList(!showMyList);
  };

  console.log("App", myList);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Container>
          <Header
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleMyListClick={handleMyListClick}
          />
          {showMyList ? (
            <MyList myList={myList} />
          ) : (
            <Body
              movies={movies}
              searchValue={searchValue}
              setMyList={setMyList}
            />
          )}
          <Footer />
        </Container>
      </Box>
    </>
  );
}

export default App;
