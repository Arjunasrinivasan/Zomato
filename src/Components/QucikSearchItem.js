import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class QuickSearchItem extends React.Component {
    constructor() {
        super();
    }

    handleClick(id) {
        this.props.history.push(`/filter?mealtype=${id}`);
        //this.props.history.push(`/filter/${id}`);
    }

    render() {
        const { id, mealtype } = this.props;
        const { name, content, image } = mealtype;
        const imagePath = require('../' + image).default;
        return(
            <div className="col-sm-12 col-md-4 col-lg-4" onClick={() => this.handleClick(id)}>
                <div className="tileContainer clickable-item">
                    <div className="tileComponent1">
                        <img src={imagePath} alt="" height="150" width="140" />
                    </div>
                    <div className="tileComponent2">
                        <div className="componentHeading">
                            { name }
                        </div>
                        <div className="componentSubHeading">
                            { content }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(QuickSearchItem);