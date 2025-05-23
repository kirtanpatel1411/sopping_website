import React, { useState } from "react";
import Productcompo from "../component/Product/productcompo";
import Pagination from "@mui/material/Pagination";
import { useTheme } from "@mui/material/styles";
/**
 * This is the main component of the application
 * @returns function
 */
function Home() {
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <div className="container">
        <Productcompo page={page} />
      </div>
      <div className="page-con">
        <div className="page">
          <Pagination
            count={10}
            page={page}
            onChange={handlePageChange}
            sx={{
              display: "flex",
              justifyContent: "center", 
              alignItems: "center",
              marginTop: "20px",
              color: theme.palette.primary.main,

              "& .MuiPaginationItem-root": {
                color: theme.palette.primary.main,
                border: `3px solid ${theme.palette.primary.main}`,
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.secondary.main,
                },
              },
            }}
            variant="outlined"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
