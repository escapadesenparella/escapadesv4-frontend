const FollowInstagramBox = () => {
  return (
    <div className="cta-instagram-footer flex flex-col items-center">
      <h3 className="text-center max-w-lg mx-auto font-light">
        Descobreix més escapades com aquesta. Segueix-nos a Instagram! 👇
      </h3>
      <div className="mt-4 w-full">
        <a
          href="https://instagram.com/escapadesenparella"
          title="Segueix-nos a Instagram"
          className="flex items-center justify-center w-full button button__med button__primary"
          rel="nofollow noreferrer"
          target="_blank"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M16.5 7.5l0 .01" />
          </svg>
          <span>@escapadesenparella.cat</span>
        </a>
      </div>
      <div className="flex items-center banner-wrapper relative -left-2.5 mt-8 mb-4">
        <div className="relative rounded-md overflow-hidden left">
          <picture>
            <source
              srcSet="/escapadesenparella-tossa-mar_m2lvdz-s.webp"
              type="image/webp"
            />
            <img
              src="/escapadesenparella-tossa-mar_m2lvdz-s.jpg"
              alt="Segueix-nos a Instagram"
              width={400}
              height={300}
              loading="lazy"
            />
          </picture>
        </div>
        <div className="relative rounded-md overflow-hidden right">
          <picture>
            <source
              srcSet="/escapadesenparella-comes-rubio_luuish-s.webp"
              type="image/webp"
            />
            <img
              src="/escapadesenparella-comes-rubio_luuish-s.jpg"
              alt="Segueix @escapadesenparella a Instagram"
              width={400}
              height={300}
              loading="lazy"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default FollowInstagramBox;
