import React from 'react';
import { Disqus } from 'gatsby-plugin-disqus';

export default function DisqusWrap(props){
    return (<Disqus config={props.config} />);
}
