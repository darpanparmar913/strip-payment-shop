import React, { useState } from 'react'
import './PageDesign.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import pageDesignLogo from './logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router'
import { Badge, Box, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import noData from './no_data.png'
import DeleteIcon from '@mui/icons-material/Delete';
import { DeletecartItem } from '../../Services/UserAction/UserAction';
import Swal from 'sweetalert2';
import StarIcon from '@mui/icons-material/Star';
import CircularProgress from '@mui/material/CircularProgress';


const PageDesign = () => {

	const CartProduct = useSelector(state => state.cartProduct);

	let TotalBill = 0;

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isPaymentLoading, setPaymentLoading] = useState(false);

	const HancleDeleteCart = (value) => {
		Swal.fire({
			text: "Do you want to delete a product ?",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#1c1c1c",
			cancelButtonColor: "#909090",
			confirmButtonText: "Delete"
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(DeletecartItem(value))
				Swal.fire({
					title: "Deleted!",
					text: "Your Product has been deleted.",
					icon: "success"
				});
			}
		});
	}


	const HandlePyment = async (billAmount) => {
		setPaymentLoading(true);

		const secretKey = 'sk_test_51Opq1WSFg39f1OSrmbD6dlVP7bCjSVhct6Q4MZTBlg64G8SWaGAWMYSYA1sIQLdCZDIMjyMWaalfNYSs0t36cUJW00qlw31i7V';
		const apiUrl = 'https://api.stripe.com/v1/prices'

		const data = new URLSearchParams({
			currency: 'usd',
			unit_amount: parseFloat(billAmount) * 100,
			'product_data[name]': 'Cloth & Material'
		});

		fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + secretKey,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: data
		}).then(response => response.json())
			.then(data => {

				console.log("First Data For Price:::::>", data);

				const url = 'https://api.stripe.com/v1/checkout/sessions';
				const successUrl = 'http://localhost:3000/success';
				const cancelUrl = 'http://localhost:3000/faield';
				const priceId = data.id;
				const quantity = 1;

				const secondData = new URLSearchParams();
				secondData.append('success_url', successUrl);
				secondData.append('cancel_url', cancelUrl);
				secondData.append('line_items[0][price]', priceId);
				secondData.append('line_items[0][quantity]', quantity);
				secondData.append('mode', 'payment');

				fetch(url, {
					method: 'POST',
					headers: {
						'Authorization': 'Bearer sk_test_51Opq1WSFg39f1OSrmbD6dlVP7bCjSVhct6Q4MZTBlg64G8SWaGAWMYSYA1sIQLdCZDIMjyMWaalfNYSs0t36cUJW00qlw31i7V',
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: secondData,
				})
					.then(response => response.json())
					.then(session => {
						console.log('Checkout Session created:', session);
						window.location.href = session.url
						if (session.payment_status == "paid") {
							window.location.href = "http://localhost:3000/success"
						}
					})
					.catch(error => {
						window.location.href = "http://localhost:3000/faield"
						console.error('Error creating Checkout Session:', error);
					});

			})

	};

	return (
		<>
			<Box className="cart_field">
				<img src={pageDesignLogo} className='imageLogo' onClick={() => navigate('/')} />
				<Badge><AccountCircleIcon sx={{ fill: '#1c1c1c' }} /></Badge>
			</Box>
			<Container sx={{ margin: '20px auto' }} className='container'>
				{
					CartProduct.length > 0 ?
						<TableContainer className='main_class'>
							<Table size="large" className='CartTable'>
								<TableHead className='tableHead'>
									<TableRow>
										<TableCell align="center">Product Id</TableCell>
										<TableCell align="center">Image</TableCell>
										<TableCell align="center">Rating</TableCell>
										<TableCell align="center">Category</TableCell>
										<TableCell align="center">Price</TableCell>
										<TableCell align="center">Delete</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										CartProduct.map((val) => {
											TotalBill += val.price;
											return (
												<TableRow key={val.title} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
													<TableCell align="center">{val.id}</TableCell>
													<TableCell align="center">
														<img src={val.image} alt="product_image" className='cartImage' />
													</TableCell>
													<TableCell align="center">
														<Box className='ratingRow'>
															{val.rating.rate}
															{<StarIcon className='starRow' />}
														</Box>
													</TableCell>
													<TableCell align="center">{val.category}</TableCell>
													<TableCell align="center">{"$"}{val.price}</TableCell>
													<TableCell align="center">
														<form>
															<Button onClick={() => HancleDeleteCart(val)}><DeleteIcon className='DeleteBtn' /></Button>
														</form>
													</TableCell>
												</TableRow>
											)
										})
									}
									<TableRow className='totalCart'>
										<TableCell align="center"></TableCell>
										<TableCell align="center"></TableCell>
										<TableCell align="center" rowSpan={2}>Total Amount :</TableCell>
										<TableCell align="center"></TableCell>
										<TableCell align="center">{"$"}{TotalBill.toFixed(2)}</TableCell>
										<TableCell align="center">
											<Button type="submit" variant='contained' color='success' className='PaynowBtn' onClick={() => HandlePyment(TotalBill)} disabled={isPaymentLoading}>{isPaymentLoading ? <CircularProgress color="success" size="25px" /> : "Pay " + " $" + TotalBill.toFixed(2)}</Button>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
						: <div className='nodataImage'>
							<img src={noData} />
							<h2>No Product In Cart</h2>
						</div>

				}
			</Container>
		</>
	)
}

export default PageDesign