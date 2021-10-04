import React, { useState } from "react";
import { Card, Row, Col, Select, Typography, Avatar } from "antd";
import moment from "moment";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetNewsQuery } from "../services/cryptoNewsApi";
import { Link } from "react-router-dom";
import bit from "../images/bit.jpg";
const { Text, Title } = Typography;
const { Option } = Select;

//////////////////////////////////////////////////
const demoImage = bit;
const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Crytocurrency");
  const { data } = useGetCryptosQuery(100);
  const count = simplified ? 10 : 40;

  const { data: crypNews } = useGetNewsQuery({
    newsCategory,
    count,
  });

  if (!crypNews?.value) return "Loading..... ";
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select your Crypto"
            optionFilterProp="children"
            onChange={(e) => setNewsCategory(e)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase() > 0)
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin, i) => (
              <Option key={i} value={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {crypNews?.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                  width="80px"
                  height="70px"
                />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <Avatar
                  src={
                    news.provider[0]?.image?.thumbnail?.contentUrl || demoImage
                  }
                  alt="news"
                />
                <Text className="provider-name">{news.provider[0]?.name}</Text>
              </div>
              <Text>{moment(news.datePublished).startOf("ss").fromNow()}</Text>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
