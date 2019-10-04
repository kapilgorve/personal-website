import React, { useState, useEffect } from 'react'
import { getVideos } from '../../utils/youtubeApi';


function YoutubeList() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        getVideos()
            .then(res => {
                setVideos(res);
            });
    }, []);
    return (
        <div>
            <section className="portfolio">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h2>Videos/Streams</h2>
                        </div>
                        {videos.map(video => {
                            return (
                                <div className="col-md-6" key={video.snippet.resourceId.videoId}>
                                    <div className="card">
                                        <iframe width="100%" height="400"
                                            title={`${video.snippet.title}`}
                                            src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}


export default YoutubeList
