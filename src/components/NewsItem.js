import React, { Component } from "react";

export class NewsItem extends Component {
    render() {
        let { myTitle, myDescription, imgUrl, newsUrl, author, date, source } = this.props;
        return (
            <div>
                <div className='card'>
                    <img src={imgUrl} className='card-img-top' alt='...' />
                    <div className='card-body'>
                        <h5 className='card-title'>{myTitle}... </h5>
                        <p>
                            <span className='badge text-bg-info'>{source}</span>
                        </p>
                        <p className='card-text'>{myDescription}...</p>
                        <p className='card-text'>
                            <small className='text-body-secondary'>
                                By {author ? author : "Anonymous"} on {new Date(date).toGMTString()}
                            </small>
                        </p>
                        <a href={newsUrl} target='_blank' className='btn btn-sm btn-dark' rel='noreferrer'>
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;