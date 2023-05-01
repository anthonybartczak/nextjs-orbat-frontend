import React, { useState } from 'react';

export default function PlatoonNotes({ notes }:any) {

	return (
		<>
			<div className='mt-14 flex flex-col gap-2'>
				<h2 className='text-xl'>Notes:</h2>
				<ul role="list" className="gap-4 list-disc">
					{notes.map((item: any) => (
						// eslint-disable-next-line react/jsx-key
						<li className='font-light text-lg'>{item.content}</li>
					))}
				</ul>
			</div>
		</>
	);
}
