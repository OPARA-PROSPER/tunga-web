import React, { Component } from "react";
import Carousel from "../../../shared/Carousel/Carousel";
import Button from "../../../../core/Button";

class NewsArticle extends Component {
    
    getDataPerPage() {
        return [
            {
                breakpoint: 992,
                perPage: 1,
                width: 88.5
            },
            {
                breakpoint: 768000,
                perPage: 2,
                width: 45,
            },
        ];
    }


    render() {
        const { articles } = this.props;
        const pagination = {
            total: articles.length,
            perPage: this.getDataPerPage()
        };

        return (
            <section className="NewsArticle">
                <h4 className="NewsArticle__heading font-weight-bold">
                    News Articles
                </h4>
                <div className="NewsArticle__container">
                    <Carousel
                        pagination={pagination}
                        float="float-right"
                        color="text-primary"
                    >
                        <ul className="NewsArticle__list">
                            {
                                articles.map((article, key) => (
                                    <li className={
                                        `NewsArticle__item 
                                        ${articles.length === key + 1 ? 'NewsArticle__item--last' : ''}
                                        ${articles.length === key + 2 ? 'NewsArticle__item--2-last' : ''}
                                        `} key={key}
                                        style={{ backgroundImage: `url(${article.imgUrl})`, height: "100vh" }}>
                                        <div className="NewsArticle__item-container">
                                            <div className="NewsArticle__title">
                                                {article.title}
                                            </div>
                                            <div className="NewsArticle__summary">
                                                {article.summary}
                                            </div>
                                            <div className="NewsArticle__cta">
                                                <Button
                                                    href={article.url}
                                                    target="_blank"
                                                    size="md"
                                                    className="NewsArticle__btn"
                                                    variant="inverted"
                                                >
                                                    Read now
                                                </Button>
                                            </div>
                                            <div className="NewsArticle__logo-holder">
                                                <img src={article.logo} className="NewsArticle__logo"/>
                                            </div>
                                        </div>
                                        <div className="NewsArticle__bg-mask"></div>
                                    </li>
                                ))
                            }
                        </ul>
                    </Carousel>
                </div>
            </section>
        );
    }
}

NewsArticle.propTypes = {};

export default NewsArticle;