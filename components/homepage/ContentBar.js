import React, { useEffect, useState } from "react";
import ContentService from "../../services/contentService";
import NavigationCategoryBox from "../global/NavigationCategoryBox";

const ContentBar = () => {
	const service = new ContentService();
	const initialState = {
		categories: [],
		hasCategories: false,
	};
	const [state, setState] = useState(initialState);
	useEffect(() => {
		const fetchData = async () => {
			const categories = await service.getCategories();
			let hasCategories;
			if (categories.length > 0) {
				hasCategories = true;
			} else {
				hasCategories = false;
			}
			setState({
				...state,
				categories: categories,
				hasCategories: hasCategories,
			});
		};
		fetchData();
	}, []);

	return (
		<div className="content-bar min-h-[40px] border-t border-primary-50">
			<div className="w-full px-6">
				<div className="flex items-center gap-x-5 overflow-x-auto h-10">
					{state.hasCategories ? (
						state.categories.map((el) => (
							<NavigationCategoryBox
								key={el._id}
								icon={el.icon}
								slug={el.slug}
								pluralName={el.pluralName}
							/>
						))
					) : (
						<>
							<div className="inline-flex items-center gap-x-1.5">
								<span className="w-3 h-3 bg-primary-50 animate-pulse rounded-full"></span>
								<span className="w-20 h-2.5 bg-primary-50 animate-pulse rounded-full"></span>
							</div>
							<div className="inline-flex items-center gap-x-1.5">
								<span className="w-3 h-3 bg-primary-50 animate-pulse rounded-full"></span>
								<span className="w-20 h-2.5 bg-primary-50 animate-pulse rounded-full"></span>
							</div>
							<div className="inline-flex items-center gap-x-1.5">
								<span className="w-3 h-3 bg-primary-50 animate-pulse rounded-full"></span>
								<span className="w-20 h-2.5 bg-primary-50 animate-pulse rounded-full"></span>
							</div>
							<div className="inline-flex items-center gap-x-1.5">
								<span className="w-3 h-3 bg-primary-50 animate-pulse rounded-full"></span>
								<span className="w-20 h-2.5 bg-primary-50 animate-pulse rounded-full"></span>
							</div>
							<div className="inline-flex items-center gap-x-1.5">
								<span className="w-3 h-3 bg-primary-50 animate-pulse rounded-full"></span>
								<span className="w-20 h-2.5 bg-primary-50 animate-pulse rounded-full"></span>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ContentBar;
