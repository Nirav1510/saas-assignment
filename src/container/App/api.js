export const fetchProjects = async () => {
	try {
		const url =
			'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json';
		const response = await fetch(url);
		const data = await response.json();

		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
};
