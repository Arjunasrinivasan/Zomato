

import React, { Component } from 'react';
import { DocumentTitle } from 'react-document-title';

class navigation_name extends React.Component {
    render() {
        return (
            <DocumentTitle title={ this.props.title }>
                { this.props.title }
            </DocumentTitle>
        );
    }
}

export default navigation_name;