import { FC } from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import CenterPanel from "./CenterPanel";
import { Col, Grid, Row } from "antd";
const { useBreakpoint } = Grid;

const Home: FC = () => {
  const { md } = useBreakpoint();
  return (
    <div className="relative">
      <Row gutter={20}>
        {md ? (
          <Col span={6}>
            <LeftPanel />
          </Col>
        ) : null}

        <Col span={24} md={12}>
          <CenterPanel />
        </Col>
        {md ? (
          <Col span={6}>
            <RightPanel />
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default Home;
