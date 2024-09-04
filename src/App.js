import { Route, Routes } from 'react-router';
import './App.css';
import MainPage from './Components/MainPage/MainPage';
import PageDesign from './Components/PageDesign/PageDesign';
import Success from './Components/PageDesign/Success';
import Faield from './Components/PageDesign/Faield';


function App() {

	
	return (
		<>
			<Routes>
				<Route element={<MainPage />} path="/" />
				<Route element={<PageDesign />} path="/page" />
				<Route element={<Success />} path="/success" />
				<Route element={<Faield />} path="/faield" />
			</Routes>
		</>
	)
}

export default App;
