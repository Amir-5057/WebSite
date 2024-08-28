import Heading from "../typography/Heading/Heading";
import ListItem from "./ListItem";
import MusicItem from "./MusicItem";
import { listData } from "./data";

const { subscribes, music, closeFriends } = listData;

interface ListProps {
  listType: "subscribes" | "music" | "closeFriends";
}

const List = ({ listType }: ListProps) => {
  const renderList = () => {
    switch (listType) {
      case "subscribes":
        return (
          <div className="List">
            <div className="List__title">
              <Heading variant="h2" text="Подписки" />
              <span className="count">
                {subscribes ? subscribes.length : ""}
              </span>
            </div>
            {subscribes &&
              subscribes.map((userElem) => (
                <ListItem
                  imgUrl={userElem.imgUrl}
                  alt={userElem.alt}
                  mainText={userElem.mainText}
                  secondaryText={userElem.secondaryText}
                  badgeNumber={userElem.badgeNumber}
                />
              ))}
          </div>
        );
      case "closeFriends":
        return (
          <div className="List">
            <div className="List__title">
              <Heading variant="h2" text="Близкие друзья" />
              <span className="count">
                {closeFriends ? closeFriends.length : ""}
              </span>
            </div>
            {closeFriends &&
              closeFriends.map((userElem) => (
                <ListItem
                  // isOnline={closeFriends.isOnline}
                  imgUrl={userElem.imgUrl}
                  alt={userElem.alt}
                  mainText={userElem.mainText}
                  secondaryText={userElem.secondaryText}
                  badgeNumber={userElem.badgeNumber}
                />
              ))}
          </div>
        );
      case "music":
        return (
          <div className="MusicBlock">
            <div className="MusicBlock__title">
              <h2>Вы недавно слушали</h2>
              <span>{music ? music.length : ""}</span>
            </div>
            {music &&
              music.map((musicItem) => (
                <MusicItem
                  imgUrl={musicItem.imgUrl}
                  mainText={musicItem.mainText}
                  secondaryText={musicItem.secondaryText}
                  isActive={musicItem.isActive}
                  alt={musicItem.alt}
                />
              ))}
          </div>
        );
      default:
        break;
    }
  };

  return renderList();
};

export default List;
