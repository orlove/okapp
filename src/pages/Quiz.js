import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
//import { Link } from '@material-ui/core';

import persik from '../img/persik.png';

const Quiz = () => {

	return (
		<div>
			Persik
			<img className="Persik" src={persik} alt="Persik The Cat"/>
			<Link to='/'>Home</Link>
		</div>
	);
}

export default Quiz;
