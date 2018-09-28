Asgc.UI.win10.config.rectangleProgress = (function(){

	return {
		width: '40%',
		height: '20px',
		left: '30%',
		color: 'red',
		activable: false,
		dom: {
			border: {
				style: {
					'width': '40%',
					'height': '20px',
					'left': '30%',
					'border': '1px solid #3baced',
					'box-shadow': 'rgb(0, 0, 0, 0.3) 1px 1px 24px',
					'border-radius': '0px',
					'position': 'absolute',
					'margin': 'auto',
				}
			},
			content: {
				style: {
					'float': 'left',
					'height': '100%',
					'width': '100%'
				}
			},
			progress: {
				style: {
					'height': '100%',
					'width': '0%'
				}
			},
			valueDiv: {
				style: {
					'float': 'right',
					'position': 'absolute',
					'margin-left': '5px',
					'display': 'inline-block'
				}
			}
		}
	};
})();