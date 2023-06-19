import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const update = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        props.setProgress(100);
    };
    useEffect(() => {
        document.title = `${capitalize(props.category)} - NewsBaba`;
        update();
    });

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1) 
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };
    return (
        <>
            <h1 className='text-center' style={{ margin: "40px 0px", marginTop: "90px" }}>
                NewsBaba: Top {capitalize(props.category)} Headlines
            </h1>
            <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults}>
                <div className='container'>
                    <div className='row my-6'>
                        {articles.map((element) => {
                            return (
                                <div className='col-md-4 my-3' key={element.url}>
                                    <NewsItem
                                        myTitle={element.title ? element.title.slice(0, 40) : ""}
                                        myDescription={element.description ? element.description.slice(0, 85) : ""}
                                        imgUrl={element.urlToImage ? element.urlToImage : "https://img.freepik.com/premium-vector/red-bold-news-editable-text-effect_567288-1354.jpg"}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
};

News.defaultProps = {
    country: "in",
    pageSize: 12,
    category: "general",
};
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};

export default News;
