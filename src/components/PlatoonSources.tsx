export default function PlatoonSources({ sources }:any) {

	return (
		<>
			<div className='my-8 flex flex-col gap-2'>
				<h2 className='text-xl'>Sources:</h2>
				<ul role="list" className="gap-4 list-disc">
					{sources && sources.map((item: any, id: any) => (
						<li className='font-light text-lg hover:text-white transition ease-linear duration-100' key={id}><a href={item.url}>{item.name}</a></li>
					))}
				</ul>
			</div>
		</>
	);
}
