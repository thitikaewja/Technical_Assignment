import { Typography, Box, Grid, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import CategoryJson from "../category.json";
import { CATEGORY } from "../type";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

interface HeaderProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  handleMyListClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ setSearchValue, handleMyListClick}) => {
  const [categories, setCategories] = useState<string>("Categories");
  const [search, setSearch] = useState<string>("");
  const [year, setYear] = useState<string>("Year");

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
    if (selectedValue === "All") {
      setCategories("Categories");
      setSearchValue("");
      setYear("Year");
    } else {
      setCategories(selectedValue);
      setSearchValue(selectedValue);
    }

    // Reset the search state
    setSearch("");
  };

  const handleChangeYear = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
    if (selectedValue === "All") {
      setCategories("Categories");
      setSearchValue("");
      setYear("Year");
    } else {
      setYear(selectedValue);
      setSearchValue(selectedValue);
      setCategories("Categories");
    }

    // Reset the search state
    setSearch("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = event.currentTarget.value;
      setSearchValue(value);

      // After send value reset value on state
      setCategories("Categories");
      setYear("Year");
      setSearch("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "Black",
          p: 2,
          boxShadow: 1,
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={8} sm={6}>
            <Typography
              variant="h5"
              sx={{
                color: "white",
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
              }}
            >
              Technical Assignment
            </Typography>
          </Grid>
          <Grid item xs={4} sm={6} display="flex" justifyContent="flex-end">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={search}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
              />
            </Search>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ p: 2, pt: 10 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <FormControl
              fullWidth
              variant="outlined"
              sx={{
                borderRadius: "50px",
                "& .MuiInputBase-root": {
                  borderRadius: "50px",
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            >
              <Select
                displayEmpty
                value={categories}
                onChange={handleChange}
                sx={{
                  color: "white",
                  fontSize: "12px",
                  ".MuiSvgIcon-root": {
                    fill: "white !important",
                  },
                }}
              >
                <MenuItem
                  value="Categories"
                  defaultValue={0}
                  sx={{ fontSize: "12px", color: "gray" }}
                >
                  Categories
                </MenuItem>
                <MenuItem
                  value="All"
                  defaultValue={0}
                  sx={{ fontSize: "12px", color: "gray" }}
                >
                  All
                </MenuItem>
                {CategoryJson.map((data: CATEGORY, index: number) => (
                  <MenuItem
                    key={index}
                    value={data.category}
                    sx={{ fontSize: "12px" }}
                  >
                    {data.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl
              fullWidth
              variant="outlined"
              sx={{
                borderRadius: "50px",
                "& .MuiInputBase-root": {
                  borderRadius: "50px",
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            >
              <Select
                displayEmpty
                value={year}
                onChange={handleChangeYear}
                sx={{
                  color: "white",
                  fontSize: "12px",
                  ".MuiSvgIcon-root": {
                    fill: "white !important",
                  },
                }}
              >
                <MenuItem
                  value="Year"
                  defaultValue={0}
                  sx={{ fontSize: "12px", color: "gray" }}
                >
                  Years
                </MenuItem>
                <MenuItem
                  value="All"
                  defaultValue={0}
                  sx={{ fontSize: "12px", color: "gray" }}
                >
                  All
                </MenuItem>
                <MenuItem
                  value="2020"
                  defaultValue={0}
                  sx={{ fontSize: "12px", color: "gray" }}
                >
                  2020
                </MenuItem>
                <MenuItem
                  value="2021"
                  defaultValue={0}
                  sx={{ fontSize: "12px", color: "gray" }}
                >
                  2021
                </MenuItem>
                <MenuItem
                  value="2022"
                  defaultValue={0}
                  sx={{ fontSize: "12px", color: "gray" }}
                >
                  2022
                </MenuItem>
                <MenuItem
                  value="2023"
                  defaultValue={0}
                  sx={{ fontSize: "12px", color: "gray" }}
                >
                  2023
                </MenuItem>
                <MenuItem
                  value="2024"
                  defaultValue={0}
                  sx={{ fontSize: "12px", color: "gray" }}
                >
                  2024
                </MenuItem>
                {/* {CategoryJson.map((data: CATEGORY, index: number) => (
                  <MenuItem
                    key={index}
                    value={data.category}
                    sx={{ fontSize: "12px" }}
                  >
                    {data.category}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              onClick={handleMyListClick}
              sx={{
                borderRadius: "50px",
                width: "100%",
                height: "50px",
                backgroundColor: "secondary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "secondary.dark",
                },
              }}
            >
              My List
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Header;
