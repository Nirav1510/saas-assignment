'use client';

import React, { useEffect, useState } from 'react';
import { fetchProjects } from './api';

const App = () => {
	const recordsPerPage = 5;

	const [projects, setProjects] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentRecords, setCurrentRecords] = useState([]);

	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

	const handleNext = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	const handlePrev = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const fetchData = async () => {
		const data = await fetchProjects();
		setProjects(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (projects?.length > 0) {
			setCurrentRecords(projects.slice(indexOfFirstRecord, indexOfLastRecord));
			setTotalPages(Math.ceil(projects.length / recordsPerPage));
		}
	}, [projects, indexOfFirstRecord, indexOfLastRecord]);

	return (
		<div className='flex justify-center items-center min-h-screen relative overflow-hidden'>
			{/* Animated Background */}
			<div className='absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-gradient blur-3xl -z-10'></div>

			<div className='bg-white shadow-2xl rounded-xl p-8 w-full max-w-3xl'>
				<h1
					id='page-title'
					className='text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text'
				>
					SaaS Frontend Assignment
				</h1>

				<div className='overflow-x-auto shadow-lg rounded-lg'>
					<table
						role='table'
						aria-labelledby='page-title'
						className='min-w-full table-auto border-collapse border border-gray-300'
					>
						<thead className='bg-gradient-to-r from-indigo-500 to-purple-500 text-white'>
							<tr role='row'>
								<th scope='col' className='py-3 px-5 border-b font-semibold uppercase'>
									S.No.
								</th>
								<th scope='col' className='py-3 px-5 border-b font-semibold uppercase'>
									Percentage Funded
								</th>
								<th scope='col' className='py-3 px-5 border-b font-semibold uppercase'>
									Amount Pledged
								</th>
							</tr>
						</thead>
						<tbody>
							{currentRecords.map((project, index) => (
								<tr
									key={project['s.no']}
									className='text-center hover:bg-gradient-to-r hover:from-green-100 hover:to-blue-100 transition-all duration-300'
								>
									<td className='py-3 px-5 border-b'>{indexOfFirstRecord + index + 1}</td>
									<td className='py-3 px-5 border-b'>{project['percentage.funded']}%</td>
									<td className='py-3 px-5 border-b text-green-600 font-semibold'>
										${project['amt.pledged'].toLocaleString()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className='flex justify-center items-center mt-8'>
					<button
						onClick={handlePrev}
						aria-label='Previous Page'
						disabled={currentPage === 1}
						className='px-5 py-2 rounded-lg shadow-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold mr-4 disabled:opacity-50 disabled:cursor-not-allowed transition-transform transform hover:scale-105'
					>
						Previous
					</button>
					<button
						onClick={handleNext}
						aria-label='Next Page'
						disabled={currentPage === totalPages}
						className='px-5 py-2 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-transform transform hover:scale-105'
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default App;
