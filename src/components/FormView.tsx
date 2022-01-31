import React from "react";
import "./FormView.css";
import { Typography } from "antd";
import { Form, Input, Button, Layout } from "antd";
import { Game } from "../logic/Game";
const { Header, Footer, Content } = Layout;

const { Title } = Typography;

export const FormView = (props: { game: Game; updateState: () => void }) => {
  return (
    <Layout className="Form-Game">
      <Header className="Form-Game-Header">
        <Title>Neutron</Title>
        <Title level={4}>the game</Title>
      </Header>

      <Content className="Form-Game-Content">
        <Form
          style={{ maxWidth: "150vh" }}
          name="basic"
          onFinish={() => {
            props.game.run();
            props.updateState();
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Player One"
            name="playerOne"
            initialValue={props.game.playerOne?.name}
            rules={[
              {
                required: true,
                message: "Please enter name for Player One!",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                props.game.playerOne!.name = e.target.value;
              }}
            />
          </Form.Item>

          <Form.Item
            label="Player Two"
            name="playerTwo"
            initialValue={props.game.playerTwo?.name}
            rules={[
              {
                required: true,
                message: "Please enter name for Player Two!",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                props.game.playerTwo!.name = e.target.value;
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Start Game
            </Button>
          </Form.Item>
        </Form>
      </Content>

      <Footer className="Form-Game-Footer">
        Made in Quilmes (source code{" "}
        <a target="_blank" rel="noreferrer" href="https://github.com/raulbajales/neutron">
          here
        </a>
        )
      </Footer>
    </Layout>
  );
};
