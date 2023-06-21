import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    articles = [];
    static defaultProps = {
        country: "in",
        pageSize: 12,
        category: "general",
    };
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    };
    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    constructor(props) {
        super(props);
        this.state = {
            articles: this.articles,
            page: 1,
            totalResults: 0,
        };
        document.title = `${this.capitalize(this.props.category)}-NewsBaba`;
    }
    async uppdate() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false, 
        })
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.uppdate();
    }
    fetchMoreData = async () => {
        this.props.setProgress(10);
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(40);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        });
        this.props.setProgress(100);
    };
    render() {
        return (
            <>
                <h1 className='text-center' style={{ margin: "40px 0px" }}>
                    NewsBaba: Top {this.capitalize(this.props.category)} Headlines
                </h1>
                <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.state.totalResults}>
                    <div className='container'>
                        <div className='row my-6'>
                            {this.state.articles.map((element) => {
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
    }
}

export default News;