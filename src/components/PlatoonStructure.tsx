import React, { useState } from 'react';

export default function PlatoonStructure({ platoon }:any) {

	return (
		<>
			<ul role="list" className="flex flex-col gap-4">
				{platoon && platoon.map((item: any) => (
					<li className='text-2xl flex flex-col' key={item.name}>
					{
						item.count > 1 ? item.count + " x " + item.name : item.name
					}
                    <ul>
					{item.units.map((unit: any) => (
						unit.type == "team" ?
						(
							[...Array(unit.count)].map(() => (
							unit.units.map((unit: any) => (
							<li className='flex font-light pl-6 hover:text-white transition ease-linear duration-100' key={unit.name}>
								<svg className='mt-1 mr-2 w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-8 8v-2.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20H4Z"/></svg>
								<span className='text-xl'>{unit.name}</span>
								<div className='flex pl-3'>
								<svg className='mt-1 mr-2 w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M255 471L91.7 387V41h328.6v346zm-147.3-93.74L255 453l149.3-75.76V57H107.7v320.26zm187.61-168.34l-14.5-46l38.8-28.73l-48.27-.43L256 87.94l-15.33 45.78l-48.27.43l38.8 28.73l-14.5 46l39.31-28zM254.13 311.5l98.27-49.89v-49.9l-98.14 49.82l-94.66-48.69v50zm.13 32.66l-94.66-48.69v50l94.54 48.62l98.27-49.89v-49.9z"/></svg>
									<div className='text-base pl-0 p-1'>{unit.rank}</div>
								</div>
								<div className='flex pl-3'>
								<svg className='mt-1 mr-2 w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="m163.042 247.9l-.31-12.46a47.42 47.42 0 0 0-10-.16c-.5 2.82-1.26 6.75-2.19 11.33zm24 1.86a18.33 18.33 0 0 0 5.1-6.26h8.52a27 27 0 0 1-8.53 12.46c-6.74 5.49-16.36 8.12-28.75 8.12a109.5 109.5 0 0 1-16.16-1.39c.56-2.68 1.12-5.21 1.64-7.75c21.97 3.23 32.87-.82 38.18-5.18zm132 142.74h-30v-130h30zM20.302 206.35a22.55 22.55 0 0 1 22.74-21.85h21s.09 15 .24 16h-21.24a6.62 6.62 0 0 0-6.77 6.39l-2.31 68.61a8 8 0 0 1-8 7.69h-.28a7.94 7.94 0 0 1-7.72-8.2zm346.74-54.56l13 14.07v11.92l-13 14.07zm127 14.71v12h-98v-12zm-399-47h6v9.14l13.36 6.86h-19.36zm230 127h-40v-32s-12.21-4.29-15.05-4.29a7.75 7.75 0 0 0-4.52 1.45l-20.29 14.4a7.86 7.86 0 0 1-4.55 1.46h-62.76c-3.6-5-12.35-8.71-20.81-8.71c-9.42 0-18.49 3.74-19.73 11.75c-1.91 12.38-15.64 74.54-15.64 74.54a13.86 13.86 0 0 1-17.53 10.36l-26.37-7.87a6.34 6.34 0 0 1-4.17-8.18c5.17-14.72 22.12-71.53 22.68-80.43c.31-4.94-2.77-8.45-6.32-10.45h235.06v38zm-75-103h72v19h-72zm-16 8v27h104v-27h13v41h-271v-41z"/></svg>
									<div className='text-base pl-0 p-1'>
										{unit.weapons.join(', ')}
									</div>
								</div>
							</li>
						)))))
						:
						<li className='flex font-light hover:text-white transition ease-linear duration-100' key={unit.name}>
							<svg className='mt-1 mr-2 w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-8 8v-2.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20H4Z"/></svg>
							<span className='text-xl'>{unit.name}</span>
							<div className='flex pl-3'>
							<svg className='mt-1 mr-2 w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M255 471L91.7 387V41h328.6v346zm-147.3-93.74L255 453l149.3-75.76V57H107.7v320.26zm187.61-168.34l-14.5-46l38.8-28.73l-48.27-.43L256 87.94l-15.33 45.78l-48.27.43l38.8 28.73l-14.5 46l39.31-28zM254.13 311.5l98.27-49.89v-49.9l-98.14 49.82l-94.66-48.69v50zm.13 32.66l-94.66-48.69v50l94.54 48.62l98.27-49.89v-49.9z"/></svg>
								<div className='text-base pl-0 p-1'>{unit.rank}</div>
							</div>
							<div className='flex pl-3'>
							<svg className='mt-1 mr-2 w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="m163.042 247.9l-.31-12.46a47.42 47.42 0 0 0-10-.16c-.5 2.82-1.26 6.75-2.19 11.33zm24 1.86a18.33 18.33 0 0 0 5.1-6.26h8.52a27 27 0 0 1-8.53 12.46c-6.74 5.49-16.36 8.12-28.75 8.12a109.5 109.5 0 0 1-16.16-1.39c.56-2.68 1.12-5.21 1.64-7.75c21.97 3.23 32.87-.82 38.18-5.18zm132 142.74h-30v-130h30zM20.302 206.35a22.55 22.55 0 0 1 22.74-21.85h21s.09 15 .24 16h-21.24a6.62 6.62 0 0 0-6.77 6.39l-2.31 68.61a8 8 0 0 1-8 7.69h-.28a7.94 7.94 0 0 1-7.72-8.2zm346.74-54.56l13 14.07v11.92l-13 14.07zm127 14.71v12h-98v-12zm-399-47h6v9.14l13.36 6.86h-19.36zm230 127h-40v-32s-12.21-4.29-15.05-4.29a7.75 7.75 0 0 0-4.52 1.45l-20.29 14.4a7.86 7.86 0 0 1-4.55 1.46h-62.76c-3.6-5-12.35-8.71-20.81-8.71c-9.42 0-18.49 3.74-19.73 11.75c-1.91 12.38-15.64 74.54-15.64 74.54a13.86 13.86 0 0 1-17.53 10.36l-26.37-7.87a6.34 6.34 0 0 1-4.17-8.18c5.17-14.72 22.12-71.53 22.68-80.43c.31-4.94-2.77-8.45-6.32-10.45h235.06v38zm-75-103h72v19h-72zm-16 8v27h104v-27h13v41h-271v-41z"/></svg>
								<div className='text-base pl-0 p-1'>
									{unit.weapons.join(', ')}
								</div>
							</div>
						</li>
					))}
                    </ul>
					</li>
				))}
			</ul>
		</>
	);
}
