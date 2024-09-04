import React, { useState } from 'react'
import './MainPage.css'
import { Badge, Box, Button, Card, CardContent, CardMedia, Container, Grid, Rating, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AddProduct, DeletecartItem, ShowUserRequest } from '../../Services/UserAction/UserAction'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SegmentIcon from '@mui/icons-material/Segment';
import { useNavigate } from 'react-router'
import logoImage from './logo.png'
import Swal from 'sweetalert2'

const MainPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allData = useSelector(state => state.data);
    const lengthData = useSelector(state => state.cartProduct);

    const handleShow = () => {
        dispatch(ShowUserRequest())
    }

    const addTocart = (data) => {        
            dispatch(AddProduct(data));
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully Add In Cart !",
                showConfirmButton: false,
                timer: 1500
            });
        
    }

    const removeFromCart = (data) => {
        Swal.fire({
            text: "Do you want to Remove From Cart ?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#1c1c1c",
            cancelButtonColor: "#909090",
            confirmButtonText: "Remove"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(DeletecartItem(data))
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Product has been Removed.",
                    icon: "success"
                });
            }
        });
    };

    return (
        <>
            <Box className="input_field">
                <SegmentIcon onClick={handleShow} className='allProductIcon' />
                <img src={logoImage} className='imageLogo' />
                <Badge color="error" badgeContent={lengthData.length} onClick={() => navigate('/page')}><ShoppingCartIcon className='cartIcon' /></Badge>
            </Box>
            <Container sx={{ margin: '20px auto' }} className='container'>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 2, lg: 2, xxxl: 2 }}>
                    {
                        allData.map((val, index) => {
                            return (
                                <>
                                    <Grid item xs={6} sx={{ height: '300px' }}>
                                        <Card sx={{ position: 'relative', height: '100%' }} index={index} className='CardDesign'>
                                            <Box className='contentDiv'>
                                                <CardContent>
                                                    <Typography variant="h5" className='apiCategory'>{val.category}</Typography>
                                                    <Typography className='apiDescription'>{val.description.substring(0, 180)}{"."}</Typography>
                                                    <Typography className='apiPrice'>{"$"}{val.price}</Typography>
                                                    <Box className='ratingStarDiv'>
                                                        <Typography>Rating :</Typography>
                                                        <Rating value={val.rating.rate} className='ratingStar' />
                                                    </Box>
                                                </CardContent>
                                                <Box className='AddCart'>
                                                    {
                                                        lengthData.some(item => item.id === val.id) ? (
                                                            <Button size="small" variant="contained" onClick={() => removeFromCart(val)} className='removeCartBtn'>Remove from Cart</Button>
                                                        ) : (
                                                            <Button size="small" variant="contained" onClick={() => addTocart(val)} className='addCartBtn'>Add to Cart</Button>
                                                        )
                                                    }
                                                </Box>
                                            </Box>
                                            <Box>
                                                <CardMedia image={val.image} className='apiImage' />
                                            </Box>
                                        </Card>
                                    </Grid >
                                </>
                            )
                        })
                    }
                </Grid>
            </Container >
        </>
    )
}

export default MainPage