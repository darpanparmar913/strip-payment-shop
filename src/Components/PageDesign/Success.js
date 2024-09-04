import React from 'react'
import './Success.css'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router'

const Success = () => {

	const navigate = useNavigate();

	const handleBackTohome = () =>{
		navigate("/");
	}

	return (
		<>
			<Box className='main_success_Box'>
				<Box className="wrapper green">
					<Box className="header__wrapper">
						<Box className="header">
							<Box className="sign"><span></span></Box>
						</Box>
					</Box>
					<h1>Yeah !</h1>
					<p>Your Payment Successfully Done !</p>
					<button onClick={handleBackTohome} className='ShopAgain'>Shop Again</button>
				</Box>
			</Box>
		</>
	)
}

export default Success