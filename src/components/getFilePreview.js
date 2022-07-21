require('dotenv').config()

var FilePreview = (path) => {
   try {
		require(`${process.env.REACT_APP_SERVER_ASSET+path}`);
		return process.env.REACT_APP_SERVER_ASSET+path;
	} catch (err) {
		return '/default.png';
	}
};

export default FilePreview;