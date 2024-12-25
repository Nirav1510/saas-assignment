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
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold text-center mb-6' id='page-title'>
				Saas Frontend Assignment
			</h1>

			<div className='overflow-x-auto shadow-lg rounded-lg'>
				<table
					role='table'
					aria-labelledby='page-title'
					className='min-w-full table-auto border-collapse border border-gray-200'
				>
					<thead className='bg-gray-100'>
						<tr role='row'>
							<th className='py-2 px-4 border-b' scope='col' aria-label='Serial Number'>
								S.No.
							</th>
							<th className='py-2 px-4 border-b' scope='col' aria-label='Project Title'>
								Title
							</th>
							<th className='py-2 px-4 border-b' scope='col' aria-label='Percentage Funded'>
								Percentage Funded
							</th>
							<th className='py-2 px-4 border-b' scope='col' aria-label='Amount Pledged'>
								Amount Pledged
							</th>
							<th className='py-2 px-4 border-b' scope='col' aria-label='Location'>
								Location
							</th>
						</tr>
					</thead>

					<tbody>
						{currentRecords.map((project, index) => (
							<tr
								key={project['s.no']}
								className='hover:bg-gray-50 transition-colors duration-200 ease-in-out'
								role='row'
							>
								<td className='py-2 px-4 border-b text-center' role='cell'>
									{indexOfFirstRecord + index + 1}
								</td>
								<td className='py-2 px-4 border-b' role='cell'>
									{project.title}
								</td>
								<td className='py-2 px-4 border-b text-center' role='cell'>
									{project['percentage.funded']}%
								</td>
								<td className='py-2 px-4 border-b text-center' role='cell'>
									${project['amt.pledged'].toLocaleString()}
								</td>
								<td className='py-2 px-4 border-b text-center' role='cell'>
									{project.location}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className='flex justify-center items-center mt-6'>
				<button
					onClick={handlePrev}
					aria-label='Previous Page'
					disabled={currentPage === 1}
					className='px-4 py-2 bg-blue-500 text-white rounded-md mr-4 disabled:opacity-50 transition-all duration-300 hover:bg-blue-600'
				>
					Previous
				</button>

				<button
					onClick={handleNext}
					aria-label='Next Page'
					disabled={currentPage === totalPages}
					className='px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 transition-all duration-300 hover:bg-blue-600'
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default App;
