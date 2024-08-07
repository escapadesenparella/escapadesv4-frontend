import ShareBarModal from '../social/ShareBarModal';
import Script from 'next/script';

const ListingHeader = ({ title, subtitle, textHeader, readMoreButton, sponsorData }) => {
	return (
		<>
			{/* Listing heading + subtitle + meta info */}
			<section className="relative pt-4 md:pt-8">

				<div className="md:max-w-xl lg:max-w-5xl">
					<h1
						className="font-display max-w-xl my-0"
						dangerouslySetInnerHTML={{ __html: title }}
					></h1>
					{subtitle ? <div className="text-block mt-2.5 mb-3 md:mt-3 md:mb-4 max-w-2xl" dangerouslySetInnerHTML={{ __html: subtitle }}></div> : null}
					{textHeader ? <div className="text-block mt-2.5 mb-3 md:mt-3 md:mb-4 max-w-2xl" dangerouslySetInnerHTML={{ __html: textHeader }}></div> : null}
					{readMoreButton ? <a href="#" title="Seguir llegint" class="button button__primary button__lg mt-2.5">Seguir llegint</a> : <div className="mt-5">
						<ShareBarModal picture={null} title={'Històries en parella'} rating={null} slug={'https://escapadesenparella.cat/histories'} locality={null} colorClass={''} />
					</div>}
				</div>

			</section >
			<Script
				async
				src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
				strategy="lazyOnload"
				crossOrigin="anonymous"
			/>
		</>
	);
};

export default ListingHeader;
