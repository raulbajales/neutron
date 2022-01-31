import { Button } from "antd";
import Title from "antd/lib/typography/Title";
import "./WinnerView.css";
import { Game } from "../logic/Game";

export const WinnerView = (props: { game: Game; updateState: () => void }) => {
  return (
    <div className="WinnerView">
      <div>
        <Title className="WinnerView-Title">
          Winner is {props.game.winner!.name!}!
        </Title>
      </div>
      <Button
        onClick={() => {
          props.game.run();
          props.updateState();
        }}
      >
        Play again!
      </Button>
    </div>
  );
};
