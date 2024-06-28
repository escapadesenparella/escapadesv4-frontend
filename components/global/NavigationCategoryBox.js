const NavigationCategoryBox = ({ icon, slug, pluralName }) => {
	const upperName = pluralName.charAt(0).toUpperCase() + pluralName.slice(1);
	return (
		<a
			href={`/${slug}`}
			title="upperName"
			className="inline-flex gap-x-1.5 whitespace-nowrap items-center py-2.5"
		>
			<span
				dangerouslySetInnerHTML={{ __html: icon }}
				className="inline-block [&>svg]:w-5 [&>svg]:h-5"
			></span>
			<span className="text-sm">{upperName}</span>
		</a>
	);
};

export default NavigationCategoryBox;
