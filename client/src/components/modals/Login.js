import React, { useEffect, useState } from 'react';
import { LOGIN } from '../../cache/mutations';
import { useMutation } from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';

const Login = (props) => {
	const [input, setInput] = useState({ email: '', password: '' });
	const [loading, toggleLoading] = useState(false);
	const [showErr, displayErrorMsg] = useState(false);
	const errorMsg = "Email/Password not found.";
	const [Login] = useMutation(LOGIN);

	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	}

	const handleLogin = async (e) => {

		const { loading, error, data } = await Login({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (data.login._id === null) {
			displayErrorMsg(true);
			return;
		}
		if (data) {
			props.fetchUser();
			props.refetchTodos();
			toggleLoading(false)
			props.setShowLogin(false)
		};
	};

	useEffect(()=> {
		toggleLoading(props.showLogin);
	}, [props.showLogin]);

	return (
		// Replace div with WModal

		<WModal visible={loading} cover={true} className="login-modal centered">
				<WMHeader className="modal-header" onClose={() => props.setShowLogin(false)}>
					Login
				</WMHeader>

			
				<WMMain className="main-login-modal">

					<WInput className="modal-input" onBlur={updateInput} name='email' labelAnimation="up" barAnimation="solid" labelText="Email Address" wType="outlined" inputType='text' />
					
					<div className="modal-spacer">&nbsp;</div>
					
					<WInput className="modal-input" onBlur={updateInput} name='password' labelAnimation="up" barAnimation="solid" labelText="Password" wType="outlined" inputType='password' />

					{
						showErr ? <div className='modal-error'> {errorMsg} </div>
							: <div className='modal-error'>&nbsp;</div>
					}

				</WMMain>
			
				<WButton className="modal-button" onClick={handleLogin} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Login
				</WButton>

		</WModal>
	);
}

export default Login;