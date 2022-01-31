import React from "react";
import "./BoardView.css";
import { Game, PieceToMove } from "../logic/Game";
import { Row, Col } from "antd";
import { Cell } from "../logic/Cell";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { NeutronToken } from "./tokens/NeutronToken";
import { WhiteToken } from "./tokens/WhiteToken";
import { BlackToken } from "./tokens/BlackToken";
import { TokenColor } from "../logic/Player";
import { Direction } from "../logic/Direction";

export const BoardView = (props: { game: Game; updateState: () => void }) => {
  let neutronDragAllowed = props.game.pieceToMove === PieceToMove.Neutron;
  let whiteTokenDragAllowed =
    props.game.playerTurn!.tokenColor! === TokenColor.White &&
    props.game.pieceToMove === PieceToMove.Token;
  let blackTokenDragAllowed =
    props.game.playerTurn!.tokenColor! === TokenColor.Black &&
    props.game.pieceToMove === PieceToMove.Token;

  const discoverDirection = (
    rowMove: number,
    colMove: number
  ): Direction | undefined => {
    if (rowMove < 0 && colMove === 0) {
      return Direction.Up;
    }
    if (rowMove < 0 && colMove > 0) {
      return Direction.UpRight;
    }
    if (rowMove === 0 && colMove > 0) {
      return Direction.Right;
    }
    if (rowMove > 0 && colMove > 0) {
      return Direction.DownRight;
    }
    if (rowMove > 0 && colMove === 0) {
      return Direction.Down;
    }
    if (rowMove > 0 && colMove < 0) {
      return Direction.DownLeft;
    }
    if (rowMove === 0 && colMove < 0) {
      return Direction.Left;
    }
    if (rowMove < 0 && colMove < 0) {
      return Direction.UpLeft;
    }
    return undefined;
  };

  const handleNeutronDrop = (e: DraggableEvent, data: DraggableData) => {
    let direction: Direction | undefined = discoverDirection(
      Math.round(data.y / 71),
      Math.round(data.x / 71)
    );
    console.log("moveNeutron", Direction[direction!], props.game.playerTurn!);
    direction && props.game.moveNeutron(props.game.playerTurn!, direction);
    props.updateState();
  };

  const handleTokenDrop = (e: DraggableEvent, data: DraggableData) => {
    let direction: Direction | undefined = discoverDirection(
      Math.round(data.y / 71),
      Math.round(data.x / 71)
    );
    let parts = data.node.id.split("|");
    console.log(
      "tokenDrop",
      direction,
      TokenColor[props.game.playerTurn!.tokenColor!],
      props.game.playerTurn!,
      Number(parts[1]),
      Number(parts[2]),
      props.game.board
    );
    direction &&
      props.game.moveToken(props.game.playerTurn!, {
        row: Number(parts[1]),
        col: Number(parts[2]),
        direction,
      });
    props.updateState();
  };

  return (
    <div className="BoardView-Grid">
      {props.game.board!.cells!.map((row, rowIdx) => {
        return (
          <Row>
            {row.map((cell, colIdx) => {
              return (
                <Col>
                  {cell === Cell.Empty && (
                    <div className="BoardView-Grid-Cell"></div>
                  )}
                  {cell === Cell.Neutron && (
                    <div
                      className="BoardView-Grid-Cell"
                      style={{ zIndex: "initial" }}
                    >
                      <Draggable
                        disabled={!neutronDragAllowed}
                        onStop={handleNeutronDrop}
                      >
                        <div style={{ height: "71px" }}>
                          <NeutronToken />
                        </div>
                      </Draggable>
                    </div>
                  )}
                  {cell === Cell.White && (
                    <div className="BoardView-Grid-Cell">
                      <Draggable
                        disabled={!whiteTokenDragAllowed}
                        onStop={handleTokenDrop}
                      >
                        <div
                          style={{ height: "71px" }}
                          id={"WhiteToken|" + rowIdx + "|" + colIdx}
                        >
                          <WhiteToken />
                        </div>
                      </Draggable>
                    </div>
                  )}
                  {cell === Cell.Black && (
                    <div className="BoardView-Grid-Cell">
                      <Draggable
                        disabled={!blackTokenDragAllowed}
                        onStop={handleTokenDrop}
                      >
                        <div
                          style={{ height: "71px" }}
                          id={"BlackToken|" + rowIdx + "|" + colIdx}
                        >
                          <BlackToken />
                        </div>
                      </Draggable>
                    </div>
                  )}
                </Col>
              );
            })}
          </Row>
        );
      })}
      <>
        <br />
        <b>
          {props.game.playerTurn!.name}(
          {TokenColor[props.game.playerTurn!.tokenColor!]})
        </b>{" "}
        moves <b>{PieceToMove[props.game.pieceToMove!]}</b>
      </>
    </div>
  );
};
