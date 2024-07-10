type LargeVideoProps = {
  data: {
    title: string;
    description: string;
    video: {
      id: string;
      url: string;
    };
  };
};

export const LargeVideo = ({ data }: LargeVideoProps) => {
  // const videoUrl = getStrapiMedia(data.video.url);

  return <p>Large video</p>;
};
