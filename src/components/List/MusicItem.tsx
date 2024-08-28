interface IMusicItemProps {
  imgUrl: string;
  mainText: string;
  secondaryText: string;
  isActive: boolean;
  alt: string;
}

const MusicItem = ({
  imgUrl,
  mainText,
  secondaryText,
  isActive,
  alt,
}: IMusicItemProps) => {
  return (
    <div className="MusicElem">
      <img src={imgUrl} alt={alt} />
      <div className="music__description">
        <p className="main__text">{mainText}</p>
        <p className="secondary__text">{secondaryText}</p>
      </div>
      <div className={`plus-button ${isActive && "_active"}`}></div>
    </div>
  );
};

export default MusicItem;
