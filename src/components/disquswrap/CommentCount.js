import React from 'react';
import { CommentCount } from 'gatsby-plugin-disqus';

export default function CommentCountWrap({ config, placeholder }) {
    return <CommentCount config={config} placeholder={placeholder} />
}
