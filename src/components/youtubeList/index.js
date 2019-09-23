import React from 'react'
import { getVideos } from '../../utils/youtubeApi'


class YoutubeList extends React.Component {
    state = {
        videos: [],
    };

    componentDidMount() {
        getVideos()
            .then(res => {
                this.setState({ videos: res });
            })
    }
    render() {
        return (
            <div>
                <section className="portfolio">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h2>Videos/Streams</h2>
                            </div>
                            {this.state.videos.map(video => {
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
}


export default YoutubeList
