import ProductCard, { ProductType } from "../ProductCard/ProductCard";
import { useAppUserContext } from "@/utils/store/useAppUserContext";
import { useCallback } from "react";
import { Grid, Button, Box, Skeleton } from "@mui/material";

const DashboardContent = () => {
    const { state, dispatch } = useAppUserContext();

    const handleNextPage = useCallback(() => {
        if (state.currentPage * state.itemsPerPage < state.Allproducts.total) {
            dispatch({ type: "SET_PAGE", payload: state.currentPage + 1, dispatch });
        }
    }, [state.currentPage, state.itemsPerPage, state.Allproducts.total, dispatch]);

    const handlePreviousPage = () => {
        if (state.currentPage > 1) {
            dispatch({ type: "SET_PAGE", payload: state.currentPage - 1, dispatch });
        }
    };

    return (
        <Box sx={{ display: 'felx', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <Grid container spacing={2}>
                {state.Allproducts.products?.length > 0 ? (
                    state.Allproducts.products.map(({ id, title, price, thumbnail }: ProductType) => (
                        <Grid key={id} item xs={12} sm={6} md={4} lg={3} style={{ maxWidth: "20%", flexBasis: "20%" }}>
                            <ProductCard id={id} title={title} price={price} thumbnail={thumbnail} />
                        </Grid>
                    ))
                ) : (
                    <>
                        {[...Array(10)].map((_, index) => (
                            <Grid key={index} item xs={12} sm={6} md={4} lg={3} style={{ maxWidth: "20%", flexBasis: "20%" }}>
                                <Skeleton variant="rectangular" width="100%" height={200} />
                            </Grid>
                        ))}
                    </>
                )}
            </Grid>
            <Box textAlign="center" m={3} sx={{display: 'flex' , gap : "20px" , alignItems : 'center' , justifyContent : 'center'}}  >
                <Button variant="outlined" onClick={handlePreviousPage}>Previous</Button>
                <Button variant="outlined" onClick={handleNextPage}>Next</Button>
            </Box>
        </Box>
    );
};

export default DashboardContent;
