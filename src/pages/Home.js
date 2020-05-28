import React, { useEffect } from 'react'
import { Button } from '@material-ui/core'
import { useHistory } from "react-router-dom";

const Home = () => {

	const history = useHistory();

	return (
		<div>
			Home
			<Button variant="contained" onClick={() => history.push('/quiz')}>Quiz</Button>
		</div>
	);
}

export default Home;
