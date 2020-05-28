import React from 'react';
import { Typography } from '@material-ui/core';

const Header = ({ title }) => {
	return (
		<div>
      <Typography variant="h2" gutterBottom>
        {title}
      </Typography>
		</div>
	);
}

export default Header;
