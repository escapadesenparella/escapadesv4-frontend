import Image from "next/image";
import Link from "next/link";

const StoryListing = ({ story, index }) => {
	const createdDate = new Date(story.createdAt).toLocaleDateString("ca-es", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	const coverPath = story.cover.substring(0, 51);
	const imageId = story.cover.substring(63);
	const coverImg = `${coverPath}w_457,h_343,c_fill/${imageId}`;

	const avatarPath = story.owner.avatar.substring(0, 51);
	const ownerImageId = story.owner.avatar.substring(63);
	const avatarImg = `${avatarPath}w_24,h_24,c_fill/${ownerImageId}`;

	return (
		<Link href={"histories/" + story.slug} key={index}>
			<a className="relative">
				<picture className="block aspect-w-4 aspect-h-3 relative after:block after:w-full after:h-full after:z-20 after:content after:absolute after:inset-0 after:bg-primary-500 after:bg-opacity-0 rounded-2xl overflow-hidden">
					<Image src={coverImg}
						alt={story.title}
						layout="fill"
						priority={false}
						loading={'lazy'}
						placeholder="blur"
						blurDataURL={coverImg}
					/>
				</picture>

				<div className="w-full pt-3 pb-4">
					<h3 className="text-block font-normal my-0 pr-10">
						{story.title}
					</h3>
					<div className="flex items-center mt-2 md:mt-3">
						<div className="w-6 h-6 mr-2 rounded-full overflow-hidden">
							<picture>
								<Image src={avatarImg}
									alt={story.owner.fullName}
									width={32}
									height={32}
									priority={false}
									loading="lazy"
								/>
							</picture>
						</div>
						<div className="flex items-center justify-center">
							<span className="text-15 font-light inline-block text-grey-700">
								{story.owner.fullName}
							</span>
							<span className="mx-1.5 font-light inline-block text-grey-700">
								–
							</span>
							<span className="text-15 font-light inline-block text-grey-700">
								{createdDate}
							</span>
						</div>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default StoryListing;
