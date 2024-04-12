import Image from "next/image";
import Link from "next/link";

const RegularListBox = ({
	index,
	slug,
	cover,
	title,
	subtitle,
	avatar,
	owner,
	date,
}) => {
	let publicationDate = new Date(date).toLocaleDateString("ca-es", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
	const coverPath = cover.substring(0, 51);
	const imageId = cover.substring(63);
	const coverImg = `${coverPath}w_475,h_318,c_fill/${imageId}`;

	const avatarPath = avatar.substring(0, 51);
	const avatarId = avatar.substring(63);
	const avatarImg = `${avatarPath}w_32,h_32,c_fill/${avatarId}`;
	return (
		<article className="w-full group">
			<Link href={`/llistes/${slug}`}>
				<a
					title={title}
					className="relative"
				>
					<picture className="block aspect-w-4 aspect-h-3 relative after:block after:w-full after:h-full after:z-20 after:content after:absolute after:inset-0 after:bg-primary-500 after:bg-opacity-0 rounded-2xl overflow-hidden">
						<Image src={coverImg}
							alt={title}
							layout="fill"
							priority={index === 0 || index === 1 || index === 2 ? true : false}
							loading={index === 0 || index === 1 || index === 2 ? 'eager' : 'lazy'}
							placeholder="blur"
							blurDataURL={coverImg}
						/>
					</picture>

					<div className="w-full pt-3 pb-4">
						<h3 className="text-block font-normal my-0 pr-10">
							{title}
						</h3>
						<div className="flex items-center mt-2 md:mt-3">
							<div className="w-6 h-6 mr-2 rounded-full overflow-hidden">
								<picture>
									<Image src={avatarImg}
										alt={owner}
										width={32}
										height={32}
										priority={false}
										loading="lazy"
									/>
								</picture>
							</div>
							<div className="flex items-center justify-center">
								<span className="text-15 font-light inline-block text-grey-700">
									{owner}
								</span>
								<span className="mx-1.5 text-15 font-light inline-block text-grey-700">
									–
								</span>
								<span className="text-15 font-light inline-block text-grey-700">
									{publicationDate}
								</span>
							</div>
						</div>
					</div>
				</a>
			</Link>
		</article>
	);
};

export default RegularListBox;
