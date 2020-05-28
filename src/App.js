import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Main from './components/Main';

const App = () => {
	const [title, setTitle] = useState(null);
	//const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		/*bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();*/
		//setPopout(null);
	}, []);

	return (
		<div>
			<Header title={title} />
	    <Main setTitle={setTitle} />
		</div>
	);
}

export default App;
